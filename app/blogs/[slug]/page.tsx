"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { motion } from "framer-motion";

// Sample blog data (in a real app this would come from the server)
const blogPosts = [
  {
    slug: "counterfactual-explanations-dnns",
    title: "Advancements in Counterfactual Explanations for DNNs",
    date: "March 15, 2024",
    excerpt: "Exploring how counterfactual explanations can provide intuitive understanding of complex AI decisions.",
    readTime: "8 min read",
    author: "Vikash Singh",
    tags: ["XAI", "DNNs", "Counterfactual Explanations", "Interpretability"],
    content: `
# Advancements in Counterfactual Explanations for DNNs

Explainable AI (XAI) has become increasingly important as deep neural networks (DNNs) continue to permeate critical decision-making systems. Among the various XAI methods, counterfactual explanations stand out for their intuitive approach to explaining model decisions.

## What are Counterfactual Explanations?

Counterfactual explanations answer the question, "What would need to change for the model to produce a different outcome?" This approach is particularly valuable because it mimics human reasoning patterns. When we seek to understand why something happened, we often consider what could have been different to change the outcome.

For instance, if a loan application is rejected by an AI system, a counterfactual explanation might state: "Your loan would have been approved if your annual income was $5,000 higher."

## Recent Advancements

### 1. Diverse Counterfactual Explanations

One of the key challenges in generating counterfactual explanations is ensuring diversity. Recent work has focused on generating multiple counterfactuals that offer different paths to achieving the desired outcome.



### 2. Feasibility and Actionability

Not all counterfactual explanations are practical. For example, suggesting that a 60-year-old applicant would get a loan if they were 25 years old is neither feasible nor actionable. Recent research has emphasized generating counterfactuals that are:

- **Feasible**: Can actually be achieved
- **Actionable**: Provide practical steps the user can take
- **Proximal**: Require minimal changes from the original input

### 3. Application to Graph Neural Networks

My current research focuses on extending counterfactual explanation methods to Graph Neural Networks (GNNs). This is particularly challenging due to the complex, interconnected nature of graph data.

## Future Directions

The field of counterfactual explanations continues to evolve rapidly. Some promising directions include:

1. **Integrating causal knowledge** to generate more meaningful explanations
2. **Incorporating user preferences** to tailor explanations to specific needs
3. **Developing interactive systems** that allow users to explore different counterfactual scenarios

## Conclusion

Counterfactual explanations offer a powerful and intuitive approach to understanding complex AI systems. By continuing to advance these methods, we can help bridge the gap between increasingly sophisticated AI models and the humans who need to understand and trust their decisions.
    `
  },
  {
    slug: "llm-pruning-techniques",
    title: "The State of Large Language Model Pruning",
    date: "February 28, 2024",
    excerpt: "Analyzing current approaches to reduce the computational footprint of large language models without sacrificing performance.",
    readTime: "12 min read",
    author: "Vikash Singh",
    tags: ["LLMs", "Model Pruning", "Efficiency", "Model Optimization"],
    content: `
# The State of Large Language Model Pruning

As Large Language Models (LLMs) continue to grow in size and complexity, there's an increasing need to make them more efficient. Model pruning has emerged as a promising approach to reduce the computational footprint of these models without significantly sacrificing their performance.

## The Need for Pruning

Modern LLMs like GPT-4, Claude, and Llama 2 contain hundreds of billions of parameters, requiring:

- Enormous computational resources for training
- Significant memory for deployment
- Substantial energy for inference

This makes them:
- Expensive to deploy
- Environmentally costly
- Inaccessible for many applications

## Current Pruning Approaches

### 1. Weight Pruning

Weight pruning involves removing individual weights based on certain criteria:

- **Magnitude-based pruning**: Removing weights with the smallest absolute values
- **Movement-based pruning**: Removing weights that changed the least during fine-tuning
- **Second-order methods**: Using Hessian information to identify unimportant weights

### 2. Structured Pruning

Instead of removing individual weights, structured pruning removes entire units:

- **Attention head pruning**: Removing entire attention heads
- **Layer pruning**: Removing entire layers
- **Neuron pruning**: Removing neurons across layers

### 3. Knowledge Distillation

While not strictly pruning, knowledge distillation often complements pruning techniques:

- Train a smaller "student" model to mimic a larger "teacher" model
- Can be combined with pruning for better results

## Recent Research Findings

My recent work has focused on identifying redundancy in LLMs. We've found that:

1. Many attention heads specialize in similar patterns
2. Intermediate layers often capture redundant information
3. Certain neurons activate rarely across diverse inputs

## Practical Implementation

Here's a simplified example of implementing magnitude-based pruning:


## Challenges and Future Work

Despite promising results, several challenges remain:

1. **Finding optimal pruning criteria** that correlate well with model function
2. **Determining optimal pruning schedules** during training
3. **Balancing between different model components** (attention, MLP, embeddings)
4. **Ensuring pruned models maintain performance** across diverse tasks

## Conclusion

Model pruning represents a crucial direction for making LLMs more accessible and sustainable. By removing redundant parameters while preserving performance, we can deploy these powerful models in more resource-constrained environments.
    `
  },
  {
    slug: "biases-in-llms",
    title: "Biases in LLMs: A Comprehensive Review",
    date: "January 10, 2024",
    excerpt: "Investigating various types of biases that emerge in large language models and methods to mitigate them.",
    readTime: "10 min read",
    author: "Vikash Singh",
    tags: ["LLMs", "AI Ethics", "Bias", "Fairness"],
    content: `
# Biases in LLMs: A Comprehensive Review

Large Language Models (LLMs) have demonstrated remarkable capabilities in generating human-like text and performing various language tasks. However, these models also inherit and sometimes amplify biases present in their training data, raising serious ethical concerns about their deployment.

## Types of Biases in LLMs

### 1. Social Biases

Social biases relate to unfair associations involving demographic attributes such as:

- **Gender bias**: Associating specific professions, traits, or roles with particular genders
- **Racial bias**: Reflecting stereotypes or prejudice related to racial or ethnic groups
- **Cultural bias**: Favoring certain cultural perspectives or knowledge over others

### 2. Representation Biases

These biases stem from imbalanced representation in training data:

- **Language bias**: Overrepresentation of certain languages (especially English)
- **Geographic bias**: Overrepresentation of content from certain regions
- **Temporal bias**: Overrepresentation of information from specific time periods

### 3. Cognitive Biases

LLMs can exhibit various cognitive biases that affect reasoning:

- **Availability bias**: Overestimating the likelihood of events that are more easily recalled
- **Confirmation bias**: Favoring information that confirms existing beliefs
- **Anchor bias**: Relying too heavily on the first piece of information encountered

## Measuring Bias

Various benchmarks and methodologies have been developed to quantify bias in LLMs:

- **SEAT (Sentence Encoder Association Test)**: Measures associations between concepts
- **Winogender**: Evaluates gender bias in coreference resolution
- **BBQ (Bias Benchmark for QA)**: Assesses social biases in question answering
- **CrowS-Pairs**: Measures stereotypical associations across nine categories

## Bias Mitigation Approaches

### 1. Data-Centric Approaches

These methods focus on the training data:

- **Balanced dataset creation**: Ensuring diverse representation
- **Data augmentation**: Adding synthetic examples to counter biases
- **Bias identification and filtering**: Removing or flagging biased content

### 2. Model-Centric Approaches

These methods focus on the model training process:

- **Debiasing during pre-training**: Incorporating fairness objectives
- **Adversarial training**: Training the model to be invariant to protected attributes
- **Fine-tuning with balanced data**: Correcting biases after initial training

### 3. Post-Processing Approaches

These methods modify model outputs:

- **Output filtering**: Detecting and suppressing biased generations
- **Context engineering**: Crafting prompts that encourage fair responses
- **Output reranking**: Promoting less biased responses among candidates

## Challenges and Open Questions

Despite significant progress, several challenges remain:

1. **Definition problem**: What constitutes "bias" can be subjective and context-dependent
2. **Measurement limitations**: Current metrics may fail to capture subtle forms of bias
3. **Trade-offs**: Debiasing efforts might reduce model performance on certain tasks
4. **Unintended consequences**: Some debiasing methods might introduce new biases

## Conclusion

Addressing bias in LLMs requires a multifaceted approach combining careful data curation, thoughtful model design, and rigorous evaluation. As these models become increasingly integrated into society, ensuring their fairness and mitigating harmful biases must remain a top priority for researchers and practitioners alike.
    `
  }
];

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The blog post you are looking for does not exist or has been removed.
          </p>
          <Link href="/blogs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-6 hover:bg-transparent hover:text-sky-600 dark:hover:text-sky-400 p-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-gray-400 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="prose prose-sky dark:prose-invert max-w-none markdown-content">
              <Markdown>{post.content}</Markdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}