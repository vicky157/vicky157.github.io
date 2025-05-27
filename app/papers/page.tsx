"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Sample paper data
const papers = [
  {
    title: "Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks",
    authors: ["Debargha Ganguly", "Vikash Singh*", "Sreehari Sankar", "Biyao Zhang", "Xuecen Zhang", "Srinivasan Iyengar", "Xiaotian Han", "Amit Sharma", "Shivkumar Kalyanaraman", "Vipin Chaudhary"],
    conference: "arXiv preprint arXiv:2505.20047",
    year: 2025,
    citationCount: 0,
    abstract: "This paper explores the reliability of Large Language Models (LLMs) in automated reasoning tasks, introducing a formal framework for understanding and quantifying uncertainty in their responses.",
    pdfUrl: "https://arxiv.org/pdf/2505.20047.pdf",
    tags: ["LLMs", "Automated Reasoning", "Uncertainty Quantification", "AI Safety", "Formal Methods"],
    codeUrl: "#",

  },
  

];

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(papers.flatMap(paper => paper.tags))
  ).sort();

  // Filter papers based on search query and selected tag
  const filteredPapers = papers.filter(paper => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag ? paper.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  // Sort papers by year (descending)
  const sortedPapers = [...filteredPapers].sort((a, b) => b.year - a.year);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Research Papers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Publications exploring advancements in AI, machine learning, and their applications.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Search and Filter Controls */}
          <div className="mb-8">
            <div className="relative w-full mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search papers by title, author, or keyword..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All Topics
              </Badge>
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Papers List */}
          {filteredPapers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No papers found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedPapers.map((paper, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400">{paper.title}</h3>
                        <Badge className="whitespace-nowrap">{paper.year}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                      
                      <div className="mb-3 text-gray-600 dark:text-gray-400 italic">
                        {paper.conference}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {paper.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Citations: {paper.citationCount}
                        </div>
                        
                        <div className="flex-grow"></div>
                        
                        {paper.pdfUrl && paper.pdfUrl !== "#" && (
                          <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              PDF
                            </Button>
                          </a>
                        )}
                        
                        {paper.codeUrl && (
                          <a href={paper.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              Code
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}