"use client";
import { FiPlus, FiX, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const StudentForm = ({
  projects,
  modules,
  setShowAddForm,
  handleAddStudent,
  initialStudent = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department: "cs",
    assignedModules: [],
  },
}) => {
  const [formData, setFormData] = useState({
    ...initialStudent,
    wishlist: [],
    assignedModules: initialStudent.assignedModules || [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      ...initialStudent,
      wishlist: initialStudent.id ? initialStudent.wishlist : [],
      assignedModules: initialStudent.id
        ? initialStudent.assignedModules || []
        : [],
    });
    setFormErrors({});
  }, [initialStudent.id]);

  const validateForm = () => {
    const errors = {};
    if (!formData.first_name.trim())
      errors.first_name = "First Name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!initialStudent.id && !formData.password) {
      errors.password = "Password is required";
    } else if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleDepartmentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
    }));
  };

  const handleModuleAssignmentChange = (moduleId) => {
    setFormData((prev) => ({
      ...prev,
      assignedModules: prev.assignedModules.includes(moduleId)
        ? prev.assignedModules.filter((id) => id !== moduleId)
        : [...prev.assignedModules, moduleId],
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await handleAddStudent(formData);
      setShowAddForm(false);
      toast({
        title: "Success",
        description: initialStudent.id
          ? "Student updated successfully"
          : "Student added successfully",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {initialStudent.id ? "Edit Student" : "Add New Student"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  minLength={3}
                  maxLength={50}
                  className={formErrors.first_name ? "border-red-500" : ""}
                />
                {formErrors.first_name && (
                  <p className="text-sm text-red-500">
                    {formErrors.first_name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  minLength={3}
                  maxLength={50}
                  className={formErrors.last_name ? "border-red-500" : ""}
                />
                {formErrors.last_name && (
                  <p className="text-sm text-red-500">{formErrors.last_name}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {initialStudent.id ? "New Password" : "Password *"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ""}
                    onChange={handleChange}
                    minLength={6}
                    maxLength={50}
                    placeholder={
                      initialStudent.id ? "Leave blank to keep current" : ""
                    }
                    className={formErrors.password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
                {initialStudent.id && (
                  <p className="text-xs text-muted-foreground">
                    Only enter if you want to change the password
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger id="department">
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

            <div className="space-y-2">
              <Label>Assign Modules</Label>
              <div className="flex flex-wrap gap-4">
                {modules && modules.length > 0 ? (
                  modules.map((mod) => (
                    <div key={mod.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`module-${mod.id}`}
                        checked={formData.assignedModules.includes(mod.id)}
                        onCheckedChange={() =>
                          handleModuleAssignmentChange(mod.id)
                        }
                      />
                      <Label htmlFor={`module-${mod.id}`}>{mod.title}</Label>
                    </div>
                  ))
                ) : (
                  <Badge variant="outline">No modules available</Badge>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                <FiX className="mr-2" />
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <FiSave className="mr-2" />
                {isSubmitting
                  ? "Processing..."
                  : initialStudent.id
                  ? "Update Student"
                  : "Add Student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentForm;
