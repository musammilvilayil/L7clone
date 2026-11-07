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

const FIRST_TEN_MINUTES: DetailCard[] = [
  { number: "01", title: "Sign up.", description: "" },
  { number: "02", title: "Give your website URL.", description: "(vision and mission optional)" },
  {
    number: "03",
    title: "Ladder7 crawls the site, extracts what it finds, scores its own confidence, and classifies the industry.",
    description: "(unattended)",
  },
  { number: "04", title: "You answer no more than seven questions.", description: "(about 2 minutes, asynchronous, 24h timeout)" },
  { number: "05", title: "It builds your company brain.", description: "(unattended)" },
  { number: "06", title: "It delivers a diagnostic.", description: "" },
  { number: "07", title: "It recommends an executive team.", description: "" },
];

const BOARD_REVIEW_RETURNS = [
  "Where the business stands, in three sentences",
  "At least two findings that only show up across desks, meaning they took more than one report to see",
  "One decision, with the trade-off stated and a recommendation",
  "What she is asking each named executive to do, and by when",
  "The single number that will say first if this is going wrong",
];

const COMPANY_BRAIN_LIST = [
  "Downloadable at any time, during a lease, after one, and after cancelling.",
  "Obsidian-compatible, so you open it in a tool you already trust.",
  "Bidirectional git sync. Edit a note on your laptop, push, and your executives change behaviour on the next run.",
  "Nothing is ever deleted. Retired notes are marked superseded and stay in the vault, in git, and in every export.",
];

const FAQ: DetailFaqItem[] = [
  {
    question: "What is L7 Nexus?",
    answer:
      "A leased AI executive team. It builds a permanent company brain from your website, runs ten named executives and fifty specialists against it, and returns one decision per board review.",
  },
  {
    question: "Will it make things up?",
    answer:
      "Every mandate forbids presenting a number it cannot source, and every brief ends with what it could not determine and the cheapest way to close that gap. You can see which questions stayed open rather than guessing which sentences were invented.",
  },
  {
    question: "Do I own my data, or am I locked in?",
    answer: "You own it. The brain is markdown in a folder you can download right now and open in Obsidian. Leaving costs you nothing but the executives.",
  },
  {
    question: "Can it email my customers or change my accounting records?",
    answer:
      "No. The only email that ships goes to the account owner, and its recipient is resolved on the server, so there is no address field an injected web page could reach. No integration writes to your books or your CRM today.",
  },
  {
    question: "How much does a board review cost to run?",
    answer: "Roughly $10 to $25 for a full review, meaning ten agent loops plus their specialist benches. Today every account runs them free.",
  },
  {
    question: "Who is L7 Nexus not for?",
    answer: "Anyone looking for a general-purpose chatbot, and any business with nothing recorded yet for the brain to learn from.",
  },
];

/** L7 Nexus — the leased AI executive team product, then the standard enquiry CTA. */
export default function L7NexusPage() {
  return (
    <>
      <Seo page="productL7Nexus" />
      <LandingHero
        eyebrow="L7 Nexus"
        title="An AI executive team for your business"
        description="L7 Nexus is a leased AI executive team for businesses of any size. It reads your website, builds a permanent company brain you own as plain markdown files, then puts ten named executives and fifty specialists to work on it."
        image={{ name: "photos/product-dashboard-nocode", alt: "", caption: "L7 Nexus" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="Board review, run log" title="9 desks filed" light>
          <p>
            Who asked whom, taken from a board review run log. The names are executives, not people. An executive can only ask its own team,
            and delegation stops two levels down.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The first ten minutes" title="How does it work in the first ten minutes?">
          <p>One input, and the rest runs unattended. Every step except your two minutes targets under ten minutes.</p>
          <DetailCards items={FIRST_TEN_MINUTES} />
          <p>
            We do not ask you what industry you are in. Your website already says. Ladder7 reads it the way a good consultant would, reaches a
            conclusion, and reaches it again from scratch whenever your site changes or you ask it to look again.
          </p>
          <p>
            There is no dropdown, because asking an owner whether they are "professional services" or "trades" is asking them to translate
            their business into our vocabulary, and a wrong answer would then carry the highest trust in the system. If you never answer the
            seven questions, the system proceeds and flags the gaps rather than hanging.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The org chart" title="Ten executives, each with a written mandate" light>
          <p>
            Most AI products give you one assistant. This gives you a company. Each executive has an explicit scope, defined hand-offs and a
            deliverable specification.
          </p>
          <p>
            Behind those ten sit fifty specialists across eleven divisions: a cash forecaster, a lead qualifier, a pipeline keeper, a churn
            analyst and the rest. An executive can ask its own specialists for depth, and the answer comes back to the executive, who stays
            responsible for it.
          </p>
          <p>
            Four rules keep that from becoming a free-for-all. An executive can only ask its own team, resolved from the org chart at call
            time rather than from the model's request. Delegation is capped at two levels. A delegated run shares the caller's budget, so an
            executive that delegates five times has spent its own allowance rather than five more. And delegation can never raise permissions.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The board review" title="What does a board review give you?">
          <p>Ten agent loops plus their specialist benches, down from roughly $25 before context and caching work. Free on every account today.</p>
          <p>Nine executives run in parallel, each working from their own division's documents and their own charter. Ada reads all nine and returns:</p>
          <DetailList items={BOARD_REVIEW_RETURNS} />
          <p>Run one whenever you like. The cost is what makes that a real offer rather than a marketing line.</p>
        </DetailSection>
        <DetailSection eyebrow="The comparison" title="How is this different from a fractional executive or a chatbot?" light>
          <p>
            The short answer: an org chart that delegates, a permission model, a permanent brain that is yours, and a board review that
            returns one decision instead of nine summaries.
          </p>
        </DetailSection>
        <DetailSection eyebrow="The company brain" title="The brain is yours, not exportable on request">
          <p>Everything your executives learn lives in a folder of plain markdown files that belong to you.</p>
          <DetailList items={COMPANY_BRAIN_LIST} />
          <p className="detail-emphasis">Every fractional executive you have hired walked out with what they learned. This one does not.</p>
        </DetailSection>
        <DetailSection eyebrow="The honesty rule" title="It tells you what it could not determine" light>
          <p>
            An agent that never says "I could not find this" is an agent filling gaps, and you would have no way of telling which sentences
            those were.
          </p>
          <p>
            Every brief ends with a mandatory section: what the executive could not determine, the gap that would most improve the next
            report, and the cheapest way to close it. Every mandate also carries one rule, which is never to present a number it cannot
            source.
          </p>
        </DetailSection>
        <DetailSection eyebrow="Safety and control" title="Nothing irreversible happens without you">
          <p>Every action is classified by blast radius, and permission attaches to the action rather than to the agent.</p>
          <p>
            Content crawled from a third-party site is marked untrusted, is never placed into a system prompt, and any action in a run that
            touched it is escalated to T2 at minimum regardless of its normal tier. There is also a monthly spend cap per account, enforced
            before any model call. Executives earn the right to act unsupervised on low-risk work by building a track record you can see,
            with a mandatory 10 percent audit sample so the signal never dies, and never on the risky kind.
          </p>
        </DetailSection>
        <DetailSection eyebrow="A LITTLE MORE CLARITY" title="Good questions.">
          <DetailFaq items={FAQ} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
