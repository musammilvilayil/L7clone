import type { ImageName } from "./images.generated";

/** One course card on the Corporate Training hub (design: .catalogue-card). */
export interface TrainingCatalogueItem {
  slug: string;
  to: string;
  number: string;
  title: string;
  /** Card blurb — the design's own truncated course summary. */
  summary: string;
  image: ImageName;
}

export const CORPORATE_TRAINING_PATH = "/corporate-training-kerala";

/** The 11 corporate courses, in the hub's order (corporate-training-kerala.html). */
export const TRAINING_CATALOGUE: TrainingCatalogueItem[] = [
  {
    slug: "full-stack-development",
    to: `${CORPORATE_TRAINING_PATH}/full-stack-development`,
    number: "01",
    title: "Full Stack Development",
    summary:
      "Ladder7 delivers hands-on full stack development training for corporate teams in Kerala and virtually across India, taught on whichever stack your…",
    image: "photos/training-laptop-code",
  },
  {
    slug: "data-science",
    to: `${CORPORATE_TRAINING_PATH}/data-science`,
    number: "02",
    title: "Data Science",
    summary:
      "Ladder7 delivers hands-on data science training for corporate teams in Kerala and virtually across India: core ML fundamentals implemented in Python…",
    image: "photos/training-python-code",
  },
  {
    slug: "mobile-app-development",
    to: `${CORPORATE_TRAINING_PATH}/mobile-app-development`,
    number: "03",
    title: "Mobile Application Development",
    summary:
      "Ladder7 delivers hands-on mobile development training for corporate teams in Kerala and virtually across India, covering native Android (Java and…",
    image: "photos/training-mobile-phone",
  },
  {
    slug: "prompt-engineering-ai-training",
    to: `${CORPORATE_TRAINING_PATH}/prompt-engineering-ai-training`,
    number: "04",
    title: "AI Training",
    summary:
      "Ladder7 delivers hands-on AI training for employees, on-site in Kerala (Trivandrum, Kochi and beyond) or virtually: practical prompt engineering with…",
    image: "photos/training-ai-prompt",
  },
  {
    slug: "data-visualization",
    to: `${CORPORATE_TRAINING_PATH}/data-visualization`,
    number: "05",
    title: "Data Visualization",
    summary:
      "Ladder7 delivers hands-on data visualization training for corporate teams in Kerala and virtually across India, covering Power BI, advanced Excel,…",
    image: "photos/training-analytics-dashboard",
  },
  {
    slug: "cloud-computing-bootcamp",
    to: `${CORPORATE_TRAINING_PATH}/cloud-computing-bootcamp`,
    number: "06",
    title: "Cloud Computing Bootcamp",
    summary:
      "Ladder7 delivers a hands-on cloud computing bootcamp for corporate teams in Kerala and virtually across India, covering AWS, Azure and GCP at the…",
    image: "photos/training-server-rack",
  },
  {
    slug: "digital-content-creation",
    to: `${CORPORATE_TRAINING_PATH}/digital-content-creation`,
    number: "07",
    title: "Digital Content Creation",
    summary:
      "Ladder7 delivers hands-on content creation training for corporate marketing and comms teams in Kerala and virtually across India, covering content…",
    image: "photos/training-video-editing",
  },
  {
    slug: "business-analytics",
    to: `${CORPORATE_TRAINING_PATH}/business-analytics`,
    number: "08",
    title: "Business Analytics",
    summary:
      "Ladder7 delivers hands-on business analytics training for corporate teams in Kerala and virtually across India, covering data analysis and…",
    image: "photos/training-analytics-meeting",
  },
  {
    slug: "business-intelligence-data-analytics",
    to: `${CORPORATE_TRAINING_PATH}/business-intelligence-data-analytics`,
    number: "09",
    title: "Business Intelligence & Data Analytics",
    summary:
      "Ladder7 delivers hands-on BI and data analytics training for corporate teams in Kerala and virtually across India: connecting your actual data…",
    image: "photos/team-analytics-review",
  },
  {
    slug: "marketing-automation-crm",
    to: `${CORPORATE_TRAINING_PATH}/marketing-automation-crm`,
    number: "10",
    title: "CRM & Automation Training",
    summary:
      "Ladder7 delivers hands-on CRM and marketing automation training for corporate sales and marketing teams in Kerala and virtually across India, working…",
    image: "photos/product-outreach-dashboard",
  },
  {
    slug: "webops-ai-ml",
    to: `${CORPORATE_TRAINING_PATH}/webops-ai-ml`,
    number: "11",
    title: "WebOps & AI/ML Training",
    summary:
      "Ladder7 delivers hands-on WebOps and AI/ML training for corporate ops and infrastructure teams in Kerala and virtually across India: half the time on…",
    image: "photos/training-robot-ai",
  },
];
