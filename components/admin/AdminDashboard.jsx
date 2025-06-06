"use client";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TabNavigation from "./Shared/TabNavigation";
import AnnouncementList from "./Announcements/AnnouncementList";
import ProjectForm from "./Projects/ProjectForm";
import ProjectList from "./Projects/ProjectList";
import StudentList from "./Students/StudentList";
import StudentForm from "./Students/StudentForm";
import AnnouncementForm from "./Announcements/AnnouncementForm";
import ModuleManagement from "./Courses/ModuleManagement";
import useApi from "@/hooks/useApi";
import useProject from "@/hooks/useProject";
import useStudent from "@/hooks/useStudent";
import useAnnouncements from "@/hooks/useAnnouncements";
import useWhishlist from "@/hooks/useWhishlist";
import useModule from "@/hooks/useModule";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [editMode, setEditMode] = useState({ type: null, id: null });
  const [showAddForm, setShowAddForm] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [projects, setProjects] = useState([]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    department: "cs",
    spots: 1,
    supervisor: "",
  });

  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    department: "all",
    urgent: false,
    description: "",
    spots: 1,
    supervisor: "",
  });
  const {
    loading,
    data: projectsData,
    addProject,
    removeProject,
  } = useProject();
  const {
    loading: loadingStudents,
    data: studentsData,
    addStudent,
  } = useStudent();
  const {
    loading: loadingAnnouncements,
    data: announcementsData,
    addAnnouncement,
    removeAnnouncement,
  } = useAnnouncements();
  const { loading: loadingModules, data: modulesData } = useModule();
  const modules = modulesData?.modules || [];

  const exitEditMode = () => setEditMode({ type: null, id: null });

  const enterEditMode = (type, item) => {
    setEditMode({ type, id: item.id });
    setEditForm(item);
  };

  const saveEdit = async (e) => {
    if (editMode.type === "announcement") {
      e.preventDefault();
      const announcement = editForm;
      await addAnnouncement(announcement);

      // setAnnouncements(
      //   announcements.map((a) => (a.id === editMode.id ? editForm : a))
      // );
    } else if (editMode.type === "project") {
      e.preventDefault();
      const project = editForm;
      await addProject(project);
    }
    exitEditMode();
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    await addAnnouncement(newAnnouncement);
    const announcement = {
      ...newAnnouncement,
      id: announcements.length + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({
      title: "",
      content: "",
      department: "all",
      urgent: false,
    });
  };

  const deleteAnnouncement = async (id) => {
    // setAnnouncements(announcements.filter((a) => a.id !== id));
    await removeAnnouncement(id);
  };

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData.projects);
    }
  }, [projectsData]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const project = { ...newProject };
    await addProject(project);
    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      department: "cs",
      spots: 1,
      supervisor: "",
    });
  };

  const deleteProject = async (id) => {
    // setProjects(projects.filter((p) => p.id !== id));
    await removeProject(id);
  };

  // Student Handlers
  const handleAddStudent = async (student) => {
    await addStudent(student);

    // const student = { ...newStudent, id: students.length + 1 };
    // setStudents([...students, student]);
    // setNewStudent({ name: "", email: "", department: "cs", wishlist: [] });
    // setShowAddForm(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "announcements":
        return (
          <>
            <AnnouncementForm
              editMode={editMode}
              editForm={editForm}
              newAnnouncement={newAnnouncement}
              setEditForm={setEditForm}
              setNewAnnouncement={setNewAnnouncement}
              saveEdit={saveEdit}
              exitEditMode={exitEditMode}
              handleAddAnnouncement={handleAddAnnouncement}
            />
            <AnnouncementList
              announcements={announcementsData?.announcments || []}
              editMode={editMode}
              enterEditMode={enterEditMode}
              deleteAnnouncement={deleteAnnouncement}
            />
          </>
        );

      case "projects":
        return (
          <>
            <ProjectForm
              editMode={editMode}
              editForm={editForm}
              newProject={newProject}
              setEditForm={setEditForm}
              setNewProject={setNewProject}
              saveEdit={saveEdit}
              exitEditMode={exitEditMode}
              handleAddProject={handleAddProject}
            />
            <ProjectList
              projects={projects}
              editMode={editMode}
              enterEditMode={enterEditMode}
              deleteProject={deleteProject}
            />
          </>
        );

      case "students":
        return (
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {loadingStudents ? (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Admin Dashboard
                    </h1>
                  </div>

                  {showAddForm ? (
                    <StudentForm
                      projects={[]}
                      modules={modules}
                      setShowAddForm={setShowAddForm}
                      handleAddStudent={handleAddStudent}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center mb-4"
                      >
                        <FiPlus className="inline mr-2" />
                        Add Student
                      </button>
                      <StudentList
                        students={studentsData?.students || []}
                        projects={[]}
                        loading={loadingStudents}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );

      case "courses":
        return <ModuleManagement />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage announcements, projects, students, and modules
          </p>
        </div>

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={["announcements", "projects", "students", "modules"]}
        />

        <div className="space-y-6">{renderActiveTab()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
