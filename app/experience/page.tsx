"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Building, User } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExperiencePage() {
  const research = [
    {
      title: "Advancements in XAI with Specialization in Counterfactual Explanation Methods",
      organization: "Case Western Reserve University",
      location: "OH, USA",
      period: "Jan 2024 - July 2024",
      tools: "Python3, DNNs, GNN",
      description: "Engaged in leading-edge research on Explainable AI, particularly specializing in Counterfactual Explanation methods. Actively contributing to the advancement of innovative approaches that enhance the interpretability and transparency of artificial intelligence systems.",
      advisor: "Dr. Jing Ma, Assistant Professor, Department of Computer Science & Engineering, CWRU"
    },
    {
      title: "Analyzation of Nano Particles in Environment using Deep Learning",
      organization: "IIT Mandi",
      location: "Mandi, India",
      period: "June 2020 - June 2021",
      tools: "Machine Learning, Python3, Probabilistic Models",
      description: "Developing a deep multi-modal architecture for accurately predicting behaviour of nano particles on different species using environmental data.",
      advisor: "Dr. Tanushree Parsai, Assistant Professor, Department of Environmental Science & Engineering, IIT Mandi"
    },
    {
      title: "Deep Neural Network model for Early landslide warning system",
      organization: "IIT Mandi",
      location: "Mandi, India",
      period: "July 2020 - Dec 2020",
      tools: "Machine Learning, Python3, RNN",
      description: "Led a groundbreaking machine learning initiative centered on the analysis of hillside landslides. Orchestrated extensive surveys in hilly terrains and adeptly harnessed a diverse array of datasets, encompassing variables such as weather conditions, elevation, slope, and temperature. Leveraged advanced predictive analytics techniques to derive actionable insights into landslide patterns and occurrences. This innovative project showcased a strategic integration of data science methodologies to address and understand the complexities of hillside landscape dynamics.",
      advisor: "Dr. Varun Dutt, Associate Professor, Department of Computer Science & Engineering, IIT Mandi"
    },
    {
      title: "VAEs for Satellite imagery dataset",
      organization: "DRDO, Ministry of Defence",
      location: "Chandigarh, India",
      period: "Jan 2022 - Sep 2022",
      tools: "Machine Learning, Python3, C++, VAEs, Matlab",
      description: "Developed a sophisticated approach to enhance precision in satellite imagery analysis by employing segmentation, labeling, and training methods using Variation Autoencoders (VAEs). The models were further fine-tuned, resulting in an impressive 83% accuracy.",
      advisor: "Dr. MK Kalra, Scientist G, Defence Geoinformatics Research Establishment (DGRE), DRDO"
    }
  ];

  const professional = [
    {
      title: "Summer Internship",
      organization: "MGenio",
      location: "OH, USA",
      period: "June 2024 - August 2024",
      tools: "Machine Learning, Web and Mobile dev, IoT",
      description: "Self Driven research on Machine learning models and their Integration on IoT platforms. Developed an efficient platform to manage data flow and monitoring Machine learning models training. Desgined a pipeline flow and Automated data preprocessing system for machine learning models to feed directly in IoT Systems.",
      manager: "Satish Ramade, CEO, MGenio"
    },
    {
      title: "Teaching assistant (Computational Perception)",
      organization: "Case Western Reserve University",
      location: "OH, USA",
      period: "Jan 2024 - present",
      tools: "Python3, Graphical Methods, Probability",
      description: "Efficiently grade assignments, ensuring accuracy and providing constructive feedback. Deliver engaging lectures on specialized topics, fostering student understanding. Conduct effective office hours to address queries and offer additional guidance.",
      professor: "Dr. Michael Lewicki, Assistant Professor, Department of Computer Science & Engineering, CWRU"
    },
    {
      title: "Teaching assistant (Data Science I & II & III)",
      organization: "Indian Institute of Technology Mandi",
      location: "HP, India",
      period: "Feb 2021 - Aug 2022",
      tools: "Python3, Machine learning, Probability, Deep Learning",
      description: "Conducted engaging lectures and facilitated Python hands-on lab sessions, enhancing students' practical skills. Assessed student understanding through various evaluation methods, including assignment grading and in-person viva sessions. Provided constructive feedback on assignments and assisted students during office hours, fostering a supportive learning environment.",
      professors: "Dr. Deelip AD, Dr. Varun Dutt, Dr. Manoj Thakur, Professors, Department of Computer and Electrical science, IIT Mandi"
    },
    {
      title: "Research Internship",
      organization: "Hatch Marine Consultants (Startup)",
      location: "New Delhi, India",
      period: "May 2021 - August 2021",
      tools: "Python3, Machine learning, Probability, Deep Learning",
      description: "Predictive Modeling and Analysis: Utilized advanced machine learning models to predict the scour depth of a river in Taiwan, leveraging data-driven insights to inform strategic decision-making and optimize resource allocation. Model Optimization and Fine-Tuning: Demonstrated a commitment to continuous improvement and optimization by fine-tuning the machine learning models to meet specific project requirements, ensuring the highest level of accuracy and precision in predictive modeling and analysis. Demonstrated unwavering commitment by expertly developing and fine-tuning machine learning models and achieved accuracy of 90%.",
      advisor: "Dr. Karan Gupta, Sr Engineer, Hatch Marine Consul, IIT Mandi"
    }
  ];

  const projects = [
    {
      title: "Exploring Explanatory Methods in AI",
      period: "Jan 2024",
      tools: "Python3, CNN, GNN",
      githubLink: "https://github.com/vicky157/",
      description: "Conducted a comparative analysis of contrastive and counterfactual explanation generation approaches to enhance AI explainability. Explored advanced methods to improve understanding and interpretability of AI models."
    },
    {
      title: "Enhanced YOLOv4 using SMM on OneAPI in SYCL",
      period: "Nov 2023",
      tools: "Python3, SYCL, CNN, PyTorch",
      githubLink: "https://github.com/vicky157/Enhanced-YOLOV4-sycl-python-integration-",
      description: "Developed and integrated Enhanced YOLOv4 with SYCL-Python for advanced object detection algorithms. Conducted performance optimization and applied ML techniques to improve real-time data processing and visual interpretation accuracy."
    },
    {
      title: "Human Activity Detector",
      period: "Nov 2023",
      tools: "Machine Learning, Python3",
      githubLink: "https://github.com/vicky157/Human-Activity-Recognition",
      description: "Built models using Logistic Regression, Decision Tree, and Support Vector Classifier with accuracies of 96%, 86%, and 80%, respectively. Achieved 96% prediction accuracy using accelerometer and gyroscope sensor data with Logistic Regression."
    },
    {
      title: "Landslide Warning System",
      period: "Aug 2020",
      tools: "Python3, Machine Learning, DNNs",
      githubLink: "https://iiots.in/work.html",
      description: "Designed a data-driven predictive system under the guidance of Dr. Varun Dutt, analyzing hillside landslide risk factors like weather, slope, and temperature."
    },
    {
      title: "Speech Emotion Analyzer",
      period: "Aug 2020",
      tools: "Machine Learning, Deep Learning, Python3, JavaScript",
      githubLink: "https://github.com/vicky157/Speech-Emotion-Analyzer",
      description: "Developed a CNN model with 100% accuracy in distinguishing between male and female voices. Trained the model to detect emotions with over 70% accuracy, with potential improvements through additional training data."
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
          <h1 className="text-4xl font-bold mb-4">Experience & Research</h1>
          <p className="text-gray-600 dark:text-gray-400">
            My professional journey and research contributions in the field of Artificial Intelligence and Machine Learning.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="research" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="research" className="mt-6">
              {research.map((item, index) => (
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
                          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400">{item.title}</h2>
                          <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{item.organization}</span>
                          </div>
                          <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <Badge variant="outline" className="mb-4">
                        {item.tools}
                      </Badge>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-1 text-sky-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Advisor:</span> {item.advisor}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="professional" className="mt-6">
              {professional.map((item, index) => (
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
                          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400">{item.title}</h2>
                          <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{item.organization}</span>
                          </div>
                          <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <Badge variant="outline" className="mb-4">
                        {item.tools}
                      </Badge>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-1 text-sky-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">
                            {item.manager ? "Manager:" : item.professor ? "Professor:" : "Professors:"}
                          </span> {item.manager || item.professor || item.professors}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover-lift">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400">{project.title}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{project.period}</span>
                        </div>
                        
                        <Badge variant="outline" className="mb-4">
                          {project.tools}
                        </Badge>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {project.description}
                        </p>
                        
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sky-600 dark:text-sky-400 hover:underline text-sm flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          View on GitHub
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-16 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Ongoing Work</h2>
          <ul className="space-y-3 ml-6 list-disc">
            <li className="text-gray-700 dark:text-gray-300">
              Conducting research on <span className="font-semibold">large language model pruning</span> to reduce memory and computational usage, focusing on innovative and efficient methodologies.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Exploring <span className="font-semibold">counterfactual generation</span> in dynamic Graph Neural Networks (GNNs) by incorporating techniques from static graphs into dynamic graph contexts.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Analyzing <span className="font-semibold">biases in large language models</span>, with a specific focus on <span className="font-semibold">anchor bias</span>, in collaboration with the Cognitive Science Department.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Investigating <span className="font-semibold">mathematical approaches to pruning</span> large language models under the guidance of <span className="font-semibold">Dr. Shuai</span>.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Implementing <span className="font-semibold">hyperparameter tuning using Bayesian group testing</span> to optimize computational and memory efficiency.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}