import type {
  MosaicPanelItem,
  BentoServiceCard,
  ProductRailItem,
  MethodStage,
  FaqDrawerItem,
} from '../design-system/tokens';

export const KEPT_MEDIA_ASSETS = {
  logoBlackHighRes: '/images/LADDER 7 NS Black.webp',
  logoPrimaryWebp: '/images/logos/logo-primary.webp',
  logoPrimaryPng: '/images/logos/logo-primary.png',
  logoWhiteWebp: '/images/logos/logo-white.webp',
  logoWhiteTight: '/images/logos/logo-white-tight.webp',
  logoSquareIcon: '/logo-icon.png',
  faviconVector: '/favicon.svg',
  heroAiVisual: '/images/hero/hero-ai-platform.webp',
  heroAutomationVisual: '/images/hero/hero-intelligent-automation.webp',
  heroEngineeringVisual: '/images/hero/hero-digital-engineering.png',
  heroCloudVisual: '/images/hero/hero-cloud-architecture.webp',
  productAnalyticsVisual: '/images/products/product-analytics-preview.webp',
  productShowcaseVisual: '/images/product-showcase.webp',
} as const;

export const FACTUAL_COMPANY_DATA = {
  brandName: 'Ladder7',
  legalEntity: 'Ladder7 Nextstep Solutions LLP',
  liveDomain: 'https://www.ladder7.in/',
  email: 'info@ladder7.in',
  phoneFormatted: '+91 81379 79401',
  phoneUri: 'tel:+918137979401',
  whatsappUri:
    "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7.",
  offices: [
    {
      city: 'Cochin',
      venue: 'WEE SPACES Ernakulam',
      territory: 'Kochi, Kerala, India',
    },
    {
      city: 'Trivandrum',
      venue: 'Kinfra Film and IT Park Trivandrum',
      territory: 'Thiruvananthapuram, Kerala, India',
    },
  ],
  corridors: ['India', 'UAE', 'Saudi Arabia', 'Singapore', 'United Kingdom', 'USA'],
  complianceStandards: ['GDPR', 'India DPDP Act', 'UAE AI Policy', 'Singapore PDPA'],
  socialProfiles: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/company/ladder7-nextstep-solutions-llp',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/ladder7_nextstep_solutions_?igsh=Mzd5cm5qbnpzam9p',
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/share/13wyxrXYTv/?mibextid=LQQJ4d',
    },
    {
      platform: 'WhatsApp',
      url: "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7.",
    },
  ],
} as const;

export const HERO_MOSAIC_PANELS: MosaicPanelItem[] = [
  {
    id: 'mosaic-ai-revenue',
    label: 'Websites & Digital Products',
    headline: 'Websites and AI systems built for real business growth.',
    subline:
      'We build fast websites, connected customer workflows, and clear analytics for growing companies and enterprise teams.',
    imageSrc: KEPT_MEDIA_ASSETS.heroAiVisual,
    imageAlt: 'Ladder7 digital growth platform',
  },
  {
    id: 'mosaic-agentic-ops',
    label: 'AI & Workflow Automation',
    headline: 'Private knowledge search and automated business workflows.',
    subline:
      'Connect custom AI assistants and task automation directly to your CRM, support desk, and internal documents.',
    imageSrc: KEPT_MEDIA_ASSETS.heroAutomationVisual,
    imageAlt: 'Ladder7 workflow automation',
  },
  {
    id: 'mosaic-composable-web',
    label: 'Enterprise AEM & Headless Web',
    headline: 'Fast React, Next.js, and Adobe Experience Manager websites.',
    subline:
      'Built for organizations that need multi-region publishing, strong accessibility, headless CMS flexibility, and reliable testing.',
    imageSrc: KEPT_MEDIA_ASSETS.heroEngineeringVisual,
    imageAlt: 'Ladder7 web and AEM engineering',
  },
  {
    id: 'mosaic-cloud-rescue',
    label: 'Cloud Consulting & Project Recovery',
    headline: 'Practical technology consulting, cloud setup, and project recovery.',
    subline:
      'We plan new software architectures, rescue delayed builds, and train engineering teams on AWS, Azure, and GCP.',
    imageSrc: KEPT_MEDIA_ASSETS.heroCloudVisual,
    imageAlt: 'Ladder7 cloud consulting and training',
  },
];

