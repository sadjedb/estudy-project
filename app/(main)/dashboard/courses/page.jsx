"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaLaptopCode,
  FaCalculator,
  FaAtom,
  FaFlask,
  FaBookOpen,
  FaChevronLeft,
  FaTh,
  FaList,
  FaSearch,
  FaFilter,
  FaChalkboardTeacher,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import withAuth from "@/lib/utils/withAuth";
import useModule from "@/hooks/useModule";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const AllModulesPage = () => {
  const [layout, setLayout] = useState("grid");
  const [allModules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: modulesData,
    loading: modulesLoading,
    error: modulesError,
  } = useModule();

  useEffect(() => {
    if (modulesData) {
      setModules(modulesData.modules);
    }
  }, [modulesData]);

  const getIcon = (code) => {
    switch (code) {
      case "CS":
        return <FaLaptopCode className="text-blue-500" size={20} />;
      case "MATH":
        return <FaCalculator className="text-red-500" size={20} />;
      case "PHY":
        return <FaAtom className="text-yellow-500" size={20} />;
      case "CHEM":
        return <FaFlask className="text-teal-500" size={20} />;
      default:
        return <FaBookOpen className="text-gray-500" size={20} />;
    }
  };

  const filteredModules = allModules.filter((module) => {
    // Search filter
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    // Department filter
    const matchesDepartment =
      departmentFilter === "all" ||
      module.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  const departments = [
    ...new Set(allModules.map((module) => module.department)),
  ];

  if (modulesLoading) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading modules...</p>
      </div>
    );
  }

  if (modulesError) {
    return (
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-xl font-bold mb-2">Error loading modules</h3>
        <p className="text-muted-foreground mb-6">{modulesError.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const ModuleCard = ({ module }) => (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">{module.title}</CardTitle>
          <CardDescription>{module.code}</CardDescription>
        </div>
        <div className="rounded-full p-3 bg-secondary">
          {getIcon(module.code)}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {module.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FaChalkboardTeacher
                className="text-muted-foreground"
                size={14}
              />
              <span>{module.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaUniversity className="text-muted-foreground" size={14} />
              <span>{module.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaCreditCard className="text-muted-foreground" size={14} />
              <span>{module.credits} Credits</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/courses/${module.code}`} className="w-full">
          <Button variant="outline" className="w-full">
            <FaBookOpen className="mr-2" /> View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  const ModuleListItem = ({ module }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-3 bg-secondary hidden md:block">
              {getIcon(module.code)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{module.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary">{module.code}</Badge>
                <Badge variant="outline">{module.department}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {module.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
            <div className="text-sm">
              <p className="text-muted-foreground">Instructor</p>
              <p className="font-medium">{module.instructor}</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Credits</p>
              <p className="font-medium">{module.credits}</p>
            </div>
            <Link href={`/dashboard/courses/${module.code}`}>
              <Button variant="outline" className="md:ml-4">
                <FaBookOpen className="mr-2" /> Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <FaChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">All Modules</h1>
          <Badge variant="secondary" className="hidden sm:flex">
            {allModules.length} Modules
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("grid")}
            aria-label="Grid view"
          >
            <FaTh className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setLayout("list")}
            aria-label="List view"
          >
            <FaList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search modules by title, code, or instructor..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className="h-4 w-4" />
            <span>Filter</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-background border rounded-md shadow-lg z-10 p-2">
              <div className="space-y-2">
                <label className="block px-2 py-1 text-sm font-medium">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      {(searchTerm || departmentFilter !== "all") && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredModules.length} of {allModules.length} modules
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={() => {
              setSearchTerm("");
              setDepartmentFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Modules Display */}
      {filteredModules.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto max-w-md">
              <FaBookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">No modules found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || departmentFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "There are currently no modules available"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setDepartmentFilter("all");
                }}
              >
                {searchTerm || departmentFilter !== "all"
                  ? "Clear filters"
                  : "Refresh"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : layout === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredModules.map((module) => (
            <ModuleListItem key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(AllModulesPage, ["admin", "student"]);
