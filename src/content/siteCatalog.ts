import type {
  HeroShowcaseFrame,
  AudienceSegment,
  CapabilityBentoItem,
  ProductDeckEntry,
  BuildProcessStage,
  TrustPillarItem,
  ObjectionFAQ,
} from '../tokens/designTokens';

export const BRAND_ASSETS = {
  logoWhite: '/images/logos/logo-white.webp',
  logoPrimary: '/images/logos/logo-primary.webp',
  logoPrimaryPng: '/images/logos/logo-primary.png',
  logoIcon: '/logo-icon.png',
  faviconSvg: '/favicon.svg',
  heroAiPlatform: '/images/hero/hero-ai-platform.webp',
  heroAutomation: '/images/hero/hero-intelligent-automation.webp',
  heroDigitalEngineering: '/images/hero/hero-digital-engineering.png',
  heroCloudArchitecture: '/images/hero/hero-cloud-architecture.webp',
  productTelemetry: '/images/products/product-telemetry-preview.webp',
  productShowcase: '/images/products/product-showcase.webp',
} as const;

export const CONTACT_DIRECTORY = {
  email: 'info@ladder7.in',
  phoneDisplay: '+91 81379 79401',
  phoneHref: 'tel:+918137979401',
  whatsappHref:
    "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7.",
  locations: [
    {
      city: 'Cochin',
      hubName: 'WEE SPACES Ernakulam',
      region: 'Kochi, Kerala, India',
    },
    {
      city: 'Trivandrum',
      hubName: 'Kinfra Film and IT Park Trivandrum',
      region: 'Thiruvananthapuram, Kerala, India',
    },
  ],
  socials: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/ladder7-nextstep-solutions-llp',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ladder7_nextstep_solutions_?igsh=Mzd5cm5qbnpzam9p',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/13wyxrXYTv/?mibextid=LQQJ4d',
    },
    {
      name: 'WhatsApp',
      href: "https://wa.me/918137979401?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20Ladder7.",
    },
  ],
  markets: ['India', 'UAE', 'Saudi Arabia', 'Singapore', 'United Kingdom', 'USA'],
  complianceFrameworks: ['GDPR', 'India DPDP Act', 'UAE AI Policy', 'Singapore PDPA'],
} as const;

