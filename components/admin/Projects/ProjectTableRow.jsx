"use client";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ProjectTableRow = ({
  project,
  editMode,
  enterEditMode,
  deleteProject,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(project.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const departmentColors = {
    cs: "bg-blue-100 text-blue-800",
    math: "bg-purple-100 text-purple-800",
    physics: "bg-orange-100 text-orange-800",
    chemistry: "bg-green-100 text-green-800",
  };

  return (
    <>
      <td className="px-6 py-4">
        <div className="font-medium">{project.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-1">
          {project.description}
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge className={departmentColors[project.department]}>
          {project.department.toUpperCase()}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                project.available_spots > 10
                  ? "bg-green-500"
                  : project.available_spots > 5
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(project.available_spots / 20) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-sm">{project.available_spots}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-muted-foreground">
        {project.supervisor}
      </td>
      <td className="px-6 py-4">
        {editMode.type === "project" && editMode.id === project.id ? (
          <span className="text-muted-foreground text-sm">Editing...</span>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => enterEditMode("project", project)}
              aria-label="Edit project"
            >
              <FiEdit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete project"
            >
              {isDeleting ? (
                <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiTrash2 className="h-4 w-4 text-destructive" />
              )}
            </Button>
          </div>
        )}
      </td>
    </>
  );
};

export default ProjectTableRow;
