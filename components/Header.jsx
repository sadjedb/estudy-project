"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HiX, HiMenu } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated" && session.data?.user?.roles) {
      setIsAdmin(session.data.user.roles.includes("admin"));
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: isAdmin ? "/admin/dashboard" : "/dashboard" },
    { name: "Announcments", path: "/announcments" },
    { name: "Projects", path: "/projects" },
    ...(session.status === "authenticated" && !isAdmin
      ? [{ name: "Profile", path: "/profile" }]
      : []),
  ];

  return (
    <div className="w-full h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          {/* <Image src={logo} width={40} height={40} alt="logo" /> */}
          <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
            estudy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === link.path ? "text-blue-600 font-medium" : ""
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {session.status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Login
              </Link>
            </motion.div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-600" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-6">
              <div className="flex flex-col items-start gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-lg ${
                      pathname === link.path
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {session.status === "authenticated" && (
                  <div className="w-full pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">
                      Logged in as: {session.data.user?.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Header;
