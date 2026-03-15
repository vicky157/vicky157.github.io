import type { ContactItem } from '../types';

export const contactItems: ContactItem[] = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'vikashjohn2505@gmail.com',
    href: 'mailto:vikashjohn2505@gmail.com',
  },
  {
    icon: 'fab fa-linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/vikash-singh-john',
    href: 'https://www.linkedin.com/in/vikash-singh-john/',
    target: '_blank',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    value: 'github.com/vicky157',
    href: 'https://github.com/vicky157',
    target: '_blank',
  },
  {
    icon: 'fas fa-graduation-cap',
    label: 'Scholar',
    value: 'Google Scholar Profile',
    href: 'https://scholar.google.com/citations?user=zt0c4WsAAAAJ',
    target: '_blank',
  },
  {
    icon: 'fas fa-globe',
    label: 'Website',
    value: 'vikash-singh.me',
    href: 'https://vikash-singh.me',
    target: '_blank',
  },
  {
    icon: 'fas fa-phone',
    label: 'Phone',
    value: '+1 (216) 463-0000',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Cleveland, OH 44106, USA',
  },
];

export const skills = {
  languages: 'Python3, C++, Java, JavaScript',
  devTools: 'VS Code, Google Colab, Overleaf, High-Performance Cloud, OneAPI DevCloud',
  frameworks: 'PyTorch, TensorFlow, Scikit-Learn, OpenCV',
  platforms: 'Linux, GitHub, Windows, macOS, Terminal',
};

export const ongoingWork = [
  'Conducting research on large language model pruning.',
  'Exploring counterfactual generation in dynamic Graph Neural Networks (GNNs).',
  'Analyzing biases in large language models (anchor bias).',
  'Investigating mathematical approaches to pruning LLMs.',
  'Implementing hyperparameter tuning using Bayesian group testing.',
];
