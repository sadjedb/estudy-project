"use client";
import { FiSave, FiX, FiAlertTriangle } from "react-icons/fi";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const AnnouncementForm = ({
  editMode,
  editForm,
  newAnnouncement,
  setEditForm,
  setNewAnnouncement,
  saveEdit,
  exitEditMode,
  handleAddAnnouncement,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formData =
    editMode.type === "announcement" ? editForm : newAnnouncement;
  const setFormData =
    editMode.type === "announcement" ? setEditForm : setNewAnnouncement;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editMode.type === "announcement") {
        await saveEdit(e);
        toast({
          title: "Announcement updated",
          description: "Your announcement has been successfully updated.",
        });
      } else {
        await handleAddAnnouncement(e);
        toast({
          title: "Announcement created",
          description: "Your new announcement has been published.",
        });
      }
      exitEditMode();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save announcement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editMode.type === "announcement"
            ? "Edit Announcement"
            : "New Announcement"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select
              name="department"
              value={formData.department}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, department: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              name="urgent"
              checked={formData.urgent}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, urgent: checked }))
              }
            />
            <Label htmlFor="urgent" className="font-normal">
              Mark as urgent
            </Label>
          </div>

          {formData.urgent && (
            <Alert variant="warning">
              <FiAlertTriangle className="h-4 w-4" />
              <AlertTitle>Urgent Announcement</AlertTitle>
              <AlertDescription>
                This will be highlighted as an urgent announcement for all
                users.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={exitEditMode}
          disabled={isSubmitting}
        >
          <FiX className="mr-2" /> Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              {editMode.type === "announcement" ? "Saving..." : "Creating..."}
            </span>
          ) : (
            <>
              <FiSave className="mr-2" />
              {editMode.type === "announcement"
                ? "Save Changes"
                : "Create Announcement"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementForm;
