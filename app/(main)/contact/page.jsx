"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiFacebook,
  FiMapPin,
} from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Contact The Administration
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-6 rounded-full" />
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? Reach out to our team through any
            of these channels.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white hover:border-blue-100"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <FiMail className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-2">For general inquiries</p>
                  <a
                    href="mailto:estudyInIkama@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    estudyInIkama@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 0.2 }}
              className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white hover:border-blue-100"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <FiPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Available Mon-Fri, 9am-5pm
                  </p>
                  <a
                    href="tel:+213123456789"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    +213 (123) 45-6789
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="float"
              transition={{ delay: 0.4 }}
              className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white hover:border-blue-100"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <FiMapPin className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Visit Us
                  </h3>
                  <p className="text-gray-600">123 University Avenue</p>
                  <p className="text-gray-600">Algiers, Algeria</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-6 pt-6"
            >
              {[
                {
                  icon: <FiLinkedin />,
                  color: "text-blue-700",
                  hover: "hover:bg-blue-100",
                  url: "https://linkedin.com",
                },
                {
                  icon: <FiFacebook />,
                  color: "text-blue-600",
                  hover: "hover:bg-blue-100",
                  url: "https://facebook.com",
                },
                {
                  icon: <FiGithub />,
                  color: "text-gray-700",
                  hover: "hover:bg-gray-100",
                  url: "https://github.com",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${social.color} ${social.hover} transition-all duration-300`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Send us a message
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <input
                    type="text"
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <input
                    type="email"
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <textarea
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-40"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <FiSend className="text-lg" />
                <span>Send Message</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
