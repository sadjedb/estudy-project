"use client";
import { useEffect, useState } from "react";
import { Calendar, Loader2, Pencil, X } from "lucide-react";
import Link from "next/link";
import { FaUser, FaTasks, FaRegBookmark, FaSearch } from "react-icons/fa";
import useWhishlist from "@/hooks/useWhishlist";
import { useSession } from "next-auth/react";
import useStudent from "@/hooks/useStudent";
import { toast } from "react-hot-toast";
import Image from "next/image";

const Page = () => {
  const session = useSession();
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    editInfo,
  } = useStudent(session?.data?.user?.id);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
    removeFromWhishlist,
  } = useWhishlist(session?.data?.user?.id);

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editContactInfo, setEditContactInfo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData.wishlist);
    }
  }, [projectsData]);

  const handleEditClick = () => {
    setEditBio(studentData?.student?.bio || "");
    setEditContactInfo(studentData?.student?.phone || "");
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editInfo({
        bio: editBio,
        phone: editContactInfo,
      });
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeProject = async (projectId) => {
    try {
      await removeFromWhishlist(projectId);
      toast.success("Project removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove project. Please try again.");
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (studentLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (studentError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Error loading profile
          </h2>
          <p className="text-gray-600 mb-4">{studentError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div
        className={`max-w-6xl mx-auto ${
          isEditModalOpen ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {studentData?.student?.image ? (
                <Image
                  src={studentData.student.image}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <FaUser className="text-4xl text-blue-600" />
              )}
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {studentData?.student?.first_name}{" "}
                    {studentData?.student?.last_name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {studentData?.student?.department && (
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {studentData.student.department.toUpperCase()}
                      </span>
                    )}
                    {studentData?.student?.year && (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Year {studentData.student.year}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-600 hover:border-blue-700 transition-colors"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>

              {studentData?.student?.bio && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">About</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">
                    {studentData.student.bio}
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Contact Information
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-gray-500">📧</span>
                    {session.data?.user?.email}
                  </p>
                  {studentData?.student?.phone && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-gray-500">📱</span>
                      {studentData.student.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaRegBookmark className="text-blue-600" />
              Project Wishlist
              {projects.length > 0 && (
                <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">
                  {projects.length} projects
                </span>
              )}
            </h2>

            <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
              {projects.length > 0 && (
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <Link
                href="/projects"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Browse Projects
              </Link>
            </div>
          </div>

          {projectsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : projectsError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">
                Error loading wishlist: {projectsError.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaRegBookmark className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                {searchTerm
                  ? "No matching projects found"
                  : "Your wishlist is empty"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try a different search term"
                  : "Browse projects and add them to your wishlist"}
              </p>
              <Link
                href="/projects"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Projects
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                        <Link href={`/projects/${project.project_id}`}>
                          {project.title}
                        </Link>
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">Department:</span>
                          <span className="font-medium">
                            {project.department}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">Supervisor:</span>
                          <span className="font-medium">
                            {project.supervisor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.date && (
                        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(project.date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => removeProject(project.project_id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove project"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-gray-600 mt-3 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/projects/${project.project_id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 ">
          <div
            className="fixed inset-0  bg-opacity-50"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative z-10 border-[1px] border-black/40 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-gray-500 mt-1">Max 250 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editContactInfo}
                  onChange={(e) => setEditContactInfo(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1234567890"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
