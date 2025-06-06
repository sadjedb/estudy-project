"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FaChevronLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaUserGraduate,
  FaClipboardList,
  FaDownload,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaEnvelope,
  FaFileAlt,
  FaLaptopCode,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useModule from "@/hooks/useModule";

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
        <div className="space-y-3">
          <div className="h-10 w-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
          <div className="h-5 w-60 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-4"
            >
              <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
              <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-white rounded-2xl shadow-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ModuleHeader = ({ title, code, department, onBack }) => (
  <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

    <div className="relative z-10 flex items-center space-x-6">
      <Button
        variant="ghost"
        size="lg"
        onClick={onBack}
        className="text-white hover:bg-white/20 h-12 w-12 rounded-xl transition-all duration-200 hover:scale-105"
      >
        <FaChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <FaGraduationCap className="h-8 w-8 text-white/90" />
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        </div>
        <p className="text-xl text-white/90 font-medium">
          {code} • {department}
        </p>
      </div>
    </div>
  </div>
);

const SyllabusList = ({ syllabus, onItemClick }) => (
  <div className="space-y-3">
    {syllabus.map((item, index) => (
      <div
        key={index}
        className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
        onClick={() => onItemClick(item)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              {index + 1}
            </div>
            <div>
              <span className="font-semibold text-gray-800 text-lg">
                {item.week}
              </span>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium">View materials</span>
            <div className="w-8 h-8 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
              <FaFileAlt className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AssessmentTable = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">
        Assessment Breakdown
      </h3>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        {[
          {
            type: "Intero 1",
            weight: "10/20",
            color: "from-blue-500 to-blue-600",
          },
          {
            type: "Absence",
            weight: "-1/20",
            color: "from-red-500 to-red-600",
          },
          {
            type: "Project",
            weight: "10/20",
            color: "from-green-500 to-green-600",
          },
        ].map((assessment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${assessment.color}`}
              ></div>
              <span className="font-medium text-gray-800">
                {assessment.type}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-700">
                {assessment.weight}
              </span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${assessment.color} transition-all duration-500`}
                  style={{
                    width: `${Math.abs(parseInt(assessment.weight)) * 5}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InstructorPanel = ({
  instructor,
  instructorTitle,
  office,
  officeHours,
  email,
}) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
        <FaUserGraduate className="h-6 w-6 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Instructor</h2>
    </div>

    <div className="space-y-4">
      <div className="text-center pb-4 border-b border-gray-100">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
          {instructor?.charAt(0) || "I"}
        </div>
        <h3 className="font-bold text-xl text-gray-800">{instructor}</h3>
        <p className="text-gray-600 font-medium">{instructorTitle}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Office</p>
            <p className="text-gray-600">{office}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <FaEnvelope className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-blue-600 hover:text-blue-700 cursor-pointer">
              {email || `${instructor}@gmail.com`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <FaClock className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">Office Hours</p>
            <p className="text-gray-600">{officeHours}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseDetailsCard = ({ schedule, location, credits }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
        <FaCalendarAlt className="h-6 w-6 text-white" />
      </div>
      Course Details
    </h2>

    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center space-x-3 mb-2">
          <FaClock className="h-5 w-5 text-blue-600" />
          <p className="font-semibold text-blue-800">Schedule</p>
        </div>
        <p className="text-gray-700 ml-8">{schedule}</p>
      </div>

      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
        <div className="flex items-center space-x-3 mb-2">
          <FaMapMarkerAlt className="h-5 w-5 text-purple-600" />
          <p className="font-semibold text-purple-800">Location</p>
        </div>
        <p className="text-gray-700 ml-8">{location}</p>
      </div>

      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
        <div className="flex items-center space-x-3 mb-2">
          <FaGraduationCap className="h-5 w-5 text-green-600" />
          <p className="font-semibold text-green-800">Credits</p>
        </div>
        <p className="text-gray-700 ml-8 font-bold">{credits}</p>
      </div>
    </div>
  </div>
);

const MaterialsDialog = ({ isOpen, onClose, selectedWeek }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
      <DialogHeader className="pb-6 border-b border-gray-100">
        <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
            <FaBookOpen className="h-5 w-5" />
          </div>
          {selectedWeek?.week}
        </DialogTitle>
        {selectedWeek?.description && (
          <p className="text-gray-600 mt-2 ml-13">{selectedWeek.description}</p>
        )}
      </DialogHeader>

      {selectedWeek && (
        <div className="space-y-6 py-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-bold text-lg mb-4 flex items-center text-blue-800">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <FaBookOpen className="h-4 w-4 text-white" />
              </div>
              Course Materials
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-700 font-medium">
                  Lecture slides and notes
                </p>
                <p className="text-sm text-gray-500 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                  {selectedWeek.courseFile}
                </p>
              </div>
              <a
                href={selectedWeek.courseFile}
                download
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaDownload className="mr-2" /> Download
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-bold text-lg mb-4 flex items-center text-green-800">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <FaLaptopCode className="h-4 w-4 text-white" />
              </div>
              TD/TP Materials
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-700 font-medium">
                  Tutorial exercises and practical work
                </p>
                <p className="text-sm text-gray-500 mt-1 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                  {selectedWeek.tdFile}
                </p>
              </div>
              <a
                href={selectedWeek.tdFile}
                download
                className="ml-4 bg-green-600 hover:bg-green-700 text-white flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaDownload className="mr-2" /> Download
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full h-12 text-lg font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FaTimes className="mr-2" /> Close
              </Button>
            </DialogClose>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

const ModuleDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const moduleId = params?.module;

  const {
    data: modulesData,
    loading: modulesLoading,
    getModuleById,
  } = useModule();

  useEffect(() => {
    if (!moduleId) {
      setError("Module ID is missing");
      setLoading(false);
      router.push("/courses");
    }
  }, [moduleId, router]);

  useEffect(() => {
    if (moduleId) {
      setLoading(true);
      getModuleById(moduleId)
        .catch((err) => {
          setError(err.message || "Failed to load module");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [moduleId]);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/dashboard/courses");
    }
  };

  const handleWeekClick = (week) => {
    setSelectedWeek(week);
    setIsDialogOpen(true);
  };

  const [module, setModule] = useState(null);

  useEffect(() => {
    if (modulesData && modulesData.module) {
      setModule(modulesData.module);
    }
  }, [modulesData]);

  if (loading || modulesLoading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Module
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => router.push("/courses")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Return to Courses
          </Button>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Module Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested module could not be found.
          </p>
          <Button
            onClick={() => router.push("/courses")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Return to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 space-y-8">
        <ModuleHeader
          title={module.title}
          code={module.code}
          department={module.department}
          onBack={handleBack}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <FaBookOpen className="h-6 w-6 text-white" />
                </div>
                Description
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {module.description}
                </p>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                  <FaCalendarAlt className="h-6 w-6 text-white" />
                </div>
                Syllabus
              </h2>
              <SyllabusList
                syllabus={module.syllabus || []}
                onItemClick={handleWeekClick}
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center text-gray-800">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <FaClipboardList className="h-6 w-6 text-white" />
                </div>
                Assessment
              </h2>
              <AssessmentTable />
            </section>
          </div>

          <div className="space-y-8">
            <InstructorPanel
              instructor={module.instructor}
              instructorTitle={module.instructorTitle}
              office={module.office}
              email={module.email}
              officeHours={module.officeHours}
            />
            <CourseDetailsCard
              schedule={module.schedule}
              location={module.location}
              credits={module.credits}
            />
          </div>
        </div>

        <MaterialsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          selectedWeek={selectedWeek}
        />
      </div>
    </div>
  );
};

export default ModuleDetailPage;