export const BENTO_SERVICES: BentoServiceCard[] = [
  {
    id: 'service-composable-dx',
    category: 'Web & E-Commerce',
    title: 'Websites, Headless CMS & Enterprise AEM',
    editorialBody:
      'We build fast React and Next.js websites, headless CMS platforms, and Adobe Experience Manager (AEM) sites focused on clear user journeys, regional publishing, and accessibility.',
    capabilities: [
      'Adobe Experience Manager (AEM)',
      'Headless CMS & Next.js',
      'Conversion-Focused Websites',
      'Custom Web Applications',
      'Localization & Accessibility',
    ],
    colSpan: 'span-8',
    imageSrc: KEPT_MEDIA_ASSETS.heroEngineeringVisual,
    imageAlt: 'Web and AEM development',
  },
  {
    id: 'service-applied-ai',
    category: 'AI & Automation',
    title: 'Custom AI Chatbots, RAG & Process Automation',
    editorialBody:
      'We build private internal knowledge search, customer support assistants, and automated workflows connected to your daily tools.',
    capabilities: [
      'Custom LLM & RAG Search',
      'Automated Business Workflows',
      'Customer Support Chatbots',
      'Content Personalisation',
    ],
    colSpan: 'span-4',
    imageSrc: KEPT_MEDIA_ASSETS.heroAutomationVisual,
    imageAlt: 'AI and workflow automation',
  },
  {
    id: 'service-cloud-strategy',
    category: 'Consulting',
    title: 'Architecture Planning & Stalled Project Recovery',
    editorialBody:
      'Our architects help you plan new software products, build working prototypes, and step in to stabilize and finish delayed projects.',
    capabilities: [
      'Solution Architecture',
      'Stalled Project Recovery',
      'R&D Proof-of-Concept Builds',
      'Cloud Setup on AWS, Azure & GCP',
    ],
    colSpan: 'span-4',
    imageSrc: KEPT_MEDIA_ASSETS.heroCloudVisual,
    imageAlt: 'Technology consulting and project recovery',
  },
  {
    id: 'service-custom-software',
    category: 'Custom Development',
    title: 'Custom Software, Billing Tools & CRM Integration',
    editorialBody:
      'When standard software does not fit your workflow, we build tailored web applications, billing tools, and two-way Salesforce or HubSpot integrations.',
    capabilities: [
      'Custom Web Software',
      'Billing & Invoicing Tools',
      'Salesforce & HubSpot Integration',
      'Analytics & A/B Testing',
    ],
    colSpan: 'span-8',
    imageSrc: KEPT_MEDIA_ASSETS.heroAiVisual,
    imageAlt: 'Custom software and CRM integration',
  },
];

export const PRODUCT_RAIL_ITEMS: ProductRailItem[] = [
  {
    id: 'site-360',
    category: 'Website Diagnostics',
    name: 'Site 360',
    positioning: 'Website Health, Security & Search Visibility Platform',
    narrative:
      'Site 360 checks your live website across 12 areas including Core Web Vitals, accessibility, security, SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization). It gives your team one clear Digital Health Score, ranks fixes by business impact, and sends tasks directly into Jira and Azure DevOps.',
    highlights: [
      'Audits 12 areas across speed, security, accessibility, SEO, AEO, and GEO',
      'Prioritizes fixes based on commercial and conversion impact',
      'Sends tasks directly to Jira and Azure DevOps',
    ],
    connectors: ['Jira', 'Azure DevOps', 'Search Console', 'CI/CD Webhooks'],
    imageSrc: KEPT_MEDIA_ASSETS.productAnalyticsVisual,
    imageAlt: 'Site 360 website diagnostic product preview',
    ctaLabel: 'Ask About Site 360',
  },
  {
    id: 'l7-nexus',
    category: 'Customer Messaging',
    name: 'L7 Nexus',
    positioning: 'Unified Customer Conversation & Support Hub',
    narrative:
      'L7 Nexus brings customer conversations across WhatsApp, SMS, Email, and web chat into one shared inbox. It pairs automated replies with human support handoffs, SLA tracking, and two-way sync with Salesforce, HubSpot, and custom CRMs.',
    highlights: [
      'Single customer thread across WhatsApp, SMS, Email, and Web Chat',
      'Smooth handoff between automated replies and human support agents',
      'SLA tracking and automatic CRM contact updates',
    ],
    connectors: ['WhatsApp', 'Salesforce', 'HubSpot', 'Custom CRM'],
    imageSrc: KEPT_MEDIA_ASSETS.productShowcaseVisual,
    imageAlt: 'L7 Nexus customer messaging hub preview',
    ctaLabel: 'Ask About L7 Nexus',
  },
  {
    id: 'l7-insights',
    category: 'Product Analytics',
    name: 'L7 Insights',
    positioning: 'Customer Behavior Analytics & Retention Tracking',
    narrative:
      'L7 Insights turns website events and transaction data into clear reports. It tracks high-volume daily activity to spot funnel drop-offs, identify churn risk early, and send summary digests to Slack and Microsoft Teams.',
    highlights: [
      'High-volume event tracking for web and SaaS products',
      'Churn prediction and customer lifetime value reporting',
      'Automated summary alerts sent to Slack and Microsoft Teams',
    ],
    connectors: ['Slack', 'Microsoft Teams', 'Event Pipelines', 'Data Warehouses'],
    imageSrc: KEPT_MEDIA_ASSETS.productAnalyticsVisual,
    imageAlt: 'L7 Insights analytics product preview',
    ctaLabel: 'Ask About L7 Insights',
  },
  {
    id: 'outreach-engine',
    category: 'B2B Outreach',
    name: 'Outreach Engine',
    positioning: 'Research-Backed B2B Lead Qualification & Outreach',
    narrative:
      'Outreach Engine helps B2B sales teams find companies showing buying intent, gather relevant account context, and run multi-step email sequences with built-in deliverability safeguards.',
    highlights: [
      'Finds target accounts showing real buying signals',
      'Drafts relevant outreach based on company news and context',
      'Built-in domain warm-up and inbox deliverability protection',
    ],
    connectors: ['Intent Data', 'CRM Pipelines', 'Email Guardrails', 'L7 Nexus'],
    imageSrc: KEPT_MEDIA_ASSETS.productShowcaseVisual,
    imageAlt: 'Outreach Engine B2B outreach product preview',
    ctaLabel: 'Ask About Outreach Engine',
  },
  {
    id: 'infinite-insights',
    category: 'Internal Search',
    name: 'Infinite Insights',
    positioning: 'Private Internal Document Search & Knowledge Assistant',
    narrative:
      'Infinite Insights turns internal PDFs, Notion pages, Jira tickets, and recorded notes into a searchable knowledge base. It respects role-based access permissions, keeps company data private, and cites the exact source document for every answer.',
    highlights: [
      'Fast search across internal PDFs, wikis, and project tickets',
      'Private setup that never uses company data to train public models',
      'Includes direct source citations for every answer',
    ],
    connectors: ['PDFs', 'Notion & Confluence', 'Jira', 'Role-Based Access'],
    imageSrc: KEPT_MEDIA_ASSETS.productAnalyticsVisual,
    imageAlt: 'Infinite Insights internal search product preview',
    ctaLabel: 'Ask About Infinite Insights',
  },
];

