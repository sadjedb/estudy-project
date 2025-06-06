"use client";
import React from "react";
import { useParams } from "next/navigation";
import useProject from "@/hooks/useProject";
import useWhishlist from "@/hooks/useWhishlist";
import {
  BookOpen,
  User,
  Users,
  Calendar,
  ChevronRight,
  Link2,
  Mail,
  Plus,
  Minus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { checkPermissions } from "@/lib/utils";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  const { projectID } = useParams();
  const {
    getProjectById,
    loading: loadingProject,
    error: projectError,
  } = useProject();

  const {
    addToWhishlist,
    removeFromWhishlist,
    data: wishlist,
    loading: loadingWishlist,
    error: wishlistError,
  } = useWhishlist(session?.data?.user?.id);

  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    if (projectID) {
      getProjectById(projectID).then((res) => setProject(res?.project || null));
    }
  }, [projectID]);

  const handleAddToWishlist = async (projectId) => {
    if (!session || !session.data?.user) {
      toast.error("Please log in to add projects to your wishlist");
      return;
    }
    try {
      await addToWhishlist(projectId);
      toast.success("Project added to wishlist!");
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Failed to add project to wishlist");
    }
  };

  const handleRemoveFromWishlist = async (projectId) => {
    if (!session || !session.data?.user) {
      toast.error("Please log in to remove projects from your wishlist");
      return;
    }
    try {
      await removeFromWhishlist(projectId);
      toast.success("Project removed from wishlist!");
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Failed to remove project from wishlist");
    }
  };

  const isInWishlist = (projectId) => {
    return Array.isArray(wishlist?.wishlist)
      ? wishlist.wishlist.some(
          (item) => (item.project_id || item.id) === projectId
        )
      : false;
  };

  if (loadingProject || loadingWishlist) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading project...</p>
      </div>
    );
  }

  if (projectError || wishlistError) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {projectError ? "Error loading project" : "Error loading wishlist"}
          </h3>
          <p className="text-gray-600 mb-6">
            {projectError?.message ||
              wishlistError?.message ||
              "Please try again later"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="border rounded-lg p-6 bg-white shadow-sm text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Project not found
          </h2>
          <p className="text-gray-500">
            The project you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {project.department.toUpperCase()}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="border rounded-lg p-6 bg-white shadow-sm transition-all hover:shadow-md">
        {/* Stats Bar */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Available Spots</p>
              <p className="font-semibold">{project.available_spots}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-full">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Supervisor</p>
              <p className="font-semibold">{project.supervisor}</p>
            </div>
          </div>

          {project.duration && (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold">{project.duration}</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
            Project Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Requirements */}
        {project.requirements && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
              Requirements
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {project.requirements.split("\n").map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Supervisor Contact */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Supervisor Contact
          </h3>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${project.supervisor_email}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Mail className="w-5 h-5" />
              <span>{project.supervisor_email || "Not provided"}</span>
            </a>
            {project.supervisor_website && (
              <a
                href={project.supervisor_website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Link2 className="w-5 h-5" />
                <span>Faculty Website</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {project.additional_info && (
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
            Additional Information
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {project.additional_info}
          </p>
        </div>
      )}

      {session?.data?.user &&
        checkPermissions(session?.data?.user?.roles, ["student"]) && (
          <div className="mt-auto pt-2">
            {!isInWishlist(project.id) ? (
              <button
                onClick={() => handleAddToWishlist(project.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                Add to Wishlist
              </button>
            ) : (
              <button
                onClick={() => handleRemoveFromWishlist(project.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Minus className="w-5 h-5" />
                Remove from Wishlist
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export default Page;
