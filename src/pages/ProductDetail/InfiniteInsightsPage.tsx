import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import {
  DetailCards,
  DetailFaq,
  DetailList,
  DetailSection,
  type DetailCard,
  type DetailFaqItem,
} from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const WHAT_IT_DOES: DetailCard[] = [
  { number: "01", title: "Connect your accounts.", description: "Meta, Google Ads, LinkedIn and GA4, each authorised once and synced on a schedule." },
  {
    number: "02",
    title: "Attribute across channels.",
    description: "One model counts each conversion once and shows which channel actually earned it, not just the one that clicked last.",
  },
  {
    number: "03",
    title: "Watch the signals.",
    description: "Pixels, the conversions API and GA4 events are monitored, so a broken tag is flagged the day it breaks rather than at month end.",
  },
  { number: "04", title: "Act on the recommendation.", description: "Each report ends with where budget is working and where it is not, in plain language." },
];

const WHO_IT_IS_FOR = [
  "Marketing teams reconciling Meta, Google and LinkedIn by hand every month",
  "Founders running their own paid acquisition who need one honest number",
  "Agencies reporting cross-channel performance to clients",
  "Anyone who has watched last-click hand all the credit to the final ad",
];

const FAQ: DetailFaqItem[] = [
  {
    question: "What is Infinite Insights?",
    answer:
      "An AI-powered marketing analytics platform that unifies Meta, Google Ads, LinkedIn and GA4 into one dashboard, with cross-channel attribution, signal health monitoring and campaign performance reporting.",
  },
  {
    question: "Which channels does it connect?",
    answer: "Meta, Google Ads, LinkedIn and GA4 today. Each is authorised once and synced on a schedule.",
  },
  {
    question: "What is cross-channel attribution?",
    answer: "One model that counts each conversion once and shows which channel actually earned it, rather than every platform claiming the same sale inside its own walls.",
  },
  {
    question: "What is signal health monitoring?",
    answer: "A continuous check that your pixels, conversions API and GA4 events are still firing, so a broken tag is flagged the day it breaks rather than discovered at month end.",
  },
  {
    question: "Does it move my budget for me?",
    answer: "No. It recommends where budget is working and where it is not, and you decide. Nothing is changed in your ad accounts without you.",
  },
  { question: "Who builds it?", answer: "Ladder7 NextStep Solutions, which also builds Site 360, L7 Nexus, Outreach Engine and L7 Insights." },
];

/** Infinite Insights — the cross-channel ad analytics product, then the standard enquiry CTA. */
export default function InfiniteInsightsPage() {
  return (
    <>
      <Seo page="productInfiniteInsights" />
      <LandingHero
        eyebrow="Infinite Insights"
        title="Every ad channel in one marketing analytics view"
        description="Infinite Insights is an AI-powered marketing analytics platform."
        image={{ name: "photos/product-insights-dashboard", alt: "", caption: "Infinite Insights" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The Problem" title="Last-click is lying, and every channel takes the credit" light>
          <p>
            Meta says it drove the sale. Google says it did. LinkedIn says it did. Each platform reports inside its own walls, counts the same
            conversion, and hands you numbers that add up to more than you actually sold.
          </p>
          <p>So the monthly report becomes an export from each platform, pasted into a spreadsheet, reconciled by hand, and already stale by the time anyone reads it.</p>
        </DetailSection>
        <DetailSection eyebrow="What it does" title="Connect the channels, see one version of the truth">
          <DetailCards items={WHAT_IT_DOES} />
        </DetailSection>
        <DetailSection eyebrow="Signal health" title="A broken pixel is caught the day it breaks" light>
          <p>
            Most attribution is wrong for a boring reason: the tracking quietly stopped firing. Infinite Insights checks that your Meta pixel,
            conversions API, Google tags and GA4 events are still reporting, and tells you the moment one goes dark, before a month of spend is
            measured against nothing.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Who it is for" title="Anyone spending on more than one ad channel and unable to say which one is working.">
          <DetailList items={WHO_IT_IS_FOR} />
          <p className="detail-emphasis">Works alongside L7 Insights, which joins your business data, and Outreach Engine, which books the calls this spend is meant to create.</p>
        </DetailSection>
        <DetailSection eyebrow="A LITTLE MORE CLARITY" title="Good questions.">
          <DetailFaq items={FAQ} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
