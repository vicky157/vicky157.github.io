/**
 * Structured CV data — a faithful transcription of CV_Vikash_PhD.pdf
 * (a "Jake's Resume" style LaTeX document). The digital CV page renders
 * from this so the on-screen version and the printed/exported PDF match
 * the original. Inline <strong>/<em> mirror the bold/italic in the source.
 */

export interface CvLink {
  label: string;
  url: string;
}

export interface CvPublication {
  n: number;
  title: string;
  venue: string;
  /** Authors as HTML; own name wrapped in <strong>. */
  authors: string;
  links: CvLink[];
}

export interface CvEntry {
  org: string;
  date: string;
  role: string;
  location: string;
  items?: string[];
}

export interface CvProject {
  title: string;
  stack: string;
  date: string;
  items: string[];
}

export const cvHeader = {
  name: 'Vikash Singh',
  location: 'Cleveland, OH 44106',
  line1: [
    { icon: 'fas fa-phone', text: '+1 (216) 463-5254', href: 'tel:+12164635254' },
    { icon: 'fas fa-envelope', text: 'vikash@case.edu', href: 'mailto:vikash@case.edu' },
    { icon: 'fas fa-globe', text: 'vikash-singh.me', href: 'https://vikash-singh.me' },
  ],
  line2: [
    { icon: 'fab fa-linkedin', text: 'linkedin.com/in/vikash-singh-john', href: 'https://www.linkedin.com/in/vikash-singh-john/' },
    { icon: 'fab fa-github', text: 'github.com/vicky157', href: 'https://github.com/vicky157' },
    { icon: 'fas fa-graduation-cap', text: 'Google Scholar', href: 'https://scholar.google.com/citations?user=zt0c4WsAAAAJ' },
  ],
};

const GH = 'https://github.com/vicky157';

