"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaEdit,
  FaSearch,
} from "react-icons/fa";
import useModule from "@/hooks/useModule";
import { toast } from "sonner";

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  const [moduleData, setModuleData] = useState({
    title: "",
    code: "",
    instructor: "",
    department: "",
    credits: "",
    description: "",
    schedule: "",
    location: "",
    syllabus: [{ week: "", description: "", courseFile: null, tdFile: null }],
  });

  const { data, loading, error, addModule, removeModule } = useModule();

  // Filter modules based on search term
  const filteredModules = modules.filter((module) =>
    `${module.title} ${module.code} ${module.department} ${module.instructor}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({ ...moduleData, [name]: value });
  };

  const handleSyllabusChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSyllabus = [...moduleData.syllabus];
    updatedSyllabus[index][name] = value;
    setModuleData({ ...moduleData, syllabus: updatedSyllabus });
  };

  const addSyllabusItem = () => {
    setModuleData({
      ...moduleData,
      syllabus: [
        ...moduleData.syllabus,
        { week: "", description: "", courseFile: null, tdFile: null },
      ],
    });
  };

  const removeSyllabusItem = (index) => {
    const updatedSyllabus = moduleData.syllabus.filter((_, i) => i !== index);
    setModuleData({ ...moduleData, syllabus: updatedSyllabus });
  };

  const cancelEdit = () => {
    setEditingModuleId(null);
    resetForm();
  };

  const resetForm = () => {
    setModuleData({
      title: "",
      code: "",
      instructor: "",
      department: "",
      credits: "",
      description: "",
      schedule: "",
      location: "",
      syllabus: [{ week: "", description: "", courseFile: null, tdFile: null }],
    });
  };

  const setupEditForm = (module) => {
    setEditingModuleId(module.id);
    setModuleData({
      ...module,
      syllabus: module.syllabus.map((item) => ({ ...item })),
    });
  };

  useEffect(() => {
    if (data) {
      setModules(data.modules);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addModule(moduleData);
      const newModule = {
        ...moduleData,
        id: editingModuleId || Date.now().toString(),
      };

      if (editingModuleId) {
        setModules(
          modules.map((m) => (m.id === editingModuleId ? newModule : m))
        );
        toast({
          title: "Module Updated",
          description: "Module has been updated successfully.",
          variant: "success",
        });
      } else {
        setModules([...modules, newModule]);
        toast({
          title: "Module Created",
          description: "New module has been created successfully.",
          variant: "success",
        });
      }

      cancelEdit();
    } catch (error) {
      console.error("Error saving module:", error);
      toast({
        title: "Error",
        description: "Failed to save module. Please try again.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (module) => {
    setModuleToDelete(module);
    setDeleteDialogOpen(true);
  };

  const deleteModule = async () => {
    if (!moduleToDelete) return;

    try {
      await removeModule(moduleToDelete.id);
      setModules(modules.filter((m) => m.id !== moduleToDelete.id));
      if (editingModuleId === moduleToDelete.id) {
        cancelEdit();
      }
      toast({
        title: "Module Deleted",
        description: "Module has been deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting module:", error);
      toast({
        title: "Error",
        description: "Failed to delete module. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setModuleToDelete(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold"
        >
          Module Management
        </motion.h1>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create/Edit Module Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FaBook className="text-blue-500" />
              <CardTitle>
                {editingModuleId ? "Edit Module" : "Create New Module"}
              </CardTitle>
            </div>
            <CardDescription>
              {editingModuleId
                ? "Update the module details below"
                : "Fill in the module details below"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Module Title*</label>
                  <Input
                    name="title"
                    value={moduleData.title}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Module Code*</label>
                  <Input
                    name="code"
                    value={moduleData.code}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructor*</label>
                  <Input
                    name="instructor"
                    value={moduleData.instructor}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department*</label>
                  <Input
                    name="department"
                    value={moduleData.department}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Credits*</label>
                  <Input
                    name="credits"
                    type="number"
                    value={moduleData.credits}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Schedule*</label>
                  <Input
                    name="schedule"
                    value={moduleData.schedule}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location*</label>
                <Input
                  name="location"
                  value={moduleData.location}
                  onChange={handleModuleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description*</label>
                <Textarea
                  name="description"
                  value={moduleData.description}
                  onChange={handleModuleChange}
                  rows={4}
                  required
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-green-500" />
                    <h3 className="text-lg font-semibold">Syllabus</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSyllabusItem}
                  >
                    <FaPlus className="mr-2" /> Add Week
                  </Button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {moduleData.syllabus.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="border p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">Week {index + 1}</h4>
                          {moduleData.syllabus.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSyllabusItem(index)}
                            >
                              <FaTrash className="text-red-500" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Week Title*
                            </label>
                            <Input
                              name="week"
                              value={item.week}
                              onChange={(e) => handleSyllabusChange(index, e)}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Description*
                            </label>
                            <Textarea
                              name="description"
                              value={item.description}
                              onChange={(e) => handleSyllabusChange(index, e)}
                              rows={2}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Course Materials URL
                              </label>
                              <Input
                                type="text"
                                name="courseFile"
                                value={item.courseFile || ""}
                                onChange={(e) => handleSyllabusChange(index, e)}
                                placeholder="Enter materials URL"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                TD/TP Materials URL
                              </label>
                              <Input
                                type="text"
                                name="tdFile"
                                value={item.tdFile || ""}
                                onChange={(e) => handleSyllabusChange(index, e)}
                                placeholder="Enter materials URL"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  <FaSave className="mr-2" />{" "}
                  {editingModuleId ? "Update" : "Save"} Module
                </Button>
                {editingModuleId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Modules Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FaChalkboardTeacher className="text-purple-500" />
              <CardTitle>Existing Modules</CardTitle>
            </div>
            <CardDescription>
              {filteredModules.length} module(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredModules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No modules found
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredModules.map((module) => (
                    <motion.div
                      key={module.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`border p-4 rounded-lg transition-colors ${
                        editingModuleId === module.id
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{module.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{module.code}</Badge>
                            <Badge variant="outline">{module.department}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setupEditForm(module)}
                          >
                            <FaEdit className="mr-1" /> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-300 hover:bg-red-50"
                            onClick={() => confirmDelete(module)}
                          >
                            <FaTrash className="mr-1" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {module.description}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{module.instructor}</span>
                          <span>•</span>
                          <span>{module.schedule}</span>
                        </div>
                        <Badge variant="outline">
                          {module.syllabus.length} weeks
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialoggg */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "
              {moduleToDelete?.title}" module and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={deleteModule}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default ModuleManagement;
