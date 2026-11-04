import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Zap,
  Layers,
  GraduationCap,
  Waves,
} from 'lucide-react';
import { FACTUAL_COMPANY_DATA } from '../catalog/freshContent';
import type { BriefPreset } from '../design-system/tokens';
import DitherWave from '../components/DitherWave';

interface WhoWeServeSectionProps {
  onApplyPreset: (preset: BriefPreset) => void;
}

const CLIENT_GROUPS = [
  {
    id: 'enterprise-clients',
    group: 'Enterprises & Multi-Region Brands',
    title: 'Established Enterprises & Market Leaders',
    subtitle: 'High-Throughput Web Platforms & Private AI Architectures',
    description:
      'We build and maintain mission-critical web platforms, including Adobe Experience Manager (AEM) sites, private enterprise RAG knowledge search, and bidirectional Salesforce and HubSpot integrations with zero vendor lock-in.',
    stats: [
      { label: 'Architecture Uptime', value: '99.99%' },
      { label: 'Data Sovereignty', value: '100% RBAC' },
      { label: 'Compliance', value: 'DPDP & GDPR' },
    ],
    capabilities: [
      'Adobe Experience Manager (AEM) & Headless Web Systems',
      'Private Internal Knowledge Search with Strict Role-Based Access',
      'Bidirectional Salesforce, HubSpot & ERP Synchronization',
      'GDPR, India DPDP Act, UAE AI Policy & Singapore PDPA Compliance',
    ],
    pills: [
      'AEM Cloud',
      'Enterprise RAG',
      'Multi-VPC',
      'Zero Lock-in',
      'Audit Trails',
    ],
    badge: 'Enterprise Architecture',
    ctaText: 'Discuss Enterprise Projects',
  },
  {
    id: 'startup-clients',
    group: 'Startups & Growing SMBs',
    title: 'Funded Startups & High-Growth Companies',
    subtitle: 'Rapid Full-Stack Delivery & Autonomous AI Workflows',
    description:
      'We help funded startups and ambitious teams launch high-converting React and Next.js applications, custom customer dashboards, and automated WhatsApp, SMS, and Email pipelines that scale seamlessly from seed to Series B.',
    stats: [
      { label: 'Time to MVP', value: '< 6 Weeks' },
      { label: 'Core Web Vitals', value: '95+ Score' },
      { label: 'IP Ownership', value: '100% Direct' },
    ],
    capabilities: [
      'Conversion-Focused React & Next.js Platforms and Web Apps',
      'Automated WhatsApp, SMS & Email Inbound/Outbound Workflows',
      'Custom Billing Engines, SaaS Portals & Real-Time Dashboards',
      'Full CI/CD Pipeline Setup with Docker & Automated Testing',
    ],
    pills: [
      'React & Next.js',
      'Fast MVPs',
      'AI Workflows',
      'CI/CD Pipelines',
      'Direct Access',
    ],
    badge: 'High-Growth Tech',
    ctaText: 'Discuss Startup Projects',
  },
];

const TRAINING_TOPICS = [
  {
    icon: Layers,
    title: 'Cloud Infrastructure on AWS, Azure & GCP',
    detail:
      'Hands-on training covering cloud networking, access security, Terraform infrastructure as code, and container deployments.',
    badge: 'Multi-Cloud Architecture',
  },
  {
    icon: Zap,
    title: 'CI/CD & Automated Deployments',
    detail:
      'Setting up production-grade build and release pipelines, automated quality gates, linting, and version-controlled rollouts.',
    badge: 'DevOps & GitOps',
  },
  {
    icon: Shield,
    title: 'System Monitoring & Observability',
    detail:
      'Practical setup for application monitoring, uptime dashboards, distributed tracing, log analysis, and automated incident alerts.',
    badge: 'SRE & Monitoring',
  },
];