export const HERO_FRAMES: HeroShowcaseFrame[] = [
  {
    id: 'revenue-engine',
    tag: 'Intelligent AI Systems',
    headline: 'Is Your Digital Presence',
    accentPhrase: 'Actually Making You Money?',
    summary:
      'From intelligent websites to autonomous AI revenue systems, we build connected digital experiences that attract the right visitors, capture leads, and grow your business around the clock.',
    primaryAction: 'Build My Revenue Engine',
    secondaryAction: 'Explore Capabilities',
    assetPath: BRAND_ASSETS.heroAiPlatform,
    assetAlt: 'Ladder7 Intelligent AI Revenue Platform Showcase',
    telemetryLabel: 'Autonomous Lead Capture',
    telemetryValue: '24/7 Active Pipeline',
  },
  {
    id: 'applied-automation',
    tag: 'Intelligent Automation',
    headline: 'Driving Operational Velocity with',
    accentPhrase: 'Applied AI.',
    summary:
      'Harness the power of agentic workflows, secure RAG architectures, and machine learning to automate complex enterprise processes across every customer channel.',
    primaryAction: 'Start Your AI Journey',
    secondaryAction: 'Explore Capabilities',
    assetPath: BRAND_ASSETS.heroAutomation,
    assetAlt: 'Ladder7 Applied AI Hyperautomation Workflow',
    telemetryLabel: 'Agentic Triage & RAG',
    telemetryValue: 'Zero-Retention Security',
  },
  {
    id: 'digital-engineering',
    tag: 'Nextstep Digital Engineering',
    headline: 'Engineering the Future of',
    accentPhrase: 'Digital Business.',
    summary:
      'From composable digital experiences to autonomous AI ecosystems, we architect scalable technology solutions that drive measurable market dominance.',
    primaryAction: 'Schedule a Strategic Consultation',
    secondaryAction: 'Explore Capabilities',
    assetPath: BRAND_ASSETS.heroDigitalEngineering,
    assetAlt: 'Ladder7 Composable Digital Engineering Architecture',
    telemetryLabel: 'Composable Web & AEM',
    telemetryValue: 'Sub-Second Experience',
  },
  {
    id: 'cloud-strategy',
    tag: 'Enterprise Cloud Strategy',
    headline: 'Your Strategic Partner in',
    accentPhrase: 'Digital Engineering.',
    summary:
      'Take the right next step. From complex AEM implementations to autonomous AI workflows and system rescues, we provide the elite engineering and strategic clarity you need to lead your market.',
    primaryAction: 'Consult an Architect',
    secondaryAction: 'Explore Capabilities',
    assetPath: BRAND_ASSETS.heroCloudArchitecture,
    assetAlt: 'Ladder7 Enterprise Cloud Strategy and Architecture',
    telemetryLabel: 'Multi-Cloud & Rescues',
    telemetryValue: 'AWS · Azure · GCP',
  },
];

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: 'established-brands',
    eyebrow: 'Enterprise & Scaling Brands',
    title: 'For Established Brands & Scaling Businesses',
    summary:
      'We deliver robust, high-performance digital platforms with AI-powered personalisation, Adobe Experience Manager (AEM), CRM integration, and analytics engineered for reliability, security, and global market reach across India, the Middle East, and Southeast Asia.',
    highlights: [
      'Adobe Experience Manager (AEM) & Headless CMS ecosystems',
      'Enterprise RAG & multi-agent workflows aligned with regional compliance',
      'Architectural rescues, cloud migration, and multi-market localization',
    ],
    regions: 'India · UAE · Saudi Arabia · Singapore · UK · USA',
    ctaLabel: 'Scope Enterprise Platform',
  },
  {
    id: 'startups-smbs',
    eyebrow: 'High-Velocity Challengers',
    title: 'For Fast-Growing Startups & SMBs',
    summary:
      'We give ambitious businesses the same intelligent web systems, AI chatbots, and automated lead pipelines that larger organisations rely on so you convert more visitors, respond faster, and compete without limits.',
    highlights: [
      'Conversion-engineered web platforms and custom SaaS applications',
      'Omnichannel WhatsApp, SMS, and Email automated lead pipelines',
      'Rapid R&D proof-of-concepts, billing software, and growth telemetry',
    ],
    regions: 'Rapid Sprint Delivery · End-to-End Execution',
    ctaLabel: 'Launch Growth Engine',
  },
];

export const CORPORATE_TRAINING_HIGHLIGHT = {
  id: 'corporate-training',
  eyebrow: 'Corporate Enablement & Bootcamps',
  title: 'Hands-On Cloud Computing & DevOps Corporate Bootcamps',
  summary:
    'Beyond commercial software delivery, Ladder7 upskills corporate engineering departments through practical, production-grade bootcamps across AWS, Azure, and GCP—focusing on real-world deployments, CI/CD pipelines, system monitoring, and alerting configurations rather than theoretical slides.',
  tracks: [
    'Multi-Cloud Infrastructure (AWS, Azure & GCP)',
    'Production CI/CD Pipelines & Release Automation',
    'System Monitoring, Telemetry & Alerting Configurations',
  ],
};

