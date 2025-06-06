"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FaBell,
  FaBook,
  FaUpload,
  FaChevronRight,
  FaTimes,
  FaListAlt,
  FaChartLine,
  FaUserGraduate,
  FaCheck,
  FaRegBookmark,
  FaSearch,
} from "react-icons/fa";
import {
  Loader2,
  AlertCircle,
  BookOpen,
  FileText,
  Award,
  Clock,
  TrendingUp,
  Star,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import withAuth from "@/lib/utils/withAuth";
import useProject from "@/hooks/useProject";
import useAnnouncements from "@/hooks/useAnnouncements";
import useModule from "@/hooks/useModule";
import useWhishlist from "@/hooks/useWhishlist";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMarks from "@/hooks/useMarks";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import useSubmitProject from "@/hooks/useSubmitProject";

const CourseCard = ({ course }) => {
  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 hover:from-primary/5 hover:to-primary/10 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000" />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <CardDescription className="pt-2 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-primary/10">
                  <FaUserGraduate className="h-3 w-3 text-primary" />
                </div>
                <span className="line-clamp-1 font-medium">
                  {course.instructor}
                </span>
              </div>
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30 text-primary font-semibold px-3 py-1 shadow-sm"
          >
            {course.code}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3 relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
          >
            <Calendar className="h-3 w-3" />
            {course.schedule}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 bg-green-50 text-green-700 border-green-200 px-3 py-1"
          >
            <Star className="h-3 w-3" />
            {course.credits} Credits
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-2 relative z-10">
        <Link href={`/dashboard/courses/${course.code}`} className="w-full">
          <Button
            variant={"outline"}
            className="w-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="font-semibold">Continue Learning</span>
              <FaChevronRight className="h-3.5 w-3.5 transition-transform duration-300" />
            </div>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const session = useSession();
  const [marks, setMarks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSubmissionData, setTempSubmissionData] = useState({
    file_link: "",
    note: "",
  });

  const {
    data: whishlistData,
    loading: whishlistLoading,
    error: whishlistError,
    removeFromWhishlist,
  } = useWhishlist(session?.data?.user?.id);

  console.log("Whishlist Data:", whishlistData);
  const {
    submitProject,
    loading: submitLoading,
    error: submitError,
    isSubmittedFor,
  } = useSubmitProject(session?.data?.user?.id);

  const {
    data: marksData,
    loading: marksLoading,
    error: marksError,
  } = useMarks(session?.data?.user?.id);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useProject();

  const {
    data: announcementsData,
    loading: announcementsLoading,
    error: announcementsError,
  } = useAnnouncements();

  useEffect(() => {
    if (announcementsData?.announcments) {
      setAnnouncements(announcementsData.announcments.slice(0, 4));
    }
  }, [announcementsData]);

  const {
    data: modulesData,
    loading: modulesLoading,
    error: modulesError,
  } = useModule();

  useEffect(() => {
    if (marksData?.marks && Array.isArray(marksData?.marks)) {
      setMarks(
        marksData.marks.map((item) => ({
          id: item.mark_id,
          student_module_id: item.student_module_id,
          module_id: item.module_id,
          title: item.title,
          year: item.year,
          score: item.score,
          td_score: item.td_score,
          tp_score: item.tp_score,
          coef: item.coef || 1,
        }))
      );
    }
  }, [marksData]);

  useEffect(() => {
    if (projectsData?.projects) {
      setProjects(projectsData.projects.slice(0, 3));
    }
  }, [projectsData]);

  useEffect(() => {
    if (modulesData?.modules) {
      setCourses(
        modulesData.modules.slice(0, 3).map((module) => ({
          ...module,
          progress: Math.floor(Math.random() * 100),
        }))
      );
    }
  }, [modulesData]);

  const formatGrade = (score) => {
    if (typeof score !== "number") return "N/A";
    return Number.isInteger(score) ? score : score.toFixed(1);
  };

  const getGradeColor = (score) => {
    const percentage = (score / 20) * 100;
    if (percentage >= 85)
      return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-300";
    if (percentage >= 70)
      return "bg-gradient-to-r from-blue-50 to-sky-50 text-blue-800 border-blue-300";
    if (percentage >= 50)
      return "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-300";
    return "bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-300";
  };

  const openProjectModal = useCallback(
    (projectId) => {
      const project = projects.find((p) => p.id === projectId);
      setSelectedProject(project);
      setIsModalOpen(true);
    },
    [projects]
  );
  const closeProjectModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setTempSubmissionData({ file_link: "", note: "" });
  }, []);
  const fileLinkRef = useRef("");
  const noteRef = useRef("");
  const handleSubmit = useCallback(async () => {
    if (!fileLinkRef.current.value) {
      toast.error("Please provide a file link");
      return;
    }

    try {
      const submission = {
        student_id: session?.data?.user?.id,
        project_id: selectedProject?.id,
        file_link: fileLinkRef.current.value,
        note: noteRef.current.value,
      };

      await submitProject(submission);
      toast.success(
        `Project "${selectedProject?.title}" submitted successfully!`
      );
      closeProjectModal();
    } catch (err) {
      toast.error(err.message || "Failed to submit project");
    }
  }, [selectedProject, session, submitProject, closeProjectModal]);

  const averageScore =
    marks.length > 0
      ? (
          marks.reduce((acc, curr) => acc + (curr.score || 0), 0) / marks.length
        ).toFixed(1)
      : "--";

  const highestScore =
    marks.length > 0 ? Math.max(...marks.map((g) => g.score || 0)) : 0;

  const DashboardHeader = () => (
    <header className="mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-50/50 to-blue-50/30 rounded-2xl" />
      <div className="relative z-10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur-lg" />
              <div className="relative p-3 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg">
                <Target className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm"
          >
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Badge>
        </div>
      </div>
    </header>
  );

  const CoursesSection = () => (
    <section className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        </div>
        <Link href="/dashboard/courses">
          <Button
            variant="outline"
            className="bg-white hover:bg-primary/5 border-primary/30 text-primary hover:text-primary shadow-sm hover:shadow-md transition-all duration-300"
          >
            View All
            <FaChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <Card className="col-span-full border-0 bg-gradient-to-br from-gray-50 to-white shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mx-auto max-w-md">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-400/10 rounded-full blur-2xl" />
                  <FileText className="h-16 w-16 text-gray-400 mx-auto relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No courses enrolled yet
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Start your learning journey by exploring our available courses
                  and find the perfect fit for your goals.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );

  const AnnouncementsSection = () => (
    <Card className="border-0 bg-gradient-to-br from-white to-blue-50/30 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent -translate-x-full transition-transform duration-1000" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200/50 rounded-full blur-md" />
            <div className="relative p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
              <FaBell className="w-5 h-5" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Announcements
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className="bg-blue-50 border-blue-200 text-blue-700 font-semibold px-3 py-1 shadow-sm"
        >
          {announcements.length} New
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 relative z-10">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className="group/item relative p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer hover:shadow-md transform hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate text-sm group-hover/item:text-blue-700 transition-colors">
                  {announcement.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {announcement.content}
                </p>
              </div>
              {announcement.urgent === 1 && (
                <Badge
                  variant="destructive"
                  className="ml-2 flex-shrink-0 bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-sm animate-pulse"
                >
                  Urgent
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500 font-medium">
                {new Date(announcement.datetime).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="pt-2 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 w-full hover:bg-blue-50 font-medium transition-all duration-300"
        >
          View All Announcements
          <FaChevronRight className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );

  const WishlistSection = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = whishlistData?.wishlist?.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Card className="border-0 bg-gradient-to-br from-white to-amber-50/30 shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent -translate-x-full transition-transform duration-1000" />

        <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-200/50 rounded-full blur-md" />
              <div className="relative p-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                <FaRegBookmark className="w-5 h-5" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Wishlisted Projects
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="bg-amber-50 text-amber-700 border-amber-200 font-semibold px-3 py-1 shadow-sm"
          >
            {whishlistData?.wishlist?.length || 0} Saved
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {whishlistLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
            </div>
          ) : whishlistError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">
                Error loading wishlist: {whishlistError.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : filteredProjects?.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaRegBookmark className="text-2xl text-gray-400" />
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
                className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Browse Projects
              </Link>
            </div>
          ) : (
            <>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
                />
              </div>
              <div className="space-y-4">
                {filteredProjects?.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 hover:text-amber-600 transition-colors">
                          <Link href={`/projects/${project.project_id}`}>
                            {project.title}
                          </Link>
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Department:</span>
                            <span className="font-medium truncate max-w-[80px]">
                              {project.department}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Supervisor:</span>
                            <span className="font-medium truncate max-w-[170px]">
                              {project.supervisor} .
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
                          onClick={() =>
                            removeFromWhishlist(project.project_id)
                          }
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 z-10 absolute top-2 right-2 "
                          title="Remove project"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/projects/${project.project_id}`}
                        className="text-sm text-amber-600 hover:underline"
                      >
                        View details
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2"
                        onClick={() => {
                          setSelectedProject({
                            ...project,
                            id: project.project_id || project.id,
                          });
                          setIsModalOpen(true);
                        }}
                        disabled={isSubmittedFor(
                          session?.data?.user?.id,
                          project.project_id || project.id
                        )}
                      >
                        {isSubmittedFor(
                          session?.data?.user?.id,
                          project.project_id || project.id
                        ) ? (
                          <>
                            <FaCheck className="mr-2 h-3.5 w-3.5" /> Submitted
                          </>
                        ) : (
                          <>
                            <FaUpload className="mr-2 h-3.5 w-3.5" /> Submit
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="relative z-10">
          <Button
            variant="ghost"
            className="w-full hover:bg-amber-50 text-amber-700 hover:text-amber-800 font-medium transition-all duration-300"
            asChild
          >
            <Link href="/projects">
              Browse All Projects
              <FaChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
        <ProjectSubmissionModal />
      </Card>
    );
  };

  const GradesSection = () => (
    <Card className="border-0 bg-gradient-to-br from-white to-green-50/30 shadow-xl hover:shadow-2xl transition-all duration-500 h-full overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent -translate-x-full transition-transform duration-1000" />

      <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200/50 rounded-full blur-md" />
            <div className="relative p-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Recent Grades
          </CardTitle>
        </div>
        <Link href="/dashboard/grades">
          <Button
            variant="outline"
            size="sm"
            className="bg-white hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            View All
            <FaChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {marks.length > 0 ? (
          marks.slice(0, 2).map((exam, index) => {
            const gradeColor = getGradeColor(exam.score);
            return (
              <div
                key={exam.id}
                className="group/grade relative p-4 rounded-xl border hover:border-green-300 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative p-2.5 rounded-lg ${gradeColor} border shadow-sm`}
                    >
                      <Award className="w-4 h-4 relative z-10" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover/grade:text-green-700 transition-colors">
                        {exam.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        Final Exam
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatGrade(exam.score)}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        /20
                      </div>
                    </div>
                    <div className="w-1 h-8 bg-gradient-to-t from-green-200 to-green-400 rounded-full ml-2" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gray-200/50 rounded-full blur-xl" />
              <FaChartLine className="h-12 w-12 text-gray-400 mx-auto relative z-10" />
            </div>
            <p className="text-gray-600 font-medium">No grades recorded yet</p>
          </div>
        )}
      </CardContent>

      {marks.length > 0 && (
        <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400" />
            <div className="text-sm text-gray-600">
              Average:{" "}
              <span className="font-bold text-green-700">
                {averageScore}/20
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
            <div className="text-sm text-gray-600">
              Highest:{" "}
              <span className="font-bold text-blue-700">{highestScore}/20</span>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );

  const ProjectSubmissionModal = useMemo(
    () => () =>
      (
        <Dialog open={isModalOpen} onOpenChange={closeProjectModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                Submit Work for:{" "}
                <span className="text-blue-600">{selectedProject?.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="projectFile" className="text-right">
                  Project File Link
                </Label>
                <Input
                  id="projectFile"
                  placeholder="https://drive.google.com/your-project-file"
                  type="url"
                  className="col-span-3"
                  ref={fileLinkRef}
                  defaultValue=""
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="submissionNote" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="submissionNote"
                  placeholder="Any additional notes..."
                  className="col-span-3"
                  ref={noteRef}
                  defaultValue=""
                />
              </div>
              {submitError && (
                <div className="col-span-4 p-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">
                  <FaTimes className="mr-2" /> Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSubmit} disabled={submitLoading}>
                {submitLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaUpload className="mr-2 h-4 w-4" />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ),
    [
      isModalOpen,
      selectedProject,
      submitError,
      submitLoading,
      handleSubmit,
      closeProjectModal,
    ]
  );

  if (
    projectsLoading ||
    announcementsLoading ||
    modulesLoading ||
    marksLoading
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Loading your dashboard
          </h3>
          <p className="text-gray-600">
            Preparing your personalized experience...
          </p>
        </div>
      </div>
    );
  }

  if (projectsError || announcementsError || modulesError || marksError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-200/50 rounded-full blur-2xl" />
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto relative z-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {projectsError
              ? String(projectsError?.message || projectsError)
              : announcementsError
              ? String(announcementsError?.message || announcementsError)
              : modulesError
              ? String(modulesError?.message || modulesError)
              : marksError
              ? String(marksError?.message || marksError)
              : "We're having trouble loading your dashboard. Please try again."}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="mr-2 h-4 w-4" />
            Reload Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        <DashboardHeader />
        <CoursesSection />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AnnouncementsSection />
          </div>
          <div className="md:col-span-1">
            <WishlistSection />
          </div>
          <div className="md:col-span-1">
            <GradesSection />
          </div>
        </div>

        <ProjectSubmissionModal />
      </div>
    </div>
  );
};

export default withAuth(Dashboard, ["student"]);
