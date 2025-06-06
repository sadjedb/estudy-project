"use client";
import { useState } from "react";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import { Minus, Plus, Loader2, AlertCircle } from "lucide-react";
import withAuth from "@/lib/utils/withAuth";
import { checkPermissions } from "@/lib/utils";
import useProject from "@/hooks/useProject";
import useWhishlist from "@/hooks/useWhishlist";
import { toast } from "react-hot-toast";
import Image from "next/image";

const departmentImages = {
  cs: "https://fontawesome.com/social/code?f=&s=",
  physics: "https://fontawesome.com/social/microscope?f=&s=solid",
  chemistry: "https://fontawesome.com/social/atom-simple?f=&s=",
  math: "https://fontawesome.com/social/pi?f=&s=",
};

const departmentIcons = {
  cs: "💻",
  physics: "🔬",
  chemistry: "⚗️",
  math: "🧮",
  default: "📚",
};

const Page = ({ session }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const {
    data: projectsData,
    loading: loadingProjects,
    error: projectsError,
  } = useProject();

  const {
    data: wishlist,
    loading: loadingWishlist,
    error: wishlistError,
    addToWhishlist,
    removeFromWhishlist,
  } = useWhishlist(session?.user?.id);

  const filteredProjects =
    projectsData?.projects.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.department.toLowerCase().includes(searchLower) ||
        project.supervisor.toLowerCase().includes(searchLower);

      const matchesDepartment =
        departmentFilter === "all" ||
        project.department.toLowerCase() === departmentFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && project.available_spots > 0) ||
        (availabilityFilter === "unavailable" && project.available_spots <= 0);

      return matchesSearch && matchesDepartment && matchesAvailability;
    }) || [];

  const handleAddToWishlist = async (projectId) => {
    if (!session) {
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
    if (!session) {
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

  if (loadingProjects || loadingWishlist) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (projectsError || wishlistError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {projectsError
              ? "Error loading projects"
              : "Error loading wishlist"}
          </h3>
          <p className="text-gray-600 mb-6">
            {projectsError?.message ||
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

  // Get unique departments for filter
  const departments = [
    ...new Set(projectsData?.projects.map((p) => p.department.toLowerCase())),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects Showcase
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Explore innovative student projects across various departments.
            {session &&
              checkPermissions(session?.user?.roles, ["student"]) &&
              " Save your favorites to your wishlist."}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, description, department or supervisor..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
              <FiFilter className="text-gray-500" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-sm"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
              <FiFilter className="text-gray-500" />
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-sm"
              >
                <option value="all">All Projects</option>
                <option value="available">Available Only</option>
                <option value="unavailable">Unavailable Only</option>
              </select>
            </div>

            {(searchQuery ||
              departmentFilter !== "all" ||
              availabilityFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDepartmentFilter("all");
                  setAvailabilityFilter("all");
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={
                      departmentImages[project.department.toLowerCase()] ||
                      departmentImages.default
                    }
                    alt={project.department}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">
                      {departmentIcons[project.department.toLowerCase()] ||
                        departmentIcons.default}
                    </span>
                    <span className="text-white font-semibold">
                      {project.department.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                      {project.title}
                    </h2>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                        project.available_spots > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {project.available_spots > 0
                        ? `${project.available_spots} spot${
                            project.available_spots > 1 ? "s" : ""
                          } left`
                        : "Fully booked"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-2.5 text-sm text-gray-700 mb-4">
                    <div className="flex items-start">
                      <span className="text-gray-500 mr-2 mt-0.5">👨‍🏫</span>
                      <div>
                        <span className="font-medium">Supervisor: </span>
                        {project.supervisor}
                      </div>
                    </div>
                    {project.requirements && (
                      <div className="flex items-start">
                        <span className="text-gray-500 mr-2 mt-0.5">📋</span>
                        <div>
                          <span className="font-medium">Requirements: </span>
                          <span className="line-clamp-2">
                            {project.requirements}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {session?.user &&
                    checkPermissions(session?.user?.roles, ["student"]) && (
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
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ||
                departmentFilter !== "all" ||
                availabilityFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "There are currently no projects available"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDepartmentFilter("all");
                  setAvailabilityFilter("all");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {searchQuery ||
                departmentFilter !== "all" ||
                availabilityFilter !== "all"
                  ? "Clear filters"
                  : "Refresh page"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Page, ["public"]);
