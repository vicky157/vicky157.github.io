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
    bibtex: `@misc{singh2026guaranteesclinicalreasoningvision,
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
    id: 'ganguly2026t3',
    title: 'Trust The Typical',
    authors: 'Debargha Ganguly, Sreehari Sankar, Biyao Zhang, <strong>Vikash Singh</strong>, Kanan Gupta, Harshini Kavuru, Alan Luo, Weicong Chen, Warren Morningstar, Raghu Machiraju, Vipin Chaudhary',
    venue: '<em>ICLR 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2602.04581', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'This paper proposes T3 (Trust The Typical), an alternative to traditional LLM safety methods that treats safety as an out-of-distribution detection problem. Rather than identifying harmful content through guardrails, T3 learns what constitutes acceptable prompts and flags deviations as potential threats. The framework achieves top performance across 18 benchmarks without training on harmful examples, reduces false positives by up to 40 times compared to specialized safety models, and transfers effectively across 14+ languages without retraining. The authors also demonstrate production deployment capabilities with a GPU-optimized integration into vLLM that adds minimal computational overhead.',
    bibtex: `@misc{ganguly2026trustthetypical,
  title={Trust The Typical},
  author={Debargha Ganguly and Sreehari Sankar and Biyao Zhang and Vikash Singh and Kanan Gupta and Harshini Kavuru and Alan Luo and Weicong Chen and Warren Morningstar and Raghu Machiraju and Vipin Chaudhary},
  year={2026},
  eprint={2602.04581},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2602.04581}
}`,
    featured: true,
  },
  {
    id: 'wang2026hugrag',
    title: 'HugRAG: Hierarchical Causal Knowledge Graph Design for RAG',
    authors: 'Nengbo Wang, Tuo Liang, <strong>Vikash Singh</strong>, Chaoda Song, Van Yang, Yu Yin, Jing Ma, Jagdip Singh, Vipin Chaudhary',
    venue: '<em>Under Review at ICML 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2602.05143', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Retrieval augmented generation (RAG) has enhanced large language models by enabling access to external knowledge, with graph-based RAG emerging as a powerful paradigm for structured retrieval and reasoning. However, existing graph-based methods often over-rely on surface-level node matching and lack explicit causal modeling, leading to unfaithful or spurious answers. HugRAG addresses these challenges by reorganizing knowledge graphs through hierarchical causal gating, suppressing spurious correlations while enabling reasoning across large-scale knowledge structures. Extensive experiments demonstrate that HugRAG consistently outperforms competitive graph-based RAG baselines across multiple datasets and evaluation metrics, establishing a principled foundation for structured, scalable, and causally grounded RAG systems.',
    bibtex: `@misc{wang2026hugraghierarchicalcausalknowledge,
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
    id: 'singh2026verge',
    title: 'VERGE: Formal Refinement and Guidance Engine for Verifiable LLM Reasoning',
    authors: '<strong>Vikash Singh</strong>, Darion Cassel, Nathaniel Weir, Nick Feng, Sam Bayless',
    venue: '<em>Under Review at ACL 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2601.20055', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'Despite the syntactic fluency of Large Language Models (LLMs), ensuring their logical correctness in high-stakes domains remains a fundamental challenge. We present a neurosymbolic framework that combines LLMs with SMT solvers to produce verification-guided answers through iterative refinement. Our approach decomposes LLM outputs into atomic claims, autoformalizes them into first-order logic, and verifies their logical consistency using automated theorem proving. We introduce three key innovations: (1) multi-model consensus via formal semantic equivalence checking to ensure logic-level alignment between candidates, eliminating the syntactic bias of surface-form metrics, (2) semantic routing that directs different claim types to appropriate verification strategies: symbolic solvers for logical claims and LLM ensembles for commonsense reasoning, and (3) precise logical error localization via Minimal Correction Subsets (MCS), which pinpoint the exact subset of claims to revise, transforming binary failure signals into actionable feedback. Our framework classifies claims by their logical status and aggregates multiple verification signals into a unified score with variance-based penalty. The system iteratively refines answers using structured feedback until acceptance criteria are met or convergence is achieved. This hybrid approach delivers formal guarantees where possible and consensus verification elsewhere, advancing trustworthy AI. With the GPT-OSS-120B model, VERGE demonstrates an average performance uplift of 18.7% at convergence across a set of reasoning benchmarks compared to single-pass approaches.',
    bibtex: `@misc{singh2026vergeformalrefinementguidance,
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
    authors: 'Yang Wang, Debargha Ganguly, Xinpeng Li, Chaoda Song, Shouren Wang, <strong>Vikash Singh</strong>, Vipin Chaudhary, Xiaotian Han',
    venue: '<em>Under Review at ACL 2026</em>',
    links: [
      { label: 'Preprint', url: 'https://arxiv.org/abs/2601.07036', icon: 'fas fa-file-pdf' },
    ],
    bibtex: `@misc{wang2026midthink,
  title={Mid-Think: Training-Free Intermediate-Budget Reasoning via Token-Level Triggers},
  author={Yang Wang and Debargha Ganguly and Xinpeng Li and Chaoda Song and Shouren Wang and Vikash Singh and Vipin Chaudhary and Xiaotian Han},
  year={2026},
  eprint={2601.07036},
  archivePrefix={arXiv},
  url={https://arxiv.org/abs/2601.07036}
}`,
    featured: true,
  },
  {
    id: 'ganguly2025',
    title: 'Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks',
    authors: 'Ganguly, D., <strong>Singh, V.</strong>, Sankar, S., Zhang, B., Zhang, X., Iyengar, S., Han, X., Sharma, A., Kalyanaraman, S., Chaudhary, V.',
    venue: '<em>NeurIPS 2025</em> &bull; May 2025',
    links: [
      { label: 'HTML', url: 'publications/grammars.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2505.20047', icon: 'fas fa-file-pdf' },
      { label: 'Code', url: 'https://github.com/vicky157', icon: 'fas fa-code' },
    ],
    abstract: 'This paper addresses the epistemological gap between probabilistic LLMs and deterministic formal verification by introducing a PCFG framework to model LLM outputs. A systematic evaluation of five frontier LLMs reveals domain-specific impacts of SMT-based autoformalization and demonstrates that task-dependent uncertainty signals enable selective verification with drastically reduced errors.',
    bibtex: `@misc{ganguly2025grammarsformaluncertaintytrust,
  title={Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks},
  author={Debargha Ganguly and Vikash Singh and Sreehari Sankar and Biyao Zhang and Xuecen Zhang and Srinivasan Iyengar and Xiaotian Han and Amit Sharma and Shivkumar Kalyanaraman and Vipin Chaudhary},
  year={2025},
  eprint={2505.20047},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2505.20047},
}`,
    featured: true,
  },
  {
    id: 'chen2025',
    title: 'K\u2074: Online Log Anomaly Detection Via Unsupervised Typicality Learning',
    authors: '<strong>Singh, V.</strong>*, Chen, W.*, Rahmani, Z., Ganguly, D., Hariri, M., Chaudhary, V.',
    venue: '<em>HiPC 2025</em> &bull; July 2025',
    equalContribution: '*Equal contribution',
    links: [
      { label: 'HTML', url: 'publications/k4-log-anomaly.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2507.20051', icon: 'fas fa-file-pdf' },
      { label: 'Code', url: 'https://github.com/vicky157', icon: 'fas fa-code' },
    ],
    abstract: 'K\u2074 introduces an unsupervised typicality learning paradigm for online log anomaly detection. By modeling normal operational patterns rather than enumerating anomalies, it detects novel, previously unseen failures with low computational overhead suitable for production streaming environments.',
    bibtex: `@misc{chen2025k4onlineloganomaly,
  title={$K^4$: Online Log Anomaly Detection Via Unsupervised Typicality Learning},
  author={Vikash Singh and Weicong Chen and Zahra Rahmani and Debargha Ganguly and Mohsen Hariri and Vipin Chaudhary},
  year={2025},
  eprint={2507.20051},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2507.20051}
}`,
    featured: false,
  },
  {
    id: 'zhang2025',
    title: 'Efficient Fine-Grained GPU Performance Modeling for Distributed Deep Learning of LLM',
    authors: 'Zhang, B., Zheng, M., Ganguly, D., Zhang, X., <strong>Singh, V.</strong>, Chaudhary, V., Zhang, Z.',
    venue: '<em>HiPC 2025</em> &bull; September 2025',
    links: [
      { label: 'HTML', url: 'publications/gpu-performance-modeling.html', icon: 'fas fa-book-open', isInternal: true },
      { label: 'arXiv', url: 'https://www.arxiv.org/abs/2509.22832', icon: 'fas fa-file-pdf' },
    ],
    abstract: 'This work decomposes distributed LLM training into granular operations to build an accurate, efficient GPU performance model. The framework achieves prediction error under 10% while informing optimal parallelization and hardware configuration strategies for large-scale training.',
    bibtex: `@article{zhang2025efficient,
  title={Efficient Fine-Grained GPU Performance Modeling for Distributed Deep Learning of LLM},
  author={Zhang, Biyao and Zheng, Mingkai and Ganguly, Debargha and Zhang, Xuecen and Singh, Vikash and Chaudhary, Vipin and Zhang, Zhao},
  journal={arXiv preprint arXiv:2509.22832},
  year={2025}
}`,
    featured: false,
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
