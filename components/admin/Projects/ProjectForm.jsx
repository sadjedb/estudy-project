"use client";
import { motion } from "framer-motion";
import { FiSave, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectForm = ({
  editMode,
  editForm,
  newProject,
  setEditForm,
  setNewProject,
  saveEdit,
  exitEditMode,
  handleAddProject,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!editMode.type && editMode.id === null) {
      setNewProject({
        title: "",
        description: "",
        department: "cs",
        available_spots: 1,
        supervisor: "",
      });
    }
  }, [editMode, setNewProject]);

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (formData.description.length < 20)
      errors.description = "Description must be at least 20 characters";
    if (!formData.supervisor.trim())
      errors.supervisor = "Supervisor is required";
    if (formData.available_spots < 1 || formData.available_spots > 20) {
      errors.available_spots = "Available spots must be between 1-20";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = editMode.type === "project" ? editForm : newProject;
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editMode.type === "project") {
        await saveEdit(e);
      } else {
        await handleAddProject(e);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? parseInt(value) || 0 : value;

    if (editMode.type === "project") {
      setEditForm({ ...editForm, [name]: val });
    } else {
      setNewProject({ ...newProject, [name]: val });
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {editMode.type === "project" ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={
                    editMode.type === "project"
                      ? editForm.title
                      : newProject.title
                  }
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={100}
                />
                {formErrors.title && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {formErrors.title}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  name="department"
                  value={
                    editMode.type === "project"
                      ? editForm.department
                      : newProject.department
                  }
                  onValueChange={(value) => {
                    if (editMode.type === "project") {
                      setEditForm({ ...editForm, department: value });
                    } else {
                      setNewProject({ ...newProject, department: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                className="min-h-[120px]"
                value={
                  editMode.type === "project"
                    ? editForm.description
                    : newProject.description
                }
                onChange={handleChange}
                required
                minLength={20}
                maxLength={500}
              />
              <div className="flex justify-between">
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: formErrors.description ? 1 : 0 }}
                >
                  {formErrors.description}
                </motion.p>
                <p className="text-sm text-muted-foreground">
                  {editMode.type === "project"
                    ? editForm.description.length
                    : newProject.description.length}
                  /500
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="available_spots">Available Spots *</Label>
                <Input
                  id="available_spots"
                  type="number"
                  name="available_spots"
                  min="1"
                  max="20"
                  value={
                    editMode.type === "project"
                      ? editForm.available_spots
                      : newProject.available_spots
                  }
                  onChange={handleChange}
                  required
                />
                {formErrors.available_spots && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {formErrors.available_spots}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor">Supervisor *</Label>
                <Input
                  id="supervisor"
                  name="supervisor"
                  value={
                    editMode.type === "project"
                      ? editForm.supervisor
                      : newProject.supervisor
                  }
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={50}
                />
                {formErrors.supervisor && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {formErrors.supervisor}
                  </motion.p>
                )}
              </div>
            </div>

            {Object.keys(formErrors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert variant="destructive">
                  <FiAlertCircle className="h-4 w-4" />
                  <AlertTitle>Form Errors</AlertTitle>
                  <AlertDescription>
                    Please fix the errors above before submitting
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          {editMode.type === "project" && (
            <Button
              variant="outline"
              onClick={exitEditMode}
              disabled={isSubmitting}
            >
              <FiX className="mr-2" /> Cancel
            </Button>
          )}
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                {editMode.type === "project" ? "Saving..." : "Creating..."}
              </div>
            ) : (
              <>
                <FiSave className="mr-2" />
                {editMode.type === "project"
                  ? "Save Changes"
                  : "Create Project"}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectForm;
