---
title: "Grammars of Formal Uncertainty — Quantifying Trust in LLM-Generated Proofs"
date: "2025-07-08"
keywords: "LLM, SMT-LIB, PCFG, uncertainty quantification, automated reasoning, Formal Reasoning"
summary: "A richly annotated walkthrough of *Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks* — complete with equations, SMT-LIB snippets, metric tables, and actionable lessons for anyone auto-formalising natural-language problems."
math: true  
---

## 1   Why this paper matters

Large language models can now generate SMT-LIB proofs, type constraints, and even Lean tactics — yet a single missing parenthesis can transform a *valid* proof into silent nonsense. *Grammars of Formal Uncertainty* demonstrates that the very **syntax** of these generated programs can be mined for uncertainty signals that predict failure with near-perfect precision.

The results reveal a striking domain dependency:
* On the logical benchmark **ProofWriter**, routing questions through SMT improves answer accuracy by **+34.8 percentage points**.
* On the knowledge-heavy **FOLIO** dataset, the same approach *hurts* performance by **-44.5 percentage points** — highlighting the critical need for per-instance trust scores.

The authors propose deriving these trust scores from a *probabilistic context-free grammar* (PCFG) fitted to multiple LLM-generated samples.

---
## 2   Pipeline overview

The methodology follows a systematic five-step process:

1. **Sampling**: Generate *N* candidate programs $\{P_i\}_{i=1}^N$ from the LLM.
2. **Parsing**: Apply the official SMT-LIB v2 grammar $G_{\text{SMT}}$ to convert each $P_i$ into a parse tree.
3. **PCFG fitting**: Estimate rule probabilities and construct the mean-branch matrix $B$.
4. **Metric extraction**: Compute 25 uncertainty signals including entropy, Rényi divergences, spectral radius $\rho(B)$, kurtosis, and self-consistency measures.
5. **Selective verification**: Train a lightweight logistic regressor to abstain on high-risk cases, reducing total errors by up to **100%** with less than 10% answer loss.

---
## 3   Worked example

Consider the English statement: "Everyone who studies **math** *or* **physics** and works hard will succeed."

The corresponding SMT-LIB formalization is:

```smt2
(set-logic UF)
(declare-sort Person)
(declare-fun StudiesMath    (Person) Bool)
(declare-fun StudiesPhysics (Person) Bool)
(declare-fun WorksHard      (Person) Bool)
(declare-fun Succeeds       (Person) Bool)
(assert (forall ((x Person))
        (=> (and (or (StudiesMath x)
                     (StudiesPhysics x))
                 (WorksHard x))
            (Succeeds x))))
(check-sat)
```

> **PCFG analysis** for 100 samples:
>
> * Grammar entropy $H(G) = 1.42$ bits  
> * Spectral radius $\rho(B) = 0.83$  
> 
> Both values fall within the authors' "safe zone" ($H < 2$, $\rho < 1$), indicating the program should be passed to the solver with high confidence.

---
## 4   Key uncertainty metrics

| Symbol | Formula | Interpretation |
|--------|---------|----------------|
| $H(G)$ | Shannon entropy over non-terminal rule probabilities | Global syntactic unpredictability |
| $\rho(B)$ | Spectral radius of PCFG mean matrix | Depth and recursion complexity |
| NSUI | $\displaystyle \frac{H(G)}{H_{\max}} \times \frac{\rho(B)}{1+\rho(B)}$ | Combined entropy-recursion measure |
| Self-Consistency-SMT | Agreement rate between sampled solver outputs | Behavioral reliability |

Complete derivations, including Rényi-$\alpha$ entropies, KL divergences, skewness, and kurtosis measures, are provided in Section 2.1 of the paper.

---
## 5   Experimental results

### 5.1  Accuracy comparison: natural language vs. SMT formalization

| Model | StrategyQA | ProntoQA | ProofWriter | FOLIO |
|-------|------------|----------|-------------|-------|
| **o3-mini** | 0.783 → **0.798** | 1.000 → **0.998** | 0.889 → **0.942** | **0.945** → 0.500 |
| DeepSeek v3 | **0.829** → 0.672 | **1.000** → 0.450 | **0.806** → 0.580 | **0.933** → 0.596 |

*Bold values indicate better performance. The results show significant domain-dependent effects of SMT formalization.*

### 5.2  Uncertainty detection performance on ProofWriter (o3-mini)

* Grammar entropy achieves AUROC = 0.93 for error detection.  
  Abstaining on the riskiest 10% of cases yields **100% error-free** predictions on the remaining instances.
* A three-metric ensemble (combining multiple uncertainty signals) improves AUROC to 0.995.

---
## 6   Key insights and implications

* **Syntactic atypicality indicates semantic risk**: Low-probability grammar rules strongly correlate with incorrect proofs, providing a reliable signal for uncertainty quantification.

* **Task-dependent uncertainty signals**: Different metrics excel on different domains — entropy dominates on ProofWriter, kurtosis proves strongest on StrategyQA, while spectral radius $\rho(B)$ effectively identifies problematic arithmetic programs on ProntoQA.

* **Calibration challenges**: High AUROC performance does not guarantee well-calibrated probability estimates (e.g., entropy ECE ≈ 0.44). Post-processing techniques are essential for reliable uncertainty quantification.

* **Dual reasoning pathways**: The divergent error patterns between text-based and SMT-based reasoning suggest LLMs may employ two loosely coupled reasoning mechanisms. Aligning these pathways represents a promising research direction.

---
## 7   Practical implementation guide

For practitioners looking to implement this approach:

1. **Sample generation**: Generate 20–30 SMT-LIB variants per input using temperature $T \approx 0.7$.
2. **Grammar fitting**: Construct a Laplace-smoothed PCFG from the collected samples.
3. **Feature extraction**: Compute key metrics including $H(G)$, $\rho(B)$, and self-consistency scores.
4. **Threshold learning**: Train a lightweight logistic regressor on approximately 1,000 labeled examples; abstain when $P(\text{error}) > 0.5$.

This lightweight approach enables reliable uncertainty quantification without significant computational overhead.

---
## 8   Citation

```bibtex
@misc{ganguly2025grammarsformaluncertaintytrust,
  title        = {Grammars of Formal Uncertainty: When to Trust LLMs in Automated Reasoning Tasks},
  author       = {Debargha Ganguly and Vikash Singh and Sreehari Sankar and Biyao Zhang and Xuecen Zhang and Srinivasan Iyengar and Xiaotian Han and Amit Sharma and Shivkumar Kalyanaraman and Vipin Chaudhary},
  year         = {2025},
  eprint       = {2505.20047},
  archivePrefix= {arXiv},
  primaryClass = {cs.CL},
  url          = {https://arxiv.org/abs/2505.20047}
}
```

*Happy formalizing!*
