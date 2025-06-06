"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FiLayers,
  FiBook,
  FiCalendar,
  FiAlertTriangle,
  FiGrid,
} from "react-icons/fi";
import useAnnouncements from "@/hooks/useAnnouncements";
import { useState } from "react";

const Announcements = () => {
  const [activeDept, setActiveDept] = useState("all");
  const {
    loading: loadingAnnouncements,
    data: announcementsData,
    addAnnouncement,
    removeAnnouncement,
  } = useAnnouncements();

  const filteredAnnouncements =
    announcementsData?.announcments
      ?.filter((ann) =>
        activeDept === "all"
          ? ann.department === "all"
          : ann.department === "all" || ann.department === activeDept
      )
      .map((ann) => ({
        id: ann.id,
        title: ann.title,
        date: new Date(ann.datetime).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        urgent: ann.urgent === 1,
        content: ann.content,
      })) || [];

  const departments = {
    all: {
      id: "all",
      name: "All Departments",
      icon: <FiGrid className="text-gray-500" />,
    },
    cs: {
      id: "cs",
      name: "Computer Science",
      icon: <FiLayers className="text-blue-500" />,
    },
    math: {
      id: "math",
      name: "Mathematics",
      icon: <FiBook className="text-purple-500" />,
    },
    physics: {
      id: "physics",
      name: "Physics",
      icon: <FiLayers className="text-green-500" />,
    },
  };

  if (loadingAnnouncements) {
    return (
      <div className="px-8 py-8">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 jusctify-center items-center flex flex-col"
      >
        <div className="flex items-center  gap-3 mb-2">
          <FiCalendar className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Department Announcements
          </h1>
        </div>
        <p className="text-muted-foreground">
          Stay updated with the latest news from your department
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.entries(departments).map(([key, dept]) => (
          <button
            key={key}
            onClick={() => setActiveDept(key)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeDept === key
                ? "bg-white shadow-md text-blue-600 border border-blue-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span className="mr-2">{dept.icon}</span>
            {dept.name}
          </button>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <motion.div key={announcement.id} variants={item}>
                <Card
                  className={`border-l-4 ${
                    announcement.urgent
                      ? "border-destructive"
                      : "border-blue-600"
                  } hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{announcement.title}</CardTitle>
                      {announcement.urgent && (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <FiAlertTriangle className="w-3 h-3" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {announcement.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div variants={item}>
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No announcements available for this department
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Announcements;
