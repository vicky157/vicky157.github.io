import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-sky-600 dark:text-sky-400">Vikash Singh</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              PhD Student at Case Western Reserve University specializing in AI, Machine Learning, and Explainable AI.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/vicky157" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/vikash-singh-937aa7195/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link 
                href="mailto:vikashjohn2505@gmail.com"
                className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-sky-600 dark:text-sky-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Research Blogs
                </Link>
              </li>
              <li>
                <Link href="/papers" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Papers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-sky-600 dark:text-sky-400">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-sky-500 shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  11428 Cedar Glen Pkwy, Cleveland, Ohio 44106
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Smartphone size={20} className="text-sky-500 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+1 216-463-5254</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-sky-500 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">vikashjohn2505@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Vikash Singh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}