export const EXECUTION_METHOD_STAGES: MethodStage[] = [
  {
    number: '1',
    phase: 'Audit & Discovery',
    headline: 'Review your current website, workflows, and search health',
    summary:
      'We start by reviewing your existing setup with Site 360 to find speed issues, search gaps, and manual tasks that slow your team down.',
    deliverables: ['Site 360 Health Report', 'System & Data Review', 'Prioritized Action List'],
    outcome: 'Clear project scope and priorities agreed with your team',
  },
  {
    number: '2',
    phase: 'Architecture & Design',
    headline: 'Plan the technical setup, interface design, and data security',
    summary:
      'Our architects map out the frontend structure, CMS or AEM setup, API connections, and privacy controls aligned with GDPR, DPDP, UAE, and Singapore rules.',
    deliverables: ['Technical Architecture Plan', 'Interactive UI Prototypes', 'Access & Privacy Setup'],
    outcome: 'Prototypes and technical specifications signed off',
  },
  {
    number: '3',
    phase: 'Build & Integrate',
    headline: 'Develop the platform and connect your business tools',
    summary:
      'Our engineers build your website, custom software, or automation workflows in focused sprints with automated testing and regular staging previews.',
    deliverables: ['Production Web or Software Build', 'CRM & Workflow Connections', 'Automated Test Suite'],
    outcome: 'Speed, accessibility, and security checks passed',
  },
  {
    number: '4',
    phase: 'Launch & Handover',
    headline: 'Go live smoothly, monitor results, and train your team',
    summary:
      'We handle the production launch, set up live analytics reporting, and train your internal staff through practical cloud and DevOps workshops.',
    deliverables: ['Live Analytics Dashboards', 'Ongoing A/B Testing Setup', 'Team Training & Handover'],
    outcome: 'Stable production system and confident internal team',
  },
];

export const FAQ_DRAWER_ITEMS: FaqDrawerItem[] = [
  {
    id: 'faq-scope',
    category: 'Services',
    question: 'What engineering and consulting services does Ladder7 provide?',
    response:
      'Ladder7 Nextstep Solutions builds modern websites and e-commerce platforms (React, Next.js, Headless CMS, and Adobe Experience Manager), custom AI chatbots and private RAG search, automated business workflows, custom web software and billing tools, Salesforce and HubSpot integrations, and corporate Cloud and DevOps training on AWS, Azure, and GCP.',
  },
  {
    id: 'faq-cohorts',
    category: 'Clients & Regions',
    question: 'Which types of companies and regions do you work with?',
    response:
      'We work with two main groups: established enterprises running large multi-region platforms, and startups or growing SMBs launching new digital products and lead pipelines. From our offices in Cochin (WEE SPACES Ernakulam) and Trivandrum (Kinfra Film and IT Park), we work with clients across India, the UAE, Saudi Arabia, Singapore, the United Kingdom, and the USA.',
  },
  {
    id: 'faq-security',
    category: 'Privacy',
    question: 'How do you keep company data private when building AI tools?',
    response:
      'We use private enterprise AI setups so your internal documents and customer records never train public models. We also enforce role-based access permissions, include source citations, and follow GDPR, India DPDP Act, UAE AI Policy, and Singapore PDPA requirements.',
  },
  {
    id: 'faq-products',
    category: 'Products',
    question: 'Can L7 Insights, Outreach, Infinite, or L7 Nexus connect to our existing tools?',
    response:
      'Yes. Our products are built to plug directly into your current tech stack. L7 Insights turns Google Sheets and analytics into custom KPI dashboards, Outreach integrates with your email mailboxes and CRM funnels, Infinite surfaces active project ROI, and L7 Nexus coordinates multi-agent operations with Salesforce and Slack.',
  },
];
