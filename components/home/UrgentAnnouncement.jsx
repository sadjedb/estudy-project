"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiAlertTriangle, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import useAnnouncements from "@/hooks/useAnnouncements";
import { useEffect, useState, useRef } from "react";

const UrgentAnnouncement = () => {
  const { data: announcementsData } = useAnnouncements();
  const [urgentAnnouncements, setUrgentAnnouncements] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (announcementsData) {
      const urgent = announcementsData.announcments.filter(
        (announcement) => announcement.urgent == 1
      );
      setUrgentAnnouncements(urgent);
    }
  }, [announcementsData]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center flex-col py-8 px-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FiCalendar className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        </div>
        <p className="text-muted-foreground">
          Important updates and urgent notices
        </p>
      </motion.div>

      <Tabs defaultValue="urgent" className="w-full">
        <TabsContent value="urgent">
          {urgentAnnouncements.filter((a) => a.urgent == 1).length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {urgentAnnouncements
                .filter((a) => a.urgent == 1)
                .map((announcement) => (
                  <motion.div key={announcement.id} variants={itemVariants}>
                    <Card className="border-l-4 border-destructive">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div>
                          <CardTitle className="text-lg">
                            {announcement.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {announcement.department}
                            </Badge>
                            <Badge variant="destructive">
                              <FiAlertTriangle className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(announcement.datetime)}
                        </span>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {announcement.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <Alert>
              <AlertTitle>No urgent announcements</AlertTitle>
              <AlertDescription>
                There are currently no urgent announcements.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UrgentAnnouncement;
