import type { Capability } from '../types';

export const CAPABILITIES: Capability[] = [
  {
    id: 'digital-experience',
    icon: 'web',
    title: 'Digital Experience & Composable Platforms',
    description: 'Architecting seamless front-ends and headless back-ends for modern agility.',
    tags: ['Landing Pages', 'Intelligent Web Sites', 'Custom Web Application', 'Saas Tools'],
    glowBarColor: 'linear-gradient(to right, #a78bfa, #7c3aed)',
    glowBloomColor: '#7c3aed',
  },
  {
    id: 'applied-ai',
    icon: 'smart_toy',
    title: 'Applied AI Hyperautomation',
    description: 'Deploying autonomous agents and RAG-based systems for operational dominance.',
    tags: ['AI Assistants', 'Chatbots', 'Agentic AI', 'Hypeautomation'],
    glowBarColor: 'linear-gradient(to right, #fb923c, #f97316)',
    glowBloomColor: '#f97316',
  },
  {
    id: 'tech-strategy',
    icon: 'strategy',
    title: 'Technology Strategy & Consulting',
    description: 'Strategic blueprinting and recovery roadmaps for complex platform initiatives.',
    tags: ['Product Ideation', 'Product Architecture', 'Research and Development', 'Solutioning'],
    glowBarColor: 'linear-gradient(to right, #38bdf8, #0284c7)',
    glowBloomColor: '#0284c7',
  },
  {
    id: 'custom-dev',
    icon: 'add_circle',
    title: 'Custom Developments',
    description: 'Build tailored solutions designed around your unique business needs and workflows.',
    tags: ['Custom Applications', 'Billing Software', 'Product Development', 'Software Development'],
    glowBarColor: 'linear-gradient(to right, #34d399, #059669)',
    glowBloomColor: '#059669',
  },
];
