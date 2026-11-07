import { Seo } from "../../components/common/Seo";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import {
  DetailCards,
  DetailFaq,
  DetailSection,
  type DetailCard,
  type DetailFaqItem,
} from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const WHAT_IT_DOES: DetailCard[] = [
  {
    number: "01",
    title: "One-to-one writing",
    description:
      "Each email is composed for a single recipient, using their role, their company and a specific reason the message is relevant. No merge tags, no template skeleton.",
  },
  { number: "02", title: "Inbox rotation", description: "Send across multiple connected mailboxes so volume never concentrates on one domain." },
  {
    number: "03",
    title: "Warmup engine",
    description: "Builds and maintains sender reputation on every connected mailbox automatically, before and during a campaign.",
  },
  {
    number: "04",
    title: "Authentication checks",
    description: "Validates SPF, DKIM and DMARC on your sending domains, flags misconfigurations, and tells you how to fix them.",
  },
  {
    number: "05",
    title: "Address verification",
    description: "Filters invalid and risky addresses before a send, so bounce rates stay low and your reputation survives.",
  },
  {
    number: "06",
    title: "Reply handling",
    description: "Positive replies move toward a booked meeting rather than sitting in a reporting dashboard.",
  },
];

const HOW_IT_WORKS: DetailCard[] = [
  { number: "01", title: "Connect your mailboxes.", description: "Add one or several. The warmup engine starts building sender reputation immediately." },
  {
    number: "02",
    title: "Confirm your authentication.",
    description: "Outreach Engine checks SPF, DKIM and DMARC and tells you what is misconfigured before a single email goes out.",
  },
  { number: "03", title: "Add your prospects.", description: "Addresses are verified, and the risky ones are removed rather than sent to." },
  { number: "04", title: "Review the drafts.", description: "Each one is written for its recipient. Edit or approve." },
  { number: "05", title: "Take the replies.", description: "Deliverability keeps running in the background while you have conversations." },
];

const FAQ: DetailFaqItem[] = [
  {
    question: "What is Outreach Engine?",
    answer:
      "A B2B email outreach platform from Ladder7 NextStep Solutions. It writes each email for one recipient rather than filling a template, and runs the deliverability stack behind it: inbox rotation, automatic warmup, SPF, DKIM and DMARC validation, and address verification.",
  },
  {
    question: "Is this a cold email tool?",
    answer:
      "No. Cold email tools send one message to a list. Outreach Engine writes a separate email for each prospect, built on a specific reason the message is relevant to that person, which is what earns a reply rather than a spam report.",
  },
  {
    question: "How is deliverability handled?",
    answer:
      "Through four mechanisms working together: multiple connected mailboxes with rotation, an automatic warmup engine that builds sender reputation, validation of your SPF, DKIM and DMARC records, and verification of every address before a send.",
  },
  {
    question: "Does it find leads for me?",
    answer:
      "Not yet. Intelligent Lead Identification is in development and will surface right-fit prospects automatically. Today you bring the prospects and Outreach Engine writes and sends to them.",
  },
  { question: "What is it measured on?", answer: "Replies and booked calls. Emails sent is not a success metric." },
  { question: "Who built it?", answer: "Ladder7 NextStep Solutions, which also builds Site 360 and L7 Nexus." },
  { question: "How do I get access?", answer: "It is in limited beta. Request access and the team will be in touch." },
];

/** Outreach Engine — the one-to-one B2B email product, then the standard enquiry CTA. */
export default function OutreachEnginePage() {
  return (
    <>
      <Seo page="productOutreachEngine" />
      <LandingHero
        eyebrow="Outreach Engine"
        title="B2B email written one at a time"
        description="Outreach Engine is a B2B email outreach platform."
        image={{ name: "photos/product-outreach-dashboard", alt: "", caption: "Outreach Engine" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The Problem" title="Cold email is broken. Warm outreach is not." light>
          <p>
            Every B2B inbox now receives the same morning delivery: identical templates with a first name dropped in, a subject line built from
            a formula, and a "just circling back" three days later. Recipients recognise the pattern in under a second and delete on sight.
          </p>
          <p>
            The problem was never email. It was volume pretending to be attention. Reply rates fell because the messages stopped being worth
            reading, and no amount of extra sending fixes that.
          </p>
        </DetailSection>
        <DetailSection eyebrow="What it does" title="Written for one person, sent by real infrastructure">
          <p>
            Most tools give you good copy or good deliverability. The copy tools produce something worth reading that lands in spam. The
            deliverability tools land a template nobody answers. Both halves have to work.
          </p>
          <DetailCards items={WHAT_IT_DOES} />
        </DetailSection>
        <DetailSection eyebrow="The standard" title="If it reads like a template, it does not ship" light>
          <p>
            The bar is simple: an email should read the way it would if you had written it yourself, on a Tuesday, to one person you had a
            reason to contact. That means no formulaic openers, no borrowed urgency, and no phrasing that exists because it performs well in
            aggregate.
          </p>
          <p>Personalisation here means the reason the email is relevant, not the recipient's first name in a subject line.</p>
        </DetailSection>
        <DetailSection eyebrow="What is coming" title="Finding the leads, not just writing to them">
          <p>
            Intelligent Lead Identification is in development. It will surface right-fit prospects for your business automatically and hand
            each one to the writing engine, closing the loop from discovery to booked call.
          </p>
          <p>Today the platform writes and sends to the prospects you bring it. That is the honest state of it.</p>
        </DetailSection>
        <DetailSection eyebrow="PRODUCT DETAILS" title="How it works" light>
          <DetailCards items={HOW_IT_WORKS} />
        </DetailSection>
        <DetailSection eyebrow="PRODUCT DETAILS" title="Who it is for">
          <p>
            The people who live and die by pipeline: B2B founders doing their own selling, sales teams and SDRs, agencies running outreach for
            clients, and consultants who need conversations rather than another dashboard of unopened sends.
          </p>
          <p className="detail-emphasis">Works alongside L7 Nexus, which decides who is worth talking to and cannot send email itself.</p>
        </DetailSection>
        <DetailSection eyebrow="A LITTLE MORE CLARITY" title="Good questions.">
          <DetailFaq items={FAQ} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
