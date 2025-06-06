import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dep_data from "@/public/dep_data.json";
import {
  Building2,
  GraduationCap,
  UserRound,
  Mail,
  Phone,
  Globe,
  MapPin,
  BookOpen,
  Users,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DepartmentPage({ params }) {
  const deps = dep_data.university.departments;
  const department = deps.find(
    (dept) => dept.abbreviation === params.department
  );

  if (!department) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md text-center border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Department Not Found
            </CardTitle>
            <CardDescription className="mt-2 text-lg text-gray-600">
              The department with abbreviation "{params.department}" could not
              be found.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button className="px-6 py-3 rounded-lg" asChild>
              <a href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center">
        <Button variant="ghost" className="pl-2 rounded-full" asChild>
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 h-72">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-12">
          <div className="max-w-3xl space-y-4">
            <Badge className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
              <Clock className="w-4 h-4 mr-2" />
              Est. {department.established}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {department.name}
            </h1>
            <p className="text-xl text-white/90">
              {department.tagline ||
                `Excellence in ${department.name} education and research`}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Department Card */}
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                About the Department
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                {department.description ||
                  `The ${department.name} Department at ${deps.name} has been providing 
                  quality education since ${department.established}. Our department is 
                  committed to excellence in teaching and research, preparing students 
                  for successful careers in their field. We offer a comprehensive 
                  curriculum that combines theoretical knowledge with practical 
                  applications.`}
              </p>
            </CardContent>
          </Card>

          {/* Programs & Courses Card */}
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                Programs & Courses
              </CardTitle>
              <CardDescription className="text-gray-600">
                Explore our academic offerings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {department.courses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-white"
                  >
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{course}</h3>
                      <p className="text-gray-500 mt-1">
                        {course.length > 20
                          ? "Undergraduate/Graduate Program"
                          : "Core Course"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Department Facts Card */}
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                Department Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <UserRound className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department Head</p>
                  <p className="font-semibold text-gray-800">
                    {department.head}
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-800">
                    {department.building}
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Faculty Members</p>
                  <p className="font-semibold text-gray-800">
                    {department.facultyCount || "25+"}
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Badge className="w-5 h-5 p-0 bg-transparent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Abbreviation</p>
                  <p className="font-semibold text-gray-800 uppercase">
                    {department.abbreviation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${
                      department.email ||
                      `${department.abbreviation.toLowerCase()}@university.edu`
                    }`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {department.email ||
                      `${department.abbreviation.toLowerCase()}@university.edu`}
                  </a>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a
                    href={`tel:${department.phone || "1234567890"}`}
                    className="font-semibold text-gray-800"
                  >
                    {department.phone || "(123) 456-7890"}
                  </a>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={
                      department.website ||
                      `https://university.edu/${department.abbreviation.toLowerCase()}`
                    }
                    className="font-semibold text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Department Site
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
