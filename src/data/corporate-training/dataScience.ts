import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Data Science — content from corporate-training-kerala--data-science.html. */
export const DATA_SCIENCE: TrainingCourse = {
  title: "Data Science",
  description: "Data Science training shaped around your team. 6–15 per batch. On-site or Virtual.",
  facts: [
    "Data Science & ML Basics",
    "6–15 per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-python-code",
  program: [
    "A lot of teams have someone who can run a Jupyter notebook but couldn't tell you why a model is underperforming. This program starts there: with the reasoning behind the code, not just the code.",
    "We work through real datasets rather than the classic Titanic or Iris examples, in whichever language your team already leans on, Python or R. By the end, the goal isn't a certificate. It's a small project your team built and can explain line by line.",
  ],
  curriculum: [
    { number: "01", title: "Data Handling", description: "Cleaning, structuring and exploring real datasets before any modeling starts." },
    { number: "02", title: "ML Basics", description: "Core algorithms (regression, classification, clustering) explained with working code." },
    { number: "03", title: "Python/R Implementation", description: "Hands-on implementation in whichever language your team already leans on." },
    { number: "04", title: "Evaluating Models", description: "How to tell if a model is actually good, not just how to build one." },
  ],
  audience: [
    "Analysts who want to move from spreadsheets into modeling",
    "Developers picking up data science as a second skill",
    "Teams starting their first internal ML project",
  ],
  outcomes: [
    "A small end-to-end ML project your team built together",
    "Comfort choosing Python or R depending on the task",
    "A realistic sense of what ML can and can’t do for your use case",
  ],
  faq: [
    {
      question: "Can we use our own company data in the training?",
      answer: "Yes, and it's the best version of this program, under NDA if required. If sharing data isn't possible, we use realistic public datasets from your industry rather than toy examples.",
    },
    {
      question: "Our team knows Excel but not Python. Is this too advanced?",
      answer: "No. The program starts with data handling fundamentals and assumes analyst-level comfort with data, not programming. Teams coming from Excel are the most common starting point.",
    },
    {
      question: "Does this cover deep learning or generative AI?",
      answer: "This track covers classical ML: regression, classification, clustering and evaluation, which is where most business use cases and most team gaps actually are. For generative AI and LLM skills, see our Prompt Engineering & AI at Work track.",
    },
  ],
};
