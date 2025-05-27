"use client";

import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <Construction className="h-24 w-24 text-sky-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Our research blog section is currently under construction. 
            We're working hard to bring you insightful content about AI, 
            Machine Learning, and cutting-edge research. Check back soon!
          </p>
        </motion.div>
      </div>
    </div>
  );
}