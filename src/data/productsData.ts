import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'site-360',
    name: 'Site 360',
    tagline: 'One audit, twelve lenses, one score.',
    description: 'Site 360 runs live checks against your actual website across twelve lenses, from performance and accessibility to SEO, AEO, GEO and security, then returns a single Digital Health score with the highest-impact fixes ranked first. Built for anyone accountable for how a website performs across search and AI.',
    features: [
      'Twelve analysis lenses in one scan, not six tools with six verdicts',
      'Findings ranked by revenue impact, not a flat checklist',
      'Fixes pushed to Jira and Azure DevOps, so the work reaches the backlog',
    ],
    ctaPrimary: 'Learn More on L7 Nexus',
    image: '/images/products/product_showcase.jpeg',
  },
  {
    id: 'l7-nexus',
    name: 'L7 Nexus',
    tagline: 'Omnichannel Communications & Engagement',
    description: 'Unify customer conversations across WhatsApp, SMS, Email, and in-app chat into one intelligent operational inbox. Route queries to AI agents or human teams dynamically with end-to-end auditability.',
    features: [
      'Single conversational thread across all modern channels',
      'Automated SLA tracking and intelligent escalation queues',
      'Native integrations with Salesforce, HubSpot, and custom CRMs',
    ],
    ctaPrimary: 'Explore L7 Nexus',
    image: '/images/products/nexushome.jpeg',
  },
  {
    id: 'l7-insights',
    name: 'L7 Insights',
    tagline: 'Predictive Analytics & Executive Telemetry',
    description: 'Transform raw behavioral data and transactional logs into predictive growth signals. Identify revenue leaks, forecast customer churn, and discover high-value conversion pathways automatically.',
    features: [
      'Machine-learning churn prediction and lifetime value forecasting',
      'Real-time event streaming pipeline processing millions of daily events',
      'Automated executive summaries delivered directly to Slack and Teams',
    ],
    ctaPrimary: 'Discover L7 Insights',
    image: '/images/products/L7-Insights-Home.jpeg',
  },
  {
    id: 'outreach-engine',
    name: 'Outreach Engine',
    tagline: 'Autonomous Multi-Channel Acquisition',
    description: 'Scale cold prospecting and warm account engagement with personalized, contextual outreach. AI engines research prospective accounts and draft highly relevant multi-touch campaigns.',
    features: [
      'Deep ICP discovery and autonomous intent signal qualification',
      'Hyper-personalized messaging tailored to recipient company news',
      'Deliverability guardrails ensuring 99%+ inbox placement',
    ],
    ctaPrimary: 'Launch Outreach Engine',
    image: '/images/products/outreachhm.jpeg',
  },
  {
    id: 'infinite-insights',
    name: 'Infinite Insights',
    tagline: 'Cognitive Enterprise Knowledge Engine',
    description: 'Unlock institutional knowledge trapped inside PDFs, Notion pages, Jira tickets, and recorded meetings. Enterprise RAG architecture with role-based access control and zero data leakage.',
    features: [
      'Sub-second semantic search across multi-terabyte internal repositories',
      'Zero-retention enterprise LLM gateway complying with strict NDA limits',
      'Citations mapped directly to source documents for 100% verification',
    ],
    ctaPrimary: 'Explore Infinite Insights',
    image: '/images/products/infinityhome.jpeg',
  },
];
