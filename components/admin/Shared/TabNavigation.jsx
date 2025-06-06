import { FiBell, FiBook, FiUser } from "react-icons/fi";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b mb-6">
      <button
        className={`px-4 py-2 ${
          activeTab === "announcements"
            ? "border-b-2 border-blue-500 font-medium"
            : ""
        }`}
        onClick={() => setActiveTab("announcements")}
      >
        <FiBell className="inline mr-2" />
        Announcements
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "projects"
            ? "border-b-2 border-blue-500 font-medium"
            : ""
        }`}
        onClick={() => setActiveTab("projects")}
      >
        <FiBook className="inline mr-2" />
        Projects
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "students"
            ? "border-b-2 border-blue-500 font-medium"
            : ""
        }`}
        onClick={() => setActiveTab("students")}
      >
        <FiUser className="inline mr-2" />
        Students
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === "courses"
            ? "border-b-2 border-blue-500 font-medium"
            : ""
        }`}
        onClick={() => setActiveTab("courses")}
      >
        <FiBook className="inline mr-2" />
        Courses
      </button>
    </div>
  );
};

export default TabNavigation;
