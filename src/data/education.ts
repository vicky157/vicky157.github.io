import type { EducationEntry, ExperienceEntry, ResearchEntry, ProjectEntry } from '../types';

export const educationEntries: EducationEntry[] = [
  {
    degree: 'Doctor of Philosophy in Computer Science',
    institution: 'Case Western Reserve University, Cleveland, Ohio',
    dates: 'Aug 2024 \u2013 Present',
    courses: [
      {
        name: 'Large Language Models',
        description: 'Explored advanced techniques in machine learning, with a focus on practical applications of multitask learning models. Presented a paper titled "Measuring Multitask Language Understanding", which involved analyzing and discussing state-of-the-art models and evaluation metrics in natural language processing (NLP). Gained hands-on experience with advanced machine learning frameworks and methods to handle large-scale datasets. Outcomes: LLMs, Llama, GPT, BERT, Evaluation, Olmo, Reasoning in LLMs, High performance computing, Data Parallelization, Algorithm Parallelization etc.',
      },
    ],
  },
  {
    degree: 'Masters of Science in Computer Science (Specialisation in ML/AI)',
    institution: 'Case Western Reserve University, Cleveland, Ohio',
    dates: 'Aug 2023 \u2013 May 2025',
    courses: [
      {
        name: 'Designing High performant systems for AI',
        description: 'Project: Incorporated SMM on OneAPI in SYCL | Python3 to enhance YOLOV4. Led development of YOLOV4 sycl-python integration, emphasizing advanced object detection and SYCL-Python optimization. Outcomes: GEMM, SMM, BMM, HPC, Data/Algorithm Parallelization.',
      },
      {
        name: 'Analysis of Algorithms',
        description: 'Acquired comprehensive knowledge in Data Structures and Algorithms, encompassing Greedy Algorithms, Graph Theory, Dynamic Programming, and NP-Completeness.',
      },
    ],
  },
  {
    degree: 'Bachelors of Technology in Civil engineering with minor in AI and Computer science',
    institution: 'Indian Institute of Technology Mandi, Mandi, Himachal Pradesh',
    dates: 'June 2019 \u2013 May 2023',
    courses: [
      {
        name: 'Deep Learning and its Applications',
        description: 'Contributed to a project focused on real-time sign language detection. Outcomes: LLM, CNN, AutoEncoders, GANs, VAEs, RNN, Perceptron etc.',
      },
      {
        name: 'Pattern Recognition',
        description: 'Proficiency in Probability, Random Processes, Linear Algebra, Bayes Decision Theory, Parameter Estimation, Unsupervised Learning, Sequential Pattern Recognition, etc.',
      },
    ],
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    title: 'Internship',
    institution: 'Amazon (LLMs, Automated Reasoning Checks), New York, USA',
    dates: 'Aug 2025 \u2013 Present',
    items: [
      'Working on the Socrates team focused on automated reasoning checks.',
      'Improving reasoning capabilities of Large Language Models (LLMs) specifically for legal tasks.',
    ],
  },
  {
    title: 'Summer Internship',
    institution: 'MGenio (Machine Learning, Web and Mobile dev, IoT), OH, USA',
    dates: 'June 2024 \u2013 August 2024',
    items: [
      'Self Driven research on Machine learning models and their Integration on IoT platforms.',
      'Developed an efficient platform to manage data flow and monitoring Machine learning models training.',
      'Designed a pipeline flow and Automated data preprocessing system for machine learning models to feed directly in IoT Systems.',
      'Manager: <strong>Satish Ramade</strong>, <em>CEO</em>, MGenio',
    ],
  },
  {
    title: 'Teaching assistant (Computational Perception)',
    institution: 'Case Western Reserve University (Python3, Graphical Methods, Probability), OH, USA',
    dates: 'Jan 2024 \u2013 present',
    items: [
      'Efficiently grade assignments, ensuring accuracy and providing constructive feedback.',
      'Deliver engaging lectures on specialized topics, fostering student understanding.',
      'Conduct effective office hours to address queries and offer additional guidance.',
      'Professor: <strong>Dr. Michael Lewicki</strong>, <em>Assistant Professor, Department of Computer Science & Engineering</em>, CWRU',
    ],
  },
  {
    title: 'Teaching assistant (Data Science I & II & III)',
    institution: 'Indian Institute of Technology Mandi (Python3, Machine learning, Probability, Deep Learning), HP, India',
    dates: 'Feb 2021 \u2013 Aug 2022',
    items: [
      'Conducted engaging lectures and facilitated Python hands-on lab sessions.',
      'Assessed student understanding through various evaluation methods.',
      'Provided constructive feedback and assisted students during office hours.',
      'Professors: <strong>Dr. Deelip AD, Dr. Varun Dutt, Dr. Manoj Thakur</strong>, IIT Mandi',
    ],
  },
  {
    title: 'Research Internship',
    institution: 'Hatch Marine Consultants (Startup) (Python3, Machine learning, Probability, Deep Learning), New Delhi, India',
    dates: 'May 2021 \u2013 August 2021',
    items: [
      'Predictive Modeling and Analysis: Utilized advanced machine learning models to predict the scour depth of a river in Taiwan.',
      'Model Optimization and Fine-Tuning: Fine-tuned models to meet project requirements, achieving 90% accuracy.',
      'Advisor: <strong>Dr. Karan Gupta</strong>, <em>Sr Engineer, Hatch Marine Consul</em>, IIT Mandi',
    ],
  },
];