export const cvPublications: CvPublication[] = [
  {
    n: 1,
    title: 'Toward Guarantees for Clinical Reasoning in Vision Language Models via Formal Verification',
    venue: 'Under Review MICCAI 2026',
    authors: '<strong>Vikash Singh</strong>, Debargha Ganguly, Haotian Yu, Chengwei Zhou, Prerna Singh, Brandon Lee, Vipin Chaudhary, Gourav Datta',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2602.24111' }],
  },
  {
    n: 2,
    title: 'CausalGuard: Conformal Inference under Graph Uncertainty',
    venue: 'Under Review NeurIPS 2026',
    authors: '<strong>Vikash Singh</strong>, Weicong Chen, Debargha Ganguly, Yanyan Zhang, Nengbo Wang, Sreehari Sankar, Mohsen Hariri, Alexander Nemecek, Chaoda Song, Shouren Wang, Biyao Zhang, Van Yang, Erman Ayday, Jing Ma, Vipin Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2605.21928' }],
  },
  {
    n: 3,
    title: 'Reliability-Gated Source Anchoring for Continual Test-Time Adaptation',
    venue: 'Preprint, 2026',
    authors: '<strong>Vikash Singh</strong>, Debargha Ganguly, Weicong Chen, Sabyasachi Sahoo, Sreehari Sankar, Biyao Zhang, Mohsen Hariri, Shouren Wang, Osama Zafar, Christian Gagn&eacute;, Vipin Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2605.14063' }],
  },
  {
    n: 4,
    title: 'VERGE: Formal Refinement and Guidance Engine for Verifiable LLM Reasoning',
    venue: 'ACL 2026',
    authors: '<strong>Vikash Singh</strong>, Darion Cassel, Nathaniel Weir, N. Feng, Sam Bayless',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2601.20055' }],
  },
  {
    n: 5,
    title: 'Trust The Typical',
    venue: 'ICLR 2026',
    authors: 'Debargha Ganguly, Sreehari Sankar, Biyao Zhang, <strong>Vikash Singh</strong>, Kanan Gupta, Harshini Kavuru, Alan Luo, Weicong Chen, Warren Richard Morningstar, Raghu Machiraju, Vipin Chaudhary',
    links: [{ label: 'OpenReview', url: 'https://arxiv.org/abs/2602.04581' }],
  },
  {
    n: 6,
    title: 'HugRAG: Hierarchical Causal Knowledge Graph Design for RAG',
    venue: 'ICML 2026',
    authors: 'Nengbo Wang, Tuo Liang, <strong>Vikash Singh</strong>, Chaoda Song, Van Yang, Yu Yin, Jing Ma, Jagdip Singh, Vipin Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2602.05143' }],
  },
  {
    n: 7,
    title: 'Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks',
    venue: 'NeurIPS 2025',
    authors: 'D. Ganguly, <strong>V. Singh</strong>, S. Sankar, B. Zhang, X. Zhang, S. Iyengar, X. Han, A. Sharma, S. Kalyanaraman, V. Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2505.20047' }, { label: 'Code', url: GH }],
  },
  {
    n: 8,
    title: 'Mid-Think: Training-Free Intermediate-Budget Reasoning via Token-Level Triggers',
    venue: 'ACL findings 2026',
    authors: 'Wang Yang, Debargha Ganguly, Xinpeng Li, Chaoda Song, Shouren Wang, <strong>Vikash Singh</strong>, Vipin Chaudhary, Xiaotian Han',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2601.07036' }],
  },
  {
    n: 9,
    title: 'Privacy Policy Enforcement Guardrails for Data-Sensitive Retrieval-Augmented Generation',
    venue: 'Preprint, 2026',
    authors: 'Osama Zafar, Alexander Nemecek, Yiqian Zhang, Wenbiao Li, Debargha Ganguly, <strong>Vikash Singh</strong>, Vipin Chaudhary, Erman Ayday',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2605.17034' }],
  },
  {
    n: 10,
    title: 'Path-Lock Expert: Separating Reasoning Mode in Hybrid Thinking via Architecture-Level Separation',
    venue: 'Preprint, 2026',
    authors: 'Shouren Wang, Wang Yang, Chuang Ma, Debargha Ganguly, <strong>Vikash Singh</strong>, Chaoda Song, Xinpeng Li, Xianxuan Long, Vipin Chaudhary, Xiaotian Han',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2604.27201' }],
  },
  {
    n: 11,
    title: 'Overcoming Dynamics-Blindness: Training-Free Pace-and-Path Correction for VLA Models',
    venue: 'Preprint, 2026',
    authors: 'Y. Zhang, C. Song, <strong>V. Singh</strong>, X. Li, K. Ye, Z. Hu, Z. Pu, Y. Yin, V. Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2605.11459' }],
  },
  {
    n: 12,
    title: 'A Survey on Agent Skills for LLMs: A Lifecycle Perspective from Construction to Ecosystems',
    venue: 'Preprint, 2026',
    authors: 'Wang Yang, Chaoda Song, Xinpeng Li, Shouren Wang, Nengbo Wang, Yanyan Zhang, Chuang Ma, Debargha Ganguly, <strong>Vikash Singh</strong>, Shuai Xu, Jing Ma, Yu Yin, Vipin Chaudhary, Xiaotian Han',
    links: [{ label: 'Preprint', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6746498' }],
  },
  {
    n: 13,
    title: 'Efficient Fine-Grained GPU Performance Modeling for Distributed Deep Learning of LLM',
    venue: 'The 32nd IEEE International Conference on High Performance Computing (HiPC), 2025',
    authors: 'Biyao Zhang, Mingkai Zheng, Debargha Ganguly, Xuecen Zhang, <strong>Vikash Singh</strong>, Vipin Chaudhary, Zhao Zhang',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2509.22832' }, { label: 'Code', url: GH }],
  },
  {
    n: 14,
    title: 'K<sup>4</sup>: Online Log Anomaly Detection Via Unsupervised Typicality Learning',
    venue: 'The 32nd IEEE International Conference on High Performance Computing (HiPC), 2025',
    authors: 'W. Chen, <strong>V. Singh</strong>, Z. Rahmani, D. Ganguly, M. Hariri, V. Chaudhary',
    links: [{ label: 'Preprint', url: 'https://arxiv.org/abs/2507.20051' }, { label: 'Code', url: GH }],
  },
];

export const cvExperience: CvEntry[] = [
  {
    org: 'Amazon Web Services',
    date: 'May 2026 &ndash; Present',
    role: 'Applied Scientist Intern (Returning)',
    location: 'New York City, NY',
    items: [
      'Details will be updated after the internship concludes.',
      'Manager: <strong>Ali Torakmani</strong>, <em>Sr. Applied Scientist</em>, AWS',
    ],
  },
  {
    org: 'Amazon Web Services',
    date: 'Aug 2025 &ndash; Nov 2025',
    role: 'Applied Scientist Intern',
    location: 'New York City, NY',
    items: [
      'Improved logical reasoning of LLMs using formal verification methods, including automated reasoning checks.',
      'Enhanced the performance of several large language models by over 40% through agentic reasoning frameworks.',
      'Manager: <strong>Darion Cassel</strong>, <em>Sr. Applied Scientist</em>, AWS',
    ],
  },
  {
    org: 'MGenio',
    date: 'Jun 2024 &ndash; Aug 2024',
    role: 'Machine Learning Internship',
    location: 'Cleveland, OH',
    items: [
      'Led self-driven research on machine learning models and their integration on IoT platforms.',
      'Developed an efficient platform to manage data flow and monitor machine learning model training.',
      'Designed a pipeline flow and automated data preprocessing system for machine learning models to feed directly into IoT Systems.',
      'Manager: <strong>Satish Ramade</strong>, <em>CEO</em>, MGenio',
    ],
  },
  {
    org: 'DRDO, Ministry of Defence',
    date: 'Jan 2022 &ndash; Sep 2022',
    role: 'Ml/DL Internship',
    location: 'Chandigarh, India',
    items: [
      'Developed a sophisticated approach to enhance precision in satellite imagery analysis by employing segmentation, labeling, and training methods using Variational Autoencoders (VAEs), resulting in 83% accuracy.',
      'Advisor: <strong>Dr. MK Kalra</strong>, <em>Scientist G</em>, Defence Geoinformatics Research Establishment (DGRE), DRDO',
    ],
  },
  {
    org: 'Hatchmarine Consultants',
    date: 'Dec 2021 &ndash; Feb 2022',
    role: 'Research Intern',
    location: 'Delhi, India',
    items: [
      'Developed machine learning models to predict river scour depth in Taiwan, informing strategic resource allocation.',
      'Fine-tuned predictive models using Python (Scikit-Learn) to achieve high accuracy and meet project requirements.',
      'Advisor: <strong>Dr. Karan Gupta</strong>, <em>Technical Director and Founder</em>',
    ],
  },
  {
    org: 'Case Western Reserve University',
    date: 'Jan 2024 &ndash; Present',
    role: 'Teaching Assistant (Computational Perception)',
    location: 'Cleveland, OH',
    items: [
      'Efficiently grade assignments, ensuring accuracy and providing constructive feedback.',
      'Deliver engaging lectures on specialized topics, fostering student understanding and conduct effective office hours.',
      'Professor: <strong>Dr. Michael Lewicki</strong>, <em>Professor</em>, Dept. of Computer Science &amp; Engineering, CWRU',
    ],
  },
  {
    org: 'Indian Institute of Technology Mandi',
    date: 'Feb 2021 &ndash; Aug 2022',
    role: 'Teaching Assistant (Data Science I, II, &amp; III)',
    location: 'HP, India',
    items: [
      'Conducted engaging lectures and facilitated Python hands-on lab sessions, enhancing students&rsquo; practical skills.',
      'Assessed student understanding through various evaluation methods, including assignment grading and in-person viva sessions.',
      'Professors: <strong>Dr. Deelip AD, Dr. Varun Dutt, Dr. Manoj Thakur</strong>, <em>Professors</em>, IIT Mandi',
    ],
  },
];

export const cvEducation: CvEntry[] = [
  {
    org: 'Case Western Reserve University',
    date: 'Aug 2024 &ndash; Present',
    role: 'Doctor of Philosophy in Computer Science',
    location: 'Cleveland, OH',
  },
  {
    org: 'Case Western Reserve University',
    date: 'Aug 2023 &ndash; May 2025',
    role: 'Masters of Science in Computer Science (Specialisation in ML/AI)',
    location: 'Cleveland, OH',
  },
  {
    org: 'Indian Institute of Technology Mandi',
    date: 'Jun 2019 &ndash; May 2023',
    role: 'Bachelors of Technology in Civil Engineering with minor in AI &amp; Computer Science',
    location: 'Mandi, India',
  },
];

export const cvResearch: CvEntry[] = [
  {
    org: 'Case Western Reserve University',
    date: 'Jan 2024 &ndash; Jul 2024',
    role: 'Advancements in XAI with Specialization in Counterfactual Explanation Methods',
    location: 'Cleveland, OH',
    items: [
      'Engaged in leading-edge research on Explainable AI, particularly specializing in Counterfactual Explanation methods.',
      'Advisor: <strong>Dr. Jing Ma</strong>, <em>Assistant Professor</em>, Department of Computer Science &amp; Engineering, CWRU',
    ],
  },
  {
    org: 'IIT Mandi',
    date: 'Jun 2020 &ndash; Jun 2021',
    role: 'Analysis of Nano Particles in Environment using Deep Learning',
    location: 'Mandi, India',
    items: [
      'Developed a deep multi-modal architecture for accurately predicting the behavior of nanoparticles on different species using environmental data.',
      'Advisor: <strong>Dr. Tanushree Parsai</strong>, <em>Assistant Professor</em>, IIT Madras',
    ],
  },
];

export const cvProjects: CvProject[] = [
  {
    title: 'Enhanced YOLOv4 using SMM on OneAPI in SYCL',
    stack: 'Python3, SYCL, CNN, PyTorch',
    date: 'Nov 2023',
    items: [
      'Developed and integrated Enhanced YOLOv4 with SYCL-Python for advanced object detection algorithms.',
      'Conducted performance optimization and applied ML techniques to improve real-time data processing.',
    ],
  },
  {
    title: 'Human Activity Detector',
    stack: 'Machine Learning, Python3',
    date: 'Nov 2023',
    items: [
      'Built models using Logistic Regression, Decision Tree, and Support Vector Classifier, achieving 96% accuracy with Logistic Regression using accelerometer and gyroscope sensor data.',
    ],
  },
  {
    title: 'Landslide Warning System',
    stack: 'Python3, Machine Learning, DNNs',
    date: 'Aug 2020',
    items: [
      'Designed a data-driven predictive system analyzing hillside landslide risk factors like weather, slope, and temperature.',
    ],
  },
];

export const cvSkills: { label: string; value: string }[] = [
  { label: 'Languages', value: 'Python3, C++, Java, JavaScript' },
  { label: 'Developer Tools', value: 'VS Code, Google Colab, Overleaf, High-Performance Cloud, OneAPI DevCloud' },
  { label: 'Technologies/Frameworks', value: 'TensorFlow, PyTorch, Scikit-Learn, OpenCV, Linux, GitHub' },
];

/** Column-major order, matching the multicols grid in the PDF. */
export const cvCoursework: string[] = [
  'Large Language Models',
  'Data Structures &amp; Algo.',
  'High-Perf. Systems for',
  'AI',
  'Analysis of Algorithms',
  'Deep Learning',
  'Machine Learning',
  'Data Science I, II, III',
  'Computer Vision',
  'Pattern Recognition',
  'Data Privacy',
  'Computer Security',
];

export const cvAchievements: string[] = [
  'Awarded the <strong>Silver Medal</strong> and <strong>Director&rsquo;s Medal</strong> for academic excellence at IIT Mandi.',
  'Conducted lab sessions for the <em>&rdquo;Training Program on Machine Learning for Ocean Acoustics&rdquo;</em> at DRDO-NPOL, Kochi.',
  'Won two <strong>gold medals</strong> in badminton at the Inter IIT Sports Meet (2019, 2022).',
  'Secured first place in the <strong>Inter IIT Tech Meet</strong> hackathon at IIT Delhi for plant disease detection algorithm.',
];
