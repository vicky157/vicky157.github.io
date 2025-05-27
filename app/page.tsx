"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, GraduationCap, BookOpen, FileText, Mail, ArrowRight, FileDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800">
                PhD Student & Researcher
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Vikash Singh
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                Advancing AI Research at{" "}
                <span className="text-sky-600 dark:text-sky-400 font-medium">
                  Case Western Reserve University
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Specialized in Explainable AI, Large Language Models, and Deep Learning. 
                Passionate about making AI more interpretable, efficient, and ethical.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/papers">
                  <Button variant="outline" className="border-sky-200 hover:border-sky-300 dark:border-sky-800 dark:hover:border-sky-700">
                    View Research
                  </Button>
                </Link>
                <a href="/vikash_singh_cv.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-sky-200 hover:border-sky-300 dark:border-sky-800 dark:hover:border-sky-700">
                    Download CV <FileDown className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-md mx-auto md:ml-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">VS</div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-200 dark:bg-sky-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-sky-300 dark:bg-sky-800/30 rounded-full blur-3xl opacity-20"></div>
      </section>

      {/* Research Interests Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Research Interests</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My research focuses on advancing the field of AI through innovative approaches 
              to model optimization, explainability, and practical applications.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="h-8 w-8 text-sky-500" />,
                title: "Fine-Tuning LLMs",
                description: "Leveraging techniques such as LoRA to optimize large language and vision models for specific tasks."
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-sky-500" />,
                title: "Redundancy Mitigation",
                description: "Investigating approaches to reduce redundancy in large language models, enhancing performance and efficiency."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-sky-500" />,
                title: "Model Optimization",
                description: "Developing strategies for optimizing machine learning models, including pruning and hyperparameter tuning."
              },
              {
                icon: <FileText className="h-8 w-8 text-sky-500" />,
                title: "Explainable AI",
                description: "Advancing interpretability in AI models, focusing on enhancing transparency and providing actionable insights."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift h-full">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <div className="bg-sky-50 dark:bg-sky-900/20 p-3 rounded-full mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-16 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Research</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore some of my key research contributions across various domains of artificial intelligence.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Advancements in XAI with Specialization in Counterfactual Explanation Methods",
                description: "Leading-edge research on Explainable AI, particularly specializing in Counterfactual Explanation methods to enhance interpretability and transparency of AI systems.",
                date: "Jan 2024 - Present",
                tags: ["XAI", "DNNs", "GNN", "Counterfactual"]
              },
              {
                title: "Analyzation of Nano Particles in Environment using Deep Learning",
                description: "Developing a deep multi-modal architecture for accurately predicting behavior of nano particles on different species using environmental data.",
                date: "June 2020 - June 2021",
                tags: ["Deep Learning", "Environmental Science", "Probabilistic Models"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="text-sky-600 dark:text-sky-400 text-sm mb-2">
                      {project.date}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/experience">
              <Button variant="outline" className="border-sky-200 hover:border-sky-300 dark:border-sky-800 dark:hover:border-sky-700">
                View All Research <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Latest Research Blogs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dive into my latest thoughts, findings, and insights on artificial intelligence research.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Advancements in Counterfactual Explanations for DNNs",
                description: "Exploring how counterfactual explanations can provide intuitive understanding of complex AI decisions.",
                date: "March 15, 2024",
                readTime: "8 min read"
              },
              {
                title: "The State of Large Language Model Pruning",
                description: "Analyzing current approaches to reduce the computational footprint of large language models without sacrificing performance.",
                date: "February 28, 2024",
                readTime: "12 min read"
              },
              {
                title: "Biases in LLMs: A Comprehensive Review",
                description: "Investigating various types of biases that emerge in large language models and methods to mitigate them.",
                date: "January 10, 2024",
                readTime: "10 min read"
              }
            ].map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.description}</p>
                    <Link href="/blogs" className="text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/blogs">
              <Button variant="outline" className="border-sky-200 hover:border-sky-300 dark:border-sky-800 dark:hover:border-sky-700">
                View All Blogs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="mb-8">
              I'm always open to collaborative research opportunities, academic discussion, or potential partnerships.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
                Get in Touch <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}