export const researchEntries: ResearchEntry[] = [
  {
    title: 'Advancements in XAI with Specialization in Counterfactual Explanation Methods',
    institution: 'Case Western Reserve University (Python3, DNNs, GNNs), OH, USA',
    dates: 'Jan 2024 \u2013 July 2024',
    items: [
      'Engaged in leading-edge research on Explainable AI, particularly specializing in Counterfactual Explanation methods.',
      'Advisor: <strong>Dr. Jing Ma</strong>, CWRU',
    ],
  },
  {
    title: 'Analyzation of Nano Particles in Environment using Deep Learning',
    institution: 'IIT Mandi (Machine Learning, Python3, Probabilistic Models), Mandi, India',
    dates: 'June 2020 \u2013 June 2021',
    items: [
      'Developing a deep multi-modal architecture for accurately predicting behaviour of nano particles on different species using environmental data.',
      'Advisor: <strong>Dr. Tanushree Parsai</strong>, IIT Mandi',
    ],
  },
  {
    title: 'Deep Neural Network model for Early landslide warning system',
    institution: 'IIT Mandi (Machine Learning, Python3, RNN), Mandi, India',
    dates: 'July 2020 \u2013 Dec 2020',
    items: [
      'Led a machine learning initiative analyzing hillside landslides, using datasets like weather, elevation, slope, and temperature.',
      'Advisor: <strong>Dr. Varun Dutt</strong>, IIT Mandi',
    ],
  },
  {
    title: 'VAEs for Satellite imagery dataset',
    institution: 'DRDO, Ministry of Defence (Machine Learning, Python3, C++, VAEs, Matlab), Chandigarh, India',
    dates: 'Jan 2022 \u2013 Sep 2022',
    items: [
      'Developed an approach for satellite imagery analysis using segmentation, labeling, and training with VAEs, achieving 83% accuracy.',
      'Advisor: <strong>Dr. MK Kalra</strong>, DRDO',
    ],
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    title: 'Exploring Explanatory Methods in AI',
    techStack: 'Python3, CNN, GNN',
    date: 'Jan 2024',
    items: ['Conducted a comparative analysis of contrastive and counterfactual explanation generation approaches.'],
    link: { url: 'https://github.com/vicky157/', label: 'View Project', icon: 'fab fa-github' },
  },
  {
    title: 'Enhanced YOLOv4 using SMM on OneAPI in SYCL',
    techStack: 'Python3, SYCL, CNN, PyTorch',
    date: 'Nov 2023',
    items: ['Developed and integrated Enhanced YOLOv4 with SYCL-Python for advanced object detection.'],
    link: { url: 'https://github.com/vicky157/Enhanced-YOLOV4-sycl-python-integration-', label: 'View Project', icon: 'fab fa-github' },
  },
  {
    title: 'Human Activity Detector',
    techStack: 'Machine Learning, Python3',
    date: 'Nov 2023',
    items: ['Built models using Logistic Regression (96% acc), Decision Tree (86% acc), SVM (80% acc).'],
    link: { url: 'https://github.com/vicky157/Human-Activity-Recognition', label: 'View Project', icon: 'fab fa-github' },
  },
  {
    title: 'Landslide Warning System',
    techStack: 'Python3, Machine Learning, DNNs',
    date: 'Aug 2020',
    items: ['Designed a data-driven predictive system for landslide risk factors.'],
    link: { url: 'https://iiots.in/work.html', label: 'View Project', icon: 'fas fa-link' },
  },
  {
    title: 'Speech Emotion Analyzer',
    techStack: 'Machine Learning, Deep Learning, Python3, JavaScript',
    date: 'Aug 2020',
    items: ['Developed a CNN model for voice gender (100% acc) and emotion detection (70%+ acc).'],
    link: { url: 'https://github.com/vicky157/Speech-Emotion-Analyzer', label: 'View Project', icon: 'fab fa-github' },
  },
];
