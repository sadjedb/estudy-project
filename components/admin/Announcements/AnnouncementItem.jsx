"use client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AnnouncementItem = ({
  announcement,
  editMode,
  enterEditMode,
  deleteAnnouncement,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAnnouncement(announcement.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        announcement.urgent
          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20"
          : "border-border bg-background"
      }`}
    >
      {editMode.type === "announcement" && editMode.id === announcement.id ? (
        <div className="text-sm text-muted-foreground mb-2">
          Editing announcement...
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <h3 className="font-medium">{announcement.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">
                  {announcement.department === "all"
                    ? "All Departments"
                    : announcement.department.toUpperCase()}
                </Badge>
                <span>•</span>
                <span>{announcement.date}</span>
                {announcement.urgent && (
                  <>
                    <span>•</span>
                    <Badge variant="destructive">Urgent</Badge>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => enterEditMode("announcement", announcement)}
                aria-label="Edit announcement"
              >
                <FiEdit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label="Delete announcement"
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <FiTrash2 className="h-4 w-4 text-destructive" />
                )}
              </Button>
            </div>
          </div>
          <p className="mt-3 text-sm">{announcement.content}</p>
        </>
      )}
    </div>
  );
};

export default AnnouncementItem;
