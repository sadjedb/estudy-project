"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AnnouncementItem from "./AnnouncementItem";
import { toast } from "sonner";

const AnnouncementList = ({
  announcements,
  editMode,
  enterEditMode,
  deleteAnnouncement,
}) => {
  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      toast({
        title: "Announcement deleted",
        description: "The announcement has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete announcement",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <AnnouncementItem
                key={announcement.id}
                announcement={announcement}
                editMode={editMode}
                enterEditMode={enterEditMode}
                deleteAnnouncement={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No announcements have been created yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementList;
