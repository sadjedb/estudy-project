import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronLeft,
  Shield,
  Lock,
  User,
  Settings,
  Bell,
  Download,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button
              className="flex items-center gap-2 pl-3 pr-5 py-2.5 rounded-lg transition-all hover:shadow-sm"
              variant="ghost"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home Page
            </Button>
          </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Shield className="text-blue-600 w-8 h-8" />
                Privacy Policy
              </h1>
              <p className="text-gray-500 text-sm">
                Last Updated: March 1, 2025
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Version 2.1
            </div>
          </div>

          <div className="space-y-10">
            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Welcome to{" "}
                    <span className="font-medium text-blue-600">Estudy</span>.
                    We are committed to protecting your personal information and
                    your right to privacy. This Privacy Policy explains how we
                    collect, use, and disclose your information when you use our
                    educational platform.
                  </p>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    2. Information We Collect
                  </h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                        Required
                      </span>
                      <div>
                        <strong className="text-gray-700">
                          Account Information:
                        </strong>{" "}
                        Name, email, institution, and user credentials
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                        Academic
                      </span>
                      <div>
                        <strong className="text-gray-700">
                          Academic Data:
                        </strong>{" "}
                        Course enrollments, grades, assignments, and progress
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                        Automatic
                      </span>
                      <div>
                        <strong className="text-gray-700">Usage Data:</strong>{" "}
                        IP addresses, browser type, pages visited, and
                        timestamps
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Core Functions
                      </h3>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Provide and maintain our services
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Process transactions and enrollments
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Personalize learning experience
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Improvements
                      </h3>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Develop new features
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Analyze usage patterns
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Prevent fraudulent activities
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    4. Data Protection
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                    <ul className="grid sm:grid-cols-2 gap-4 text-gray-600">
                      <li className="flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-md shadow-sm">
                          <Lock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>SSL/TLS encryption for data transmission</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-md shadow-sm">
                          <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>Regular security audits</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-md shadow-sm">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>Role-based access control</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-md shadow-sm">
                          <Settings className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>GDPR compliance measures</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    5. Your Rights
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Access & Control
                      </h3>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Request data access
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Update personal information
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Delete account
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Preferences
                      </h3>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Opt-out of marketing
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Manage cookie settings
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Download course data
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="group">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 mt-1 group-hover:bg-blue-100 transition-colors">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    6. Policy Updates
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this policy periodically. Significant changes
                    will be notified through platform announcements or email.
                    Continued use after changes constitutes acceptance of the
                    revised policy.
                  </p>
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          You can download the previous versions of our Privacy
                          Policy from our documentation center.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
