"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationPage() {
  const education = [
    {
      degree: "Doctor of Philosophy in Computer Science",
      institution: "Case Western Reserve University",
      location: "Cleveland, Ohio",
      period: "August 2024 - Present",
      courses: [
        {
          name: "Large Language Models",
          description: "Explored advanced techniques in machine learning, with a focus on practical applications of multitask learning models. Presented a paper titled 'Measuring Multitask Language Understanding', which involved analyzing and discussing state-of-the-art models and evaluation metrics in natural language processing (NLP). Gained hands-on experience with advanced machine learning frameworks and methods to handle large-scale datasets. Outcomes: LLMs, Llama, GPT, BERT, Evaluation, Olmo, Reasoning in LLMs, High performance computing, Data Parallelization, Algorithm Parallelization etc."
        }
      ]
    },
    {
      degree: "Masters of Science in Computer Science (Specialization in ML/AI)",
      institution: "Case Western Reserve University",
      location: "Cleveland, Ohio",
      period: "August 2023 - May 2025",
      courses: [
        {
          name: "Designing High performant systems for AI",
          description: "Project: Incorporated SMM on OneAPI in SYCL | Python3 to enhance YOLOV4 in a course on designing high-performing AI systems. Led the development of YOLOV4 sycl-python integration, emphasizing advanced object detection algorithms and SYCL-Python optimization. Conducted extensive research, applying machine learning techniques to elevate real-time data processing and enhance visual data accuracy. Outcomes: GEMM, SMM, BMM, High performance computing, Data Parallelization, Algorithm Parallelization etc."
        },
        {
          name: "Analysis of Algorithms",
          description: "Acquired comprehensive knowledge in the realm of Data Structures and Algorithms, encompassing foundational concepts such as Greedy Algorithms, Graph Theory, Dynamic Programming, and NP-Completeness. This educational pursuit involved a detailed exploration of algorithmic methodologies and computational complexities, laying a robust foundation in the formal understanding and application of these core principles within the field."
        }
      ]
    },
    {
      degree: "Bachelors of Technology in Civil Engineering with minor in AI and Computer Science",
      institution: "Indian Institute of Technology Mandi",
      location: "Mandi, Himachal Pradesh",
      period: "June 2019 - May 2023",
      courses: [
        {
          name: "Deep Learning and its Applications",
          description: "Contributed to a project focused on real-time sign language detection, aimed at assisting individuals who may face challenges in verbal communication or choose to conceal their emotions. This initiative seeks to enhance understanding and communication by interpreting sign language gestures, providing a valuable tool for those who rely on non-verbal expressions. Outcomes: LLM, CNN, AutoEncoders, GANs, VAEs, RNN, Perceptron etc."
        },
        {
          name: "Pattern Recognition",
          description: "Acquired proficiency in Probability, Random Processes, Linear Algebra, and topics including Bayes Decision Theory, Parameter Estimation, Unsupervised Learning, Sequential Pattern Recognition, Nonparametric Density Estimation, Dimensionality Reduction, and Pattern Classification."
        }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Education</h1>
          <p className="text-gray-600 dark:text-gray-400">
            My academic journey in pursuing excellence in Computer Science, Artificial Intelligence, and Machine Learning.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="timeline-item"
            >
              <Card className="mb-8 hover-lift">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-sky-600 dark:text-sky-400">{edu.degree}</h2>
                      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>{edu.institution}</span>
                      </div>
                      <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <h3 className="text-lg font-semibold">Key Courses:</h3>
                    {edu.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="ml-4">
                        <h4 className="text-md font-semibold text-sky-600 dark:text-sky-400 mb-2">
                          {course.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {course.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-16 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Additional Courses & Certifications</h2>
          <ul className="space-y-3 ml-6 list-disc">
            <li className="text-gray-700 dark:text-gray-300">Large Language Models</li>
            <li className="text-gray-700 dark:text-gray-300">Data Structures & Algorithms</li>
            <li className="text-gray-700 dark:text-gray-300">Designing High-Performance Systems for AI</li>
            <li className="text-gray-700 dark:text-gray-300">Deep Learning</li>
            <li className="text-gray-700 dark:text-gray-300">Machine Learning</li>
            <li className="text-gray-700 dark:text-gray-300">Data Science I, II, III</li>
            <li className="text-gray-700 dark:text-gray-300">Computer Vision</li>
            <li className="text-gray-700 dark:text-gray-300">Pattern Recognition</li>
            <li className="text-gray-700 dark:text-gray-300">Data Privacy</li>
            <li className="text-gray-700 dark:text-gray-300">Data Mining</li>
            <li className="text-gray-700 dark:text-gray-300">Computer Security</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}