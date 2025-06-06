"use client";
import React, { useEffect, useState } from "react";
import { FaLinkedin, FaFacebookSquare, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const Footer = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (session.status === "authenticated" && session.data?.user?.roles) {
      setIsAdmin(session.data.user.roles.includes("admin"));
    }
  }, [session]);
  const footerLinks = [
    {
      title: "About",
      links: [
        { label: "Department", href: "#DepartmentsSection" },
        { label: "Projects", href: "/projects" },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          label: "Dashboard",
          href: isAdmin ? "/admin/dashboard" : "/dashboard",
        },
        { label: "Help Center", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "#" },
      ],
    },
  ];

  const socialIcons = [
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaFacebookSquare />, href: "#" },
    { icon: <FaGithub />, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Student Portal
            </h3>
            <p className="text-sm text-gray-600">
              Empowering students through innovative education solutions.
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-gray-900">Connect</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-xs text-gray-600">
            © 2024 Student Portal. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
