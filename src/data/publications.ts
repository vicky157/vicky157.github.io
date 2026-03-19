import type { Publication } from '../types';

export const publications: Publication[] = [
  {
    id: 'singh2026clinical',
    title: 'Toward Guarantees for Clinical Reasoning in Vision Language Models via Formal Verification',
    authors: '<strong>Vikash Singh</strong>, Debargha Ganguly, Haotian Yu, Chengwei Zhou, Prerna Singh, Brandon Lee, Vipin Chaudhary, Gourav Datta',
    venue: '<em>Under Review at MICCAI 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2602.24111', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Vision-language models (VLMs) show promise in drafting radiology reports, yet they frequently suffer from logical inconsistencies, generating diagnostic impressions unsupported by their own perceptual findings or missing logically entailed conclusions. Standard lexical metrics heavily penalize clinical paraphrasing and fail to capture these deductive failures in reference-free settings. Toward guarantees for clinical reasoning, we introduce a neurosymbolic verification framework that deterministically audits the internal consistency of VLM-generated reports. Our pipeline autoformalizes free-text radiographic findings into structured propositional evidence, utilizing an SMT solver (Z3) and a clinical knowledge base to verify whether each diagnostic claim is mathematically entailed, hallucinated, or omitted. Evaluating seven VLMs across five chest X-ray benchmarks, our verifier exposes distinct reasoning failure modes, such as conservative observation and stochastic hallucination, that remain invisible to traditional metrics. On labeled datasets, enforcing solver-backed entailment acts as a rigorous post-hoc guarantee, systematically eliminating unsupported hallucinations to significantly increase diagnostic soundness and precision in generative clinical assistants.',
    bibtex: `@misc{singh2026clinical,
  title={Toward Guarantees for Clinical Reasoning in Vision Language Models via Formal Verification},
  author={Vikash Singh and Debargha Ganguly and Haotian Yu and Chengwei Zhou and Prerna Singh and Brandon Lee and Vipin Chaudhary and Gourav Datta},
  year={2026},
  eprint={2602.24111},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2602.24111}
}`,
    featured: false,
  },
  {
    id: 'wang2026hugrag',
    title: 'HugRAG: Hierarchical Causal Knowledge Graph Design for RAG',
    authors: 'Nengbo Wang, Tuo Liang, <strong>Vikash Singh</strong>, Chaoda Song, Van Yang, Yu Yin, Jing Ma, Jagdip Singh, Vipin Chaudhary',
    venue: '<em>Under Review at ICML 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2602.05143', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Retrieval augmented generation (RAG) has enhanced large language models by enabling access to external knowledge, with graph-based RAG emerging as a powerful paradigm for structured retrieval and reasoning. However, existing graph-based methods often over-rely on surface-level node matching and lack explicit causal modeling, leading to unfaithful or spurious answers. Prior attempts to incorporate causality are typically limited to local or single-document contexts and also suffer from information isolation that arises from modular graph structures, which hinders scalability and cross-module causal reasoning. To address these challenges, we propose HugRAG, a framework that rethinks knowledge organization for graph-based RAG through causal gating across hierarchical modules. HugRAG explicitly models causal relationships to suppress spurious correlations while enabling scalable reasoning over large-scale knowledge graphs. Extensive experiments demonstrate that HugRAG consistently outperforms competitive graph-based RAG baselines across multiple datasets and evaluation metrics. Our work establishes a principled foundation for structured, scalable, and causally grounded RAG systems.',
    bibtex: `@misc{wang2026hugrag,
  title={HugRAG: Hierarchical Causal Knowledge Graph Design for RAG},
  author={Nengbo Wang and Tuo Liang and Vikash Singh and Chaoda Song and Van Yang and Yu Yin and Jing Ma and Jagdip Singh and Vipin Chaudhary},
  year={2026},
  eprint={2602.05143},
  archivePrefix={arXiv},
  primaryClass={cs.AI},
  url={https://arxiv.org/abs/2602.05143}
}`,
    featured: false,
  },
  {
    id: 'ganguly2026t3',
    title: 'Trust The Typical',
    authors: 'Debargha Ganguly, Sreehari Sankar, Biyao Zhang, <strong>Vikash Singh</strong>, Kanan Gupta, Harshini Kavuru, A. Luo, Weicong Chen, Warren Morningstar, R. Machiraju, Vipin Chaudhary',
    venue: '<em>ICLR 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2602.04581', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Current approaches to LLM safety fundamentally rely on a brittle cat-and-mouse game of identifying and blocking known threats via guardrails. We argue for a fresh approach: robust safety comes not from enumerating what is harmful, but from deeply understanding what is safe. We introduce Trust The Typical (T3), a framework that operationalizes this principle by treating safety as an out-of-distribution (OOD) detection problem. T3 learns the distribution of acceptable prompts in a semantic space and flags any significant deviation as a potential threat. Unlike prior methods, it requires no training on harmful examples, yet achieves state-of-the-art performance across 18 benchmarks spanning toxicity, hate speech, jailbreaking, multilingual harms, and over-refusal, reducing false positive rates by up to 40x relative to specialized safety models. A single model trained only on safe English text transfers effectively to diverse domains and over 14 languages without retraining. Finally, we demonstrate production readiness by integrating a GPU-optimized version into vLLM, enabling continuous guardrailing during token generation with less than 6% overhead even under dense evaluation intervals on large-scale workloads.',
    bibtex: `@misc{ganguly2026t3,
  title={Trust The Typical},
  author={Debargha Ganguly and Sreehari Sankar and Biyao Zhang and Vikash Singh and Kanan Gupta and Harshini Kavuru and A. Luo and Weicong Chen and Warren Morningstar and R. Machiraju and Vipin Chaudhary},
  year={2026},
  eprint={2602.04581},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2602.04581}
}`,
    featured: true,
  },
  {
    id: 'singh2026verge',
    title: 'VERGE: Formal Refinement and Guidance Engine for Verifiable LLM Reasoning',
    authors: '<strong>Vikash Singh</strong>, Darion Cassel, Nathaniel Weir, Nick Feng, Sam Bayless',
    venue: '<em>Under Review at ACL 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2601.20055', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Despite the syntactic fluency of Large Language Models (LLMs), ensuring their logical correctness in high-stakes domains remains a fundamental challenge. We present a neurosymbolic framework that combines LLMs with SMT solvers to produce verification-guided answers through iterative refinement. Our approach decomposes LLM outputs into atomic claims, autoformalizes them into first-order logic, and verifies their logical consistency using automated theorem proving. We introduce three key innovations: (1) multi-model consensus via formal semantic equivalence checking to ensure logic-level alignment between candidates, eliminating the syntactic bias of surface-form metrics, (2) semantic routing that directs different claim types to appropriate verification strategies: symbolic solvers for logical claims and LLM ensembles for commonsense reasoning, and (3) precise logical error localization via Minimal Correction Subsets (MCS), which pinpoint the exact subset of claims to revise, transforming binary failure signals into actionable feedback. Our framework classifies claims by their logical status and aggregates multiple verification signals into a unified score with variance-based penalty. The system iteratively refines answers using structured feedback until acceptance criteria are met or convergence is achieved. This hybrid approach delivers formal guarantees where possible and consensus verification elsewhere, advancing trustworthy AI. With the GPT-OSS-120B model, VERGE demonstrates an average performance uplift of 18.7% at convergence across a set of reasoning benchmarks compared to single-pass approaches.',
    bibtex: `@misc{singh2026verge,
  title={VERGE: Formal Refinement and Guidance Engine for Verifiable LLM Reasoning},
  author={Vikash Singh and Darion Cassel and Nathaniel Weir and Nick Feng and Sam Bayless},
  year={2026},
  eprint={2601.20055},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2601.20055}
}`,
    featured: true,
  },
  {
    id: 'wang2026midthink',
    title: 'Mid-Think: Training-Free Intermediate-Budget Reasoning via Token-Level Triggers',
    authors: 'Wang Yang, Debargha Ganguly, Xinpeng Li, Chaoda Song, Shouren Wang, <strong>Vikash Singh</strong>, Vipin Chaudhary, Xiaotian Han',
    venue: '<em>Under Review at ACL 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2601.07036', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Hybrid reasoning language models are commonly controlled through high-level Think/No-think instructions to regulate reasoning behavior, yet we found that such mode switching is largely driven by a small set of trigger tokens rather than the instructions themselves. Through attention analysis and controlled prompting experiments, we show that a leading ``Okay\'\'token induces reasoning behavior, while the newline pattern following ``\'\'suppresses it. Based on this observation, we propose Mid-Think, a simple training-free prompting format that combines these triggers to achieve intermediate-budget reasoning, consistently outperforming fixed-token and prompt-based baselines in terms of the accuracy-length trade-off. Furthermore, applying Mid-Think to RL training after SFT reduces training time by approximately 15% while improving final performance of Qwen3-8B on AIME from 69.8% to 72.4% and on GPQA from 58.5% to 61.1%, demonstrating its effectiveness for both inference-time control and RL-based reasoning training.',
    bibtex: `@misc{wang2026midthink,
  title={Mid-Think: Training-Free Intermediate-Budget Reasoning via Token-Level Triggers},
  author={Wang Yang and Debargha Ganguly and Xinpeng Li and Chaoda Song and Shouren Wang and Vikash Singh and Vipin Chaudhary and Xiaotian Han},
  year={2026},
  eprint={2601.07036},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2601.07036}
}`,
    featured: true,
  },
  {
    id: 'zhang2025',
    title: 'Efficient Fine-Grained GPU Performance Modeling for Distributed Deep Learning of LLM',
    authors: 'Biyao Zhang, Mingkai Zheng, Debargha Ganguly, Xuecen Zhang, <strong>Vikash Singh</strong>, Vipin Chaudhary, Zhao Zhang',
    venue: '<em>HiPC 2025</em> &bull; September 2025',
    links: [
      { label: 'HTML', url: 'publications/gpu-performance-modeling.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2509.22832', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Training Large Language Models(LLMs) is one of the most compute-intensive tasks in high-performance computing. Predicting end-to-end training time for multi-billion parameter models distributed across hundreds of GPUs remains challenging due to complex interactions between transformer components, parallelism strategies(data, model, pipeline, tensor), and multi-tier communication. Learned models require costly sampling, while analytical models often struggle with real-world network and hardware complexities. We address this by decomposing LLMs into core computational primitives and modeling them with: (1) operator-level decomposition for fine-grained analysis; (2) lightweight sampling based hardware-aware prediction models for key operations; (3) an end-to-end prediction system integrating these components across complex parallelization strategies. Crucially, our methodology has been validated on two large-scale HPC systems. Our framework achieves low average prediction errors-4.98\\% on Perlmutter(A100) and 9.38\\% on Vista(GH200)-for models up to 20B parameters across 128 GPUs. Importantly, it runs entirely on CPUs, enabling rapid iteration over hardware configurations and training strategies without costly on-cluster experimentation.',
    bibtex: `@misc{zhang2025,
  title={Efficient Fine-Grained GPU Performance Modeling for Distributed Deep Learning of LLM},
  author={Biyao Zhang and Mingkai Zheng and Debargha Ganguly and Xuecen Zhang and Vikash Singh and Vipin Chaudhary and Zhao Zhang},
  year={2025},
  eprint={2509.22832},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2509.22832}
}`,
    featured: false,
  },
  {
    id: 'chen2025',
    title: 'K4: Online Log Anomaly Detection Via Unsupervised Typicality Learning',
    authors: 'Weicong Chen, <strong>Vikash Singh</strong>, Zahra Rahmani, Debargha Ganguly, Mohsen Hariri, Vipin Chaudhary',
    venue: '<em>HiPC 2025</em> &bull; July 2025',
    links: [
      { label: 'HTML', url: 'publications/k4-log-anomaly.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2507.20051', icon: 'fas fa-file-pdf' },
      { label: 'Code', url: 'https://github.com/vicky157', icon: 'fas fa-code' },
    ],
    abstract: 'Existing Log Anomaly Detection (LogAD) methods are often slow, dependent on error-prone parsing, and use unrealistic evaluation protocols. We introduce $K^4$, an unsupervised and parser-independent framework for high-performance online detection. $K^4$ transforms arbitrary log embeddings into compact four-dimensional descriptors (Precision, Recall, Density, Coverage) using efficient k-nearest neighbor (k-NN) statistics. These descriptors enable lightweight detectors to accurately score anomalies without retraining. Using a more realistic online evaluation protocol, $K^4$ sets a new state-of-the-art (AUROC: 0.995-0.999), outperforming baselines by large margins while being orders of magnitude faster, with training under 4 seconds and inference as low as 4 $\\mu$s.',
    bibtex: `@misc{chen2025,
  title={K4: Online Log Anomaly Detection Via Unsupervised Typicality Learning},
  author={Weicong Chen and Vikash Singh and Zahra Rahmani and Debargha Ganguly and Mohsen Hariri and Vipin Chaudhary},
  year={2025},
  eprint={2507.20051},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2507.20051}
}`,
    featured: false,
    equalContribution: '*Equal contribution',
  },
  {
    id: 'ganguly2025',
    title: 'Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks',
    authors: 'Debargha Ganguly, <strong>Vikash Singh</strong>, Sreehari Sankar, Biyao Zhang, Xuecen Zhang, Srinivasan Iyengar, Xiaotian Han, Amit Sharma, S. Kalyanaraman, Vipin Chaudhary',
    venue: '<em>NeurIPS 2025</em> &bull; May 2025',
    links: [
      { label: 'HTML', url: 'publications/grammars.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2505.20047', icon: 'fas fa-file-pdf' },
      { label: 'Code', url: 'https://github.com/vicky157', icon: 'fas fa-code' },
    ],
    abstract: 'Large language models (LLMs) show remarkable promise for democratizing automated reasoning by generating formal specifications. However, a fundamental tension exists: LLMs are probabilistic, while formal verification demands deterministic guarantees. This paper addresses this epistemological gap by comprehensively investigating failure modes and uncertainty quantification (UQ) in LLM-generated formal artifacts. Our systematic evaluation of five frontier LLMs reveals Satisfiability Modulo Theories (SMT) based autoformalization\'s domain-specific impact on accuracy (from +34.8% on logical tasks to -44.5% on factual ones), with known UQ techniques like the entropy of token probabilities failing to identify these errors. We introduce a probabilistic context-free grammar (PCFG) framework to model LLM outputs, yielding a refined uncertainty taxonomy. We find uncertainty signals are task-dependent (e.g., grammar entropy for logic, AUROC>0.93). Finally, a lightweight fusion of these signals enables selective verification, drastically reducing errors (14-100%) with minimal abstention, transforming LLM-driven formalization into a reliable engineering discipline.',
    bibtex: `@misc{ganguly2025,
  title={Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks},
  author={Debargha Ganguly and Vikash Singh and Sreehari Sankar and Biyao Zhang and Xuecen Zhang and Srinivasan Iyengar and Xiaotian Han and Amit Sharma and S. Kalyanaraman and Vipin Chaudhary},
  year={2025},
  eprint={2505.20047},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2505.20047}
}`,
    featured: true,
  },
];

export const researchInterests = [
  { title: 'Formal Reasoning and Verification', description: 'Developing rigorous formal logic methodologies, leveraging SMT\u2010LIB encodings and solver frameworks to verify, interpret, and enhance the correctness of LLM-generated reasoning.' },
  { title: 'Fine-Tuning LLMs and Vision Models', description: 'Leveraging techniques such as LoRA to optimize large language and vision models for specific tasks while maintaining computational efficiency.' },
  { title: 'Redundancy Mitigation in LLMs', description: 'Investigating approaches to reduce redundancy in large language models, enhancing performance and efficiency.' },
  { title: 'Model Optimization', description: 'Developing strategies for optimizing machine learning models, including pruning and hyperparameter tuning, to improve both accuracy and resource utilization.' },
  { title: 'Explainable AI', description: 'Advancing interpretability in AI models, focusing on enhancing transparency and providing actionable insights for users.' },
];

export const researchStatement = {
  sections: [
    {
      icon: 'fas fa-diagram-project',
      label: 'Bridging Probabilistic Generative AI with Rigorous Formal Verification',
      paragraphs: [
        'My research centers on a fundamental tension in modern Artificial Intelligence: the gap between the powerful but hallucination-prone creativity of Large Language Models (LLMs) and the strict, deterministic guarantees required for trustworthy systems. I am developing a new class of "Neuro-Symbolic" architectures that do not just generate code or proofs, but actively reason about their own uncertainty, verify their outputs against formal constraints, and optimize their "thinking" budgets for maximum efficiency.',
      ],
    },
    {
      icon: 'fas fa-chart-line',
      label: 'Current Contributions: Quantifying Uncertainty & Controlling Reasoning',
      paragraphs: [
        'My recent work, including research published at NeurIPS 2025, tackles the "epistemological gap" between probabilistic models and formal logic. I introduced a Probabilistic Context-Free Grammar (PCFG) framework to model the uncertainty of LLM-generated formal artifacts (like SMT-LIB programs). By treating LLM outputs not as final answers but as hypotheses with measurable uncertainty, I developed "selective verification" protocols that reduce logical errors by 14\u2013100%.',
        'Beyond verification, I focus on the efficiency of reasoning. In my work on "Mid-Think," I demonstrated that reasoning behaviors in hybrid models are driven by specific token-level triggers rather than high-level instructions. I leveraged this to create training-free prompting strategies that dynamically adjust the model\'s "compute budget" during inference, achieving superior accuracy-latency trade-offs. I also work on LLM safety using out-of-distribution (OOD) detection techniques.',
      ],
    },
    {
      icon: 'fas fa-atom',
      label: 'Future Directions: Diffusion & Energy-Based Reasoning',
      paragraphs: [
        'I am currently pivoting towards Reasoning Diffusion Language Models and Energy-Based Models (EBMs) to overcome the limitations of standard auto-regressive generation. My hypothesis is that "reasoning" should not be a linear, left-to-right process, but an iterative refinement\u2014similar to how diffusion models denoise an image.',
        '<strong>Diffusion for Logic:</strong> I am exploring how diffusion processes can allow models to "revise" their logic in continuous latent space, enabling self-correction before generating a final answer.',
        '<strong>Energy-Based Verification:</strong> I am investigating EBMs to model the "global consistency" of a reasoning chain. Instead of predicting the next token, these models assess the "energy" (or compatibility) of an entire proof or plan, guiding the generator toward formally correct states.',
      ],
    },
    {
      icon: 'fas fa-shield-halved',
      label: 'Impact & Vision',
      paragraphs: [
        'Drawing on my experience as an Applied Scientist Intern at AWS and my background in formal methods (Lean/Coq), my goal is to build AI systems that are safe enough for critical infrastructure. I aim to create models that don\'t just "guess" the answer, but construct a verifiable path to it\u2014combining the flexibility of deep learning with the rigor of mathematical proof.',
      ],
    },
  ],
};
