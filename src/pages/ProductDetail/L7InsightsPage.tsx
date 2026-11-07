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

const CONNECT_JOIN_CHART: DetailCard[] = [
  {
    number: "01",
    title: "Connect a source.",
    description: "Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP, or a CSV or Excel upload. Each one syncs into a table, with column types inferred as it lands.",
  },
  {
    number: "02",
    title: "Join across sources.",
    description:
      "Pick two tables and the columns that connect them. The join becomes a virtual data source, with colliding column names prefixed automatically so nothing is silently overwritten.",
  },
  {
    number: "03",
    title: "Build the dashboard.",
    description: "A joined source behaves exactly like a single-table source, so every chart, page and section works on it with no special handling.",
  },
];

const DESIGN_DECISIONS: DetailCard[] = [
  {
    number: "01",
    title: "Nothing is ever applied without you confirming it.",
    description: "Every suggestion has to be confirmed, edited or rejected. There is no automatic mode, and that is a deliberate choice rather than a missing setting.",
  },
  {
    number: "02",
    title: "This is not a language model guessing at your schema.",
    description: "It is column name and type matching with a score you can see. Predictable, inspectable, and the same answer every time.",
  },
  {
    number: "03",
    title: "A type match with no name signal is never suggested.",
    description: "Two integer columns are not evidence of anything. Surfacing those would bury the real matches in noise, so they are left out.",
  },
  {
    number: "04",
    title: "Ambiguity is shown, not resolved.",
    description: "When two columns are similarly plausible, you see both candidates and choose. L7 Insights does not pick for you.",
  },
];

const FAQ: DetailFaqItem[] = [
  {
    question: "What is L7 Insights?",
    answer:
      "A dashboard tool that connects the systems you already use, joins tables across them, and builds charts on the joined result. Connectors include Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP, and CSV or Excel upload.",
  },
  {
    question: "Which data sources can I connect?",
    answer: "Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP, and CSV or Excel uploads. Each connected source syncs into a table you can chart or join.",
  },
  {
    question: "Do I need to write SQL?",
    answer:
      "No. You choose the tables and the columns that connect them, and L7 Insights generates the join. The joined result then behaves like any other data source in the dashboard builder.",
  },
  { question: "How many tables can one joined view use?", answer: "Two today. Support for chaining a third is in development." },
  {
    question: "Will it join my tables automatically?",
    answer:
      "No, and it is not designed to. Suggested relationships are in development, and even then every suggestion has to be confirmed, edited or rejected before it is used. Nothing is applied without you.",
  },
  {
    question: "Does it query my warehouse live?",
    answer: "No. Data syncs into your workspace and joins run there, so a dashboard refresh does not hit your production systems.",
  },
  {
    question: "What happens if a source changes?",
    answer: "If a re-sync renames or drops a column a join depends on, L7 Insights flags the broken relationship rather than letting charts return incorrect results.",
  },
];

/** L7 Insights — the connect-join-chart dashboard product, then the standard enquiry CTA. */
export default function L7InsightsPage() {
  return (
    <>
      <Seo page="productL7Insights" />
      <LandingHero
        eyebrow="L7 Insights"
        title="One view across the systems you already use"
        description="L7 Insights turns data you already have into dashboards. Connect Google Sheets, BigQuery, Snowflake, Zoho, SharePoint, SAP or a CSV, and each source becomes a table you can chart."
        image={{ name: "photos/team-whiteboard-session", alt: "", caption: "L7 Insights" }}
      />
      <div id="page-content">
        <DetailSection eyebrow="The Problem" title="The numbers exist. They just live apart." light>
          <p>
            Your orders are in one system, your customers in another, and the thing you actually want to know sits in the gap between them.
            Answering it means exporting both, matching them by hand in a spreadsheet, and repeating the whole exercise next month.
          </p>
          <p>
            The alternative has usually been a data engineering project: a warehouse, a modelling layer, a pipeline, and a quarter of somebody's
            time before the first chart appears.
          </p>
        </DetailSection>
        <DetailSection eyebrow="What it does" title="Connect, join, chart">
          <DetailCards items={CONNECT_JOIN_CHART} />
          <p>Joins run as plain SQL against data already synced into your workspace. There is no live query hitting your production Snowflake every time a chart refreshes.</p>
        </DetailSection>
        <DetailSection eyebrow="In development" title="Suggested relationships, and why they will ask before acting" light>
          <p>Today you tell L7 Insights which columns connect. The next release proposes them.</p>
          <p>
            When you select two or three sources, L7 Insights compares their columns and puts forward the pairs that look related, each with a
            plain-language reason and a confidence signal. orders.customer_id matching customers.id is the ordinary case, and it comes with the
            reason attached rather than as a black-box verdict.
          </p>
          <p>Four design decisions are worth stating plainly, because they are what makes the feature trustworthy rather than merely clever:</p>
          <DetailCards items={DESIGN_DECISIONS} />
          <p>Reject a suggestion and it stays rejected. It will not reappear after the next sync.</p>
          <p>Detection reads column metadata only, never row values, so it costs the same on a fifty-row table as on a fifty-million-row one.</p>
        </DetailSection>
        <DetailSection eyebrow="When things change" title="Sources drift, and you find out from us">
          <p>
            A source you connected last month can arrive next week with a column renamed or dropped. When that happens to a join you rely on,
            L7 Insights tells you the relationship is broken rather than letting a chart quietly return the wrong number.
          </p>
          <p>Where a joined column has mismatched types, the generated SQL casts explicitly rather than failing when someone opens the dashboard.</p>
        </DetailSection>
        <DetailSection eyebrow="Who it is for" title="Teams whose data has outgrown a spreadsheet but not yet earned a data engineer." light>
          <p>
            Operations leads reconciling two systems by hand every month, finance teams whose numbers live in an ERP and a Sheet, and agencies
            reporting across a client's stack.
          </p>
          <p className="detail-emphasis">Works alongside Site 360, which grades your website, and L7 Nexus, whose finance executive reads the numbers you record here.</p>
        </DetailSection>
        <DetailSection eyebrow="A LITTLE MORE CLARITY" title="Good questions.">
          <DetailFaq items={FAQ} />
        </DetailSection>
      </div>
      <ContactSection headingLevel="h2" />
    </>
  );
}