export const CAPABILITIES_BENTO: CapabilityBentoItem[] = [
  {
    id: 'digital-experience',
    index: '01',
    title: 'Digital Experience & Composable Platforms',
    summary:
      'Architecting seamless front-ends, Adobe Experience Manager (AEM) implementations, and headless back-ends for modern agility and measurable conversion.',
    deliverablePills: [
      'Landing Pages',
      'Intelligent Web Sites',
      'Custom Web Application',
      'SaaS Tools',
      'Adobe Experience Manager (AEM)',
      'Headless CMS',
    ],
    bentoSpan: 'wide',
    accentGradient: 'from-[#0056B2]/35 via-[#2563EB]/15 to-transparent',
    architectureNote: 'React · Next.js · AEM · Accessibility · Automated QA',
    assetPreview: BRAND_ASSETS.heroDigitalEngineering,
  },
  {
    id: 'applied-ai',
    index: '02',
    title: 'Applied AI Hyperautomation',
    summary:
      'Deploying autonomous agents, secure LLM chatbots, and RAG-based knowledge systems for 24/7 operational dominance.',
    deliverablePills: [
      'AI Assistants',
      'Chatbots',
      'Agentic AI',
      'Hyperautomation',
      'Enterprise RAG',
    ],
    bentoSpan: 'narrow',
    accentGradient: 'from-[#38BDF8]/30 via-[#0056B2]/15 to-transparent',
    architectureNote: 'LLM & RAG · Multi-Agent Systems · Behavioral Personalisation',
    assetPreview: BRAND_ASSETS.heroAutomation,
  },
  {
    id: 'tech-strategy',
    index: '03',
    title: 'Technology Strategy & Consulting',
    summary:
      'Strategic blueprinting, cloud migrations, and high-stakes recovery roadmaps for complex platform initiatives.',
    deliverablePills: [
      'Product Ideation',
      'Product Architecture',
      'Research and Development',
      'Solutioning',
      'System Rescues',
    ],
    bentoSpan: 'narrow',
    accentGradient: 'from-[#2563EB]/30 via-[#38BDF8]/10 to-transparent',
    architectureNote: 'Cloud Architecture · PoC Validation · Platform Turnarounds',
    assetPreview: BRAND_ASSETS.heroCloudArchitecture,
  },
  {
    id: 'custom-dev',
    index: '04',
    title: 'Custom Developments',
    summary:
      'Build tailored software solutions, billing engines, and CRM-connected applications designed around your unique business workflows.',
    deliverablePills: [
      'Custom Applications',
      'Billing Software',
      'Product Development',
      'Software Development',
      'CRM & Analytics Integration',
    ],
    bentoSpan: 'wide',
    accentGradient: 'from-[#0056B2]/35 via-[#38BDF8]/15 to-transparent',
    architectureNote: 'Full-Stack Engineering · Billing & Operations · API Orchestration',
    assetPreview: BRAND_ASSETS.heroAiPlatform,
  },
];

export const PRODUCTS_DECK: ProductDeckEntry[] = [
  {
    id: 'site-360',
    index: '01',
    name: 'Site 360',
    tagline: 'One audit, twelve lenses, one score.',
    summary:
      'Site 360 runs live checks against your actual website across twelve lenses, from performance and accessibility to SEO, AEO, GEO and security, then returns a single Digital Health score with the highest-impact fixes ranked first. Built for anyone accountable for how a website performs across search and AI.',
    bulletPoints: [
      'Twelve analysis lenses in one scan, not six tools with six verdicts',
      'Findings ranked by revenue impact, not a flat checklist',
      'Fixes pushed to Jira and Azure DevOps, so the work reaches the backlog',
    ],
    ctaText: 'Run Site 360 Audit',
    assetPath: BRAND_ASSETS.productTelemetry,
    liveMetricLabel: '12-Lens Diagnostic',
    liveMetricValue: 'SEO · AEO · GEO · Perf · Sec',
    integrations: ['Jira', 'Azure DevOps', 'Search Console', 'CI/CD'],
  },
  {
    id: 'l7-nexus',
    index: '02',
    name: 'L7 Nexus',
    tagline: 'Omnichannel Communications & Engagement',
    summary:
      'Unify customer conversations across WhatsApp, SMS, Email, and in-app chat into one intelligent operational inbox. Route queries to AI agents or human teams dynamically with end-to-end auditability.',
    bulletPoints: [
      'Single conversational thread across all modern channels',
      'Automated SLA tracking and intelligent escalation queues',
      'Native integrations with Salesforce, HubSpot, and custom CRMs',
    ],
    ctaText: 'Explore L7 Nexus',
    assetPath: BRAND_ASSETS.productShowcase,
    liveMetricLabel: 'Unified Inbox',
    liveMetricValue: 'WhatsApp · SMS · Email · Chat',
    integrations: ['WhatsApp API', 'Salesforce', 'HubSpot', 'Custom CRM'],
  },
  {
    id: 'l7-insights',
    index: '03',
    name: 'L7 Insights',
    tagline: 'Predictive Analytics & Executive Telemetry',
    summary:
      'Transform raw behavioral data and transactional logs into predictive growth signals. Identify revenue leaks, forecast customer churn, and discover high-value conversion pathways automatically.',
    bulletPoints: [
      'Machine-learning churn prediction and lifetime value forecasting',
      'Real-time event streaming pipeline processing millions of daily events',
      'Automated executive summaries delivered directly to Slack and Teams',
    ],
    ctaText: 'Discover L7 Insights',
    assetPath: BRAND_ASSETS.productTelemetry,
    liveMetricLabel: 'Predictive Telemetry',
    liveMetricValue: 'Churn & LTV Forecasting',
    integrations: ['Slack', 'Microsoft Teams', 'Event Streams', 'BI Stack'],
  },
  {
    id: 'outreach-engine',
    index: '04',
    name: 'Outreach Engine',
    tagline: 'Autonomous Multi-Channel Acquisition',
    summary:
      'Scale cold prospecting and warm account engagement with personalized, contextual outreach. AI engines research prospective accounts and draft highly relevant multi-touch campaigns.',
    bulletPoints: [
      'Deep ICP discovery and autonomous intent signal qualification',
      'Hyper-personalized messaging tailored to recipient company news',
      'Deliverability guardrails ensuring 99%+ inbox placement',
    ],
    ctaText: 'Launch Outreach Engine',
    assetPath: BRAND_ASSETS.productShowcase,
    liveMetricLabel: 'Deliverability Guardrails',
    liveMetricValue: '99%+ Inbox Placement',
    integrations: ['ICP Intent Signals', 'CRM Sync', 'Multi-Touch Sequences'],
  },
  {
    id: 'infinite-insights',
    index: '05',
    name: 'Infinite Insights',
    tagline: 'Cognitive Enterprise Knowledge Engine',
    summary:
      'Unlock institutional knowledge trapped inside PDFs, Notion pages, Jira tickets, and recorded meetings. Enterprise RAG architecture with role-based access control and zero data leakage.',
    bulletPoints: [
      'Sub-second semantic search across multi-terabyte internal repositories',
      'Zero-retention enterprise LLM gateway complying with strict NDA limits',
      'Citations mapped directly to source documents for 100% verification',
    ],
    ctaText: 'Explore Infinite Insights',
    assetPath: BRAND_ASSETS.productTelemetry,
    liveMetricLabel: 'Enterprise RAG',
    liveMetricValue: '100% Source-Cited Answers',
    integrations: ['PDFs & Docs', 'Notion', 'Jira', 'RBAC Security'],
  },
];

export const BUILD_PROCESS_STAGES: BuildProcessStage[] = [
  {
    stepNumber: '01',
    phaseTag: 'Diagnose & Audit',
    title: 'Forensic Baseline & 12-Lens Diagnostic',
    narrative:
      'We inspect your existing customer journey, web performance, SEO/AEO/GEO visibility, and operational bottlenecks to isolate the exact leaks costing you pipeline.',
    outputs: ['Site 360 Digital Health Audit', 'Funnel & CRM Friction Map', 'Prioritized Impact Backlog'],
    gateMetric: '12 Lenses Audited',
  },
  {
    stepNumber: '02',
    phaseTag: 'Blueprint & Architect',
    title: 'Composable & AI System Architecture',
    narrative:
      'We design the frontend experience system, headless/AEM content architecture, and secure RAG or agentic workflows around your commercial KPIs and regional compliance rules.',
    outputs: ['Platform & API Blueprint', 'High-Contrast UI System', 'Privacy & Compliance Model'],
    gateMetric: '100% Outcome-Aligned',
  },
  {
    stepNumber: '03',
    phaseTag: 'Engineer & Automate',
    title: 'Sprint Delivery & Connected Automation',
    narrative:
      'Our engineering teams implement fast, accessible web experiences, deploy autonomous AI assistants, and wire bi-directional CRM and analytics integrations.',
    outputs: ['Production Web / AEM Platform', 'Deployed AI Agents & RAG', 'Automated QA & CI/CD Suite'],
    gateMetric: 'Zero-Downtime Ship',
  },
  {
    stepNumber: '04',
    phaseTag: 'Activate & Compound',
    title: 'Continuous Telemetry & Team Enablement',
    narrative:
      'Post-launch, L7 Insights and Site 360 monitor live behavioral signals while our principal engineers upskill your internal teams across cloud and DevOps operations.',
    outputs: ['Live Executive Telemetry', 'Iterative Conversion Experiments', 'Corporate Cloud Handover'],
    gateMetric: '24/7 Growth Loop',
  },
];