export const WhoWeServeSection: React.FC<WhoWeServeSectionProps> = ({
  onApplyPreset,
}) => {
  const [viewMode, setViewMode] = useState<'clients' | 'training'>('clients');

  return (
    <section id="identity" className="relative py-24 sm:py-32 bg-[#08090C] overflow-hidden">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-[#3B82F6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              Who we work with
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-[#F4F5F8] leading-[1.08] text-balance">
              Software engineering for enterprise teams and growing companies.
            </h2>
            <p className="text-sm sm:text-base text-[#A3AAB8] leading-[1.6] max-w-[62ch]">
              Tailored engineering partnerships with dedicated senior pods, transparent delivery, and zero vendor lock-in.
            </p>
          </div>

          {/* Toggle Switcher */}
          <div
            className="inline-flex rounded-full border border-white/10 bg-[#0C0E14] p-1.5 self-start lg:self-auto shadow-inner"
            role="tablist"
            aria-label="Client groups and training"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'clients'}
              onClick={() => setViewMode('clients')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'clients'
                  ? 'bg-[#3B82F6] text-[#08090C] shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'text-[#A3AAB8] hover:text-[#F4F5F8]'
              }`}
            >
              Client Partnerships
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'training'}
              onClick={() => setViewMode('training')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'training'
                  ? 'bg-[#3B82F6] text-[#08090C] shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'text-[#A3AAB8] hover:text-[#F4F5F8]'
              }`}
            >
              Cloud &amp; DevOps Training
            </button>
          </div>
        </div>

        {/* Ambient Retro Dither Wave Canvas Stage */}
        <div className="relative mb-12 rounded-2xl border border-white/15 bg-[#060709] overflow-hidden shadow-2xl">
          <div className="h-56 sm:h-64 w-full relative">
            <DitherWave
              primaryColor="#2563EB"
              secondaryColor="#3B82F6"
              tertiaryColor="#08090C"
              speed={0.75}
              intensity={1.15}
              scale={4.2}
              downScale={0.7}
              opacity={0.92}
              quality="medium"
              className="w-full h-full"
            >
              {/* Overlay Glass Vignette & Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-between p-6 sm:p-8 pointer-events-none">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08090C]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#3B82F6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span>Dither Wave • Retro 64-Matrix Flow</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#C4C9D4] font-medium hidden sm:block">
                    Real-time WebGL vector field simulation powering high-throughput architectures
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] text-[#A3AAB8] font-mono">
                    20-Step Tangent Integration
                  </span>
                  <span className="px-3 py-1 rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[11px] text-[#3B82F6] font-mono">
                    60 FPS
                  </span>
                </div>
              </div>
            </DitherWave>
          </div>
        </div>

        {/* Dynamic Content Views */}
        {viewMode === 'clients' ? (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {CLIENT_GROUPS.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0C0E14] p-7 sm:p-9 h-full flex flex-col justify-between hover:border-[#3B82F6]/40 transition-all duration-300 shadow-xl group"
              >
                  <div className="space-y-6">
                    {/* Top Header Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                        {item.group}
                      </span>
                      <span className="text-[11px] font-mono text-[#A3AAB8] tracking-wider uppercase">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Narrative */}
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] group-hover:text-[#3B82F6] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm font-medium text-[#3B82F6]/90">
                        {item.subtitle}
                      </p>
                      <p className="mt-3 text-sm text-[#A3AAB8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Metric Cards Row */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {item.stats.map((st) => (
                        <div
                          key={st.label}
                          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center"
                        >
                          <div className="font-display text-base sm:text-lg font-bold text-[#F4F5F8]">
                            {st.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-[#A3AAB8] mt-0.5 truncate">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#A3AAB8]/70 mb-2">
                        Platform Architecture &amp; Governance
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.pills.map((pill) => (
                          <span
                            key={pill}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] text-[#C4C9D4] border border-white/10"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities Checklist */}
                    <ul className="pt-4 border-t border-white/[0.08] space-y-2.5">
                      {item.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F5F8]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                          <span className="leading-snug">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[#7D8597]">
                      India · UAE · Saudi Arabia · Singapore · UK · USA
                    </span>

                    <a
                      href="#contact"
                      onClick={() =>
                        onApplyPreset({
                          serviceTrack: item.title,
                          contextLine: `Project inquiry for ${item.title}.`,
                        })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#3B82F6] text-[#08090C] hover:bg-[#4ade80] transition-colors"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div
            id="training"
            className="rounded-2xl border border-white/10 bg-[#0C0E14] p-8 sm:p-10 lg:p-12 shadow-xl animate-in fade-in duration-300"
          >
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Left 6 cols: Training Narrative & Simulation */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold border border-[#3B82F6]/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Corporate Team Training</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F5F8] leading-tight">
                    Hands-on Cloud Computing and DevOps training for engineering teams.
                  </h3>

                  <p className="text-sm sm:text-base text-[#A3AAB8] leading-relaxed">
                    We train corporate engineering teams across AWS, Azure, and GCP using practical lab exercises that cover real cloud deployments, CI/CD automation, and enterprise monitoring.
                  </p>

                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#3B82F6]">
                      <Waves className="w-4 h-4" />
                      <span>Practical Enterprise Lab Simulations</span>
                    </div>
                    <p className="text-xs text-[#A3AAB8] leading-relaxed">
                      Every module is built with real infrastructure code, live sandbox environments, and automated pull-request validation exercises.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={() =>
                        onApplyPreset({
                          serviceTrack: 'Corporate Cloud & DevOps Training',
                          contextLine:
                            'Requesting details for AWS, Azure, GCP, and DevOps corporate team training.',
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-[#3B82F6] hover:bg-[#4ade80] text-[#08090C] font-semibold text-xs sm:text-sm px-6 py-3.5 transition-colors"
                    >
                      <span>Ask About Corporate Training</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right 6 cols: Curriculum Modules */}
                <div className="lg:col-span-6 space-y-4">
                  {TRAINING_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={topic.title}
                        className="rounded-xl border border-white/10 bg-[#08090C] p-5 sm:p-6 hover:border-[#3B82F6]/40 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-[#3B82F6]" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-display text-base sm:text-lg font-bold text-[#F4F5F8]">
                                {topic.title}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-[#A3AAB8] border border-white/10">
                                {topic.badge}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#A3AAB8] leading-relaxed">
                              {topic.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
        )}

        {/* Office Locations Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h3 className="font-display text-lg font-bold text-[#F4F5F8]">
              Our Offices in Kerala
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#A3AAB8]">
              Engineering and product teams working from Cochin and Trivandrum studios.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-6 sm:gap-8">
            {FACTUAL_COMPANY_DATA.offices.map((office) => (
              <div
                key={office.city}
                className="rounded-xl border border-white/10 bg-[#0C0E14] p-5 flex items-start gap-3 hover:border-white/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <div>
                  <div className="font-display text-base font-bold text-[#F4F5F8]">
                    {office.city}
                  </div>
                  <div className="text-xs sm:text-sm text-[#A3AAB8] mt-0.5">
                    {office.venue}
                  </div>
                  <div className="text-xs text-[#7D8597] mt-0.5">
                    {office.territory}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
