"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaLaptopCode, FaSquareRootAlt } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { GiChemicalDrop } from "react-icons/gi";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const DepartmentsSection = () => {
  const pathname = usePathname();
  console.log("Current Pathname:", pathname);
  const departments = [
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: "Computer Science",
      description:
        "Exploring the frontiers of computing, AI, and software engineering",
      url: "cs",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: <FaSquareRootAlt className="w-8 h-8" />,
      title: "Mathematics",
      description:
        "Advanced mathematical theories and their real-world applications",
      url: "math",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: <MdScience className="w-8 h-8" />,
      title: "Physics",
      description:
        "Understanding the fundamental laws that govern our universe",
      url: "phys",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <GiChemicalDrop className="w-8 h-8" />,
      title: "Chemistry",
      description:
        "Innovative research in molecular science and chemical engineering",
      url: "chem",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

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
    <section
      id="departments"
      className="w-full py-12 md:py-20 lg:py-28 bg-muted/40"
    >
      <div className=" px-8 md:px-12">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center text-center space-y-6 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Academic Departments
          </h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            Explore our diverse range of academic departments offering
            cutting-edge programs and research opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {departments.map((dept, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover:shadow-lg transition-shadow h-full flex flex-col group border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div
                    className={`${dept.bgColor} ${dept.iconColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110`}
                  >
                    {dept.icon}
                  </div>
                  <CardTitle className="text-xl">{dept.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-6">
                    {dept.description}
                  </CardDescription>
                  <Button
                    asChild
                    variant="ghost"
                    className="px-0 group-hover:underline w-full justify-start group-hover:text-primary"
                  >
                    <Link
                      href={`/departments/${dept.url}`}
                      className="flex items-center"
                    >
                      Learn more{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {!pathname.includes("/departments") ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button asChild size="lg" variant={"outline"} className="px-8">
              <Link href="/departments" className="gap-2">
                View All Departments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default DepartmentsSection;