export const TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: 'revenue-first',
    badge: '01 // Commercial Clarity',
    title: 'Revenue-First, Always',
    description:
      "We do not build technology for technology's sake. Every platform, AI system, and integration we deliver is tied to a clear business outcome — more leads, lower acquisition costs, faster market entry, or higher conversion rates.",
    proofBadges: ['Lead Conversion Lift', 'Lower CAC', 'Faster Market Entry'],
  },
  {
    id: 'global-delivery',
    badge: '02 // Cross-Border Reach',
    title: 'Global Delivery, Local Intelligence',
    description:
      'We are an active delivery partner across India, UAE, Saudi Arabia, Singapore, the UK, and North America. Our work is informed by the specific cultural, linguistic, and compliance requirements of each market — not applied generically.',
    proofBadges: ['India & MENA', 'Singapore & APAC', 'UK & North America'],
  },
  {
    id: 'security-compliance',
    badge: '03 // Privacy by Design',
    title: 'Security and Compliance Built In',
    description:
      "Every website, AI model, and data integration we build is privacy-first by design — aligned with GDPR, India's DPDP Act, UAE AI Policy, and Singapore's PDPA — so your business is protected in every market you operate.",
    proofBadges: ['GDPR & DPDP Act', 'UAE AI Policy', 'Singapore PDPA'],
  },
];

export const TRUST_METRICS = [
  {
    value: '12',
    suffix: 'Lenses',
    label: 'Simultaneous web, SEO, AEO, GEO & security checks in Site 360',
  },
  {
    value: '05',
    suffix: 'Platforms',
    label: 'Proprietary software engines built for action rather than static reports',
  },
  {
    value: '06',
    suffix: 'Markets',
    label: 'Active delivery across India, UAE, Saudi Arabia, Singapore, UK & USA',
  },
  {
    value: '24/7',
    suffix: 'Systems',
    label: 'Autonomous AI assistants, omnichannel routing & live revenue telemetry',
  },
] as const;

export const OBJECTION_FAQS: ObjectionFAQ[] = [
  {
    id: '01',
    tag: 'Capabilities & Scope',
    question: 'What services does Ladder7 Nextstep Solutions provide?',
    answer:
      'Ladder7 delivers intelligent web engineering, AI chatbots and automation, Adobe Experience Manager (AEM) implementation, headless CMS platforms, CRM and analytics integration, custom software & billing applications, corporate cloud/DevOps bootcamps, and technology strategy consulting. Everything we build is connected to one goal — turning your digital presence into a measurable revenue engine.',
  },
  {
    id: '02',
    tag: 'Client Fit & Markets',
    question: 'Does Ladder7 work with startups, SMBs, or larger organisations?',
    answer:
      'We work with businesses of all sizes — from funded startups and fast-growing SMBs to established brands expanding across new markets. We actively serve clients across India, the UAE, Saudi Arabia, Singapore, the UK, and the USA, with delivery tailored to the specific needs, budgets, and growth stages of each organisation.',
  },
  {
    id: '03',
    tag: 'AI & Data Security',
    question: 'How does Ladder7 approach AI and intelligent website implementation?',
    answer:
      'We take a practical, outcome-driven approach to AI. This includes building secure AI chatbots on LLM and RAG architectures, deploying intelligent website personalisation based on real-time visitor behaviour, and developing autonomous multi-agent systems for operational automation — all grounded in privacy-first data security and regional compliance standards (GDPR, DPDP Act, UAE AI Policy, and Singapore PDPA).',
  },
  {
    id: '04',
    tag: 'Proprietary Products',
    question: 'How do products like Site 360, L7 Nexus, and L7 Insights integrate with our current stack?',
    answer:
      'Each product is engineered to end in an action rather than a static report. Site 360 audits your live website across 12 lenses and pushes revenue-ranked fixes directly into Jira and Azure DevOps. L7 Nexus unifies WhatsApp, SMS, Email, and chat with native Salesforce and HubSpot integrations, while L7 Insights streams executive summaries straight to Slack and Microsoft Teams.',
  },
];

