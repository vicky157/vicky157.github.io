"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get in touch for research collaboration, speaking opportunities, or just to say hello.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-6 text-sky-600 dark:text-sky-400">
                        Contact Information
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              11428 Cedar Glen Pkwy,<br />
                              Cleveland, Ohio 44106,<br />
                              United States
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Smartphone className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              +1 216-463-5254
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Mail className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              vikashjohn2505@gmail.com
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                      <p className="font-medium mb-4">Connect with me</p>
                      <div className="flex space-x-4">
                        <a
                          href="https://github.com/vicky157"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 p-3 rounded-full transition-colors"
                        >
                          <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/vikash-singh-937aa7195/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 p-3 rounded-full transition-colors"
                        >
                          <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                        <a
                          href="mailto:vikashjohn2505@gmail.com"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 p-3 rounded-full transition-colors"
                        >
                          <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Map or Additional Content */}
                  <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden bg-sky-50 dark:bg-sky-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-xl font-semibold mb-2 text-sky-600 dark:text-sky-400">
                          Research Interests
                        </h3>
                        <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
                          <li>• Large Language Models</li>
                          <li>• Explainable AI</li>
                          <li>• Model Optimization</li>
                          <li>• Deep Learning</li>
                          <li>• Machine Learning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}