"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useMarks from "@/hooks/useMarks";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const session = useSession();
  const [marks, setMarks] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });

  const {
    data: marksData,
    loading: marksLoading,
    error: marksError,
    statusCode: marksStatusCode,
  } = useMarks(session?.data?.user?.id);

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
          details: item.details || [],
        }))
      );
    }
  }, [marksData]);

  // Calculate statistics
  const averageScore =
    marks.length > 0
      ? (
          marks.reduce((acc, curr) => acc + curr.score, 0) / marks.length
        ).toFixed(1)
      : "--";

  const highestScore =
    marks.length > 0 ? Math.max(...marks.map((g) => g.score)) : 0;

  const totalCoef = marks.reduce((acc, mark) => acc + mark.coef, 0);

  const calculateModuleMoy = (grade) => {
    const tdTpAvg = (grade.td_score + grade.tp_score) / 2 || 0;
    return tdTpAvg * 0.4 + grade.score * 0.6;
  };
  const totalWeightedMoy = marks.reduce((acc, grade) => {
    const moduleMoy = calculateModuleMoy(grade);
    return acc + moduleMoy * grade.coef;
  }, 0);
  const sortedMarks = [...marks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  const moyenneDeSemester =
    totalCoef > 0 ? (totalWeightedMoy / totalCoef).toFixed(2) : "--";

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getGradeColor = (score) => {
    if (score >= 16) return "bg-green-100 text-green-800";
    if (score >= 12) return "bg-blue-100 text-blue-800";
    if (score >= 10) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (marksLoading) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">
          Loading your academic transcript...
        </p>
      </div>
    );
  }

  if (marksError) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-xl font-bold mb-2">Error loading transcript</h3>
        <p className="text-muted-foreground mb-4">
          {marksError.message || "Failed to load your academic records"}
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <FaChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Academic Transcript</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          {session.data?.user?.name} • {marks[0]?.year || "Current"} Academic
          Year
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageScore}</div>
            <p className="text-xs text-muted-foreground">/ 20 points</p>
            <Progress value={(averageScore / 20) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Highest Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${getGradeColor(
                highestScore
              )} px-3 py-1 rounded-full inline-block`}
            >
              {highestScore || "--"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {marks.find((g) => g.score === highestScore)?.title ||
                "No courses yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Semester Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                moyenneDeSemester >= 10 ? "text-green-600" : "text-rose-600"
              }`}
            >
              {moyenneDeSemester}
            </div>
            <div className="mt-1">
              <Badge
                variant={moyenneDeSemester >= 10 ? "success" : "destructive"}
              >
                {moyenneDeSemester >= 10 ? "Passing" : "Failing"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaChartLine className="mr-2 h-5 w-5 text-muted-foreground" />
            Course Grades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[200px] cursor-pointer hover:bg-accent"
                  onClick={() => requestSort("title")}
                >
                  <div className="flex items-center">
                    Course
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Coef</TableHead>
                <TableHead>TD</TableHead>
                <TableHead>TP</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Module Avg</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMarks.length > 0 ? (
                sortedMarks.map((grade) => (
                  <>
                    <TableRow key={grade.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">
                        {grade.title}
                      </TableCell>
                      <TableCell>{grade.coef}</TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getGradeColor(
                            grade.td_score
                          )} px-2 py-1 rounded-full`}
                        >
                          {grade.td_score || "--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getGradeColor(
                            grade.tp_score
                          )} px-2 py-1 rounded-full`}
                        >
                          {grade.tp_score || "--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getGradeColor(
                            grade.score
                          )} px-2 py-1 rounded-full`}
                        >
                          {grade.score || "--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getGradeColor(
                            calculateModuleMoy(grade)
                          )} px-2 py-1 rounded-full`}
                        >
                          {calculateModuleMoy(grade).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                    {expandedModule === grade.id &&
                      grade.details.length > 0 && (
                        <TableRow className="bg-accent/20">
                          <TableCell colSpan={7}>
                            <div className="p-4">
                              <h4 className="font-medium mb-2 flex items-center">
                                <FaInfoCircle className="mr-2 text-muted-foreground" />
                                Detailed Grades
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {grade.details.map((detail, index) => (
                                  <div
                                    key={index}
                                    className="border rounded-lg p-3"
                                  >
                                    <div className="font-medium">
                                      {detail.type}
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-sm text-muted-foreground">
                                        {detail.date || "No date"}
                                      </span>
                                      <span
                                        className={`font-medium ${getGradeColor(
                                          detail.score
                                        )} px-2 py-1 rounded-full`}
                                      >
                                        {detail.score || "--"} / 20
                                      </span>
                                    </div>
                                    {detail.comments && (
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {detail.comments}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        No grades recorded yet for this semester
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-2"></span>
            ≥ 16: Excellent
            <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300 mx-2 ml-4"></span>
            ≥ 12: Good
            <span className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-300 mx-2 ml-4"></span>
            ≥ 10: Passing
            <span className="w-3 h-3 rounded-full bg-red-100 border border-red-300 mx-2 ml-4"></span>
            &lt; 10: Failing
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
