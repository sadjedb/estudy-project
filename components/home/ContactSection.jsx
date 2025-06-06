"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      description:
        "Send us an email and we'll get back to you as soon as possible.",
      content: "academics@univ-setif.dz",
      action: {
        label: "Send Email",
        href: "mailto:academics@univ-setif.dz",
      },
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      description:
        "Call our administration office during working hours (8AM-4PM).",
      content: "+213 36 12 34 567",
      action: {
        label: "Call Now",
        href: "tel:+213361234567",
      },
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      description:
        "University of Sétif, Science Building, 2nd Floor, Sétif, Algeria",
      content: "",
      action: {
        label: "View on Map",
        href: "https://maps.google.com?q=University+of+Setif",
      },
      color: "text-amber-600",
      bgColor: "bg-amber-100",
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
      id="contact"
      className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Contact Us
          </h2>
          <p className="max-w-2xl text-muted-foreground text-lg md:text-xl">
            Have questions? Get in touch with our academic departments through
            any of these channels.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {contactMethods.map((method, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-200/50">
                <CardHeader className="pb-4">
                  <div
                    className={`${method.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <div className={method.color}>{method.icon}</div>
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  {method.content && (
                    <p className="font-medium mb-4">{method.content}</p>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full transition-colors hover:bg-gray-100"
                  >
                    <a
                      href={method.action.href}
                      target={
                        method.title === "Visit Us" ? "_blank" : undefined
                      }
                      rel={
                        method.title === "Visit Us"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {method.action.label}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">Office Hours</h3>
          <p className="text-muted-foreground mb-6 text-lg">
            Monday - Friday: 8:00 AM - 4:00 PM
            <br />
            Saturday: 9:00 AM - 12:00 PM
            <br />
            Closed on Sundays and public holidays
          </p>
          <Link
            href={"/contact"}
            className="gap-2 border-[1px] border-gray-300 hover:bg-gray-100 transition-colors px-4 py-2 rounded-md inline-flex items-center "
          >
            <Phone className="w-4 h-4" />
            Emergency Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
