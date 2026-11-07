import type { TrainingCourse } from "../../components/sections/TrainingDetailTemplate/TrainingDetailTemplate";

/** Full Stack Development — content from corporate-training-kerala--full-stack-development.html. */
export const FULL_STACK_DEVELOPMENT: TrainingCourse = {
  title: "Full Stack Development",
  description: "Full Stack Development training shaped around your team. 6–20 engineers per batch. On-site or Virtual.",
  facts: [
    "MEAN / MERN / .NET / Java / Python",
    "6–20 engineers per batch",
    "On-site or Virtual",
  ],
  image: "photos/training-laptop-code",
  program: [
    "Most companies don't need their whole engineering team retrained from scratch. They need the two or three people who are stuck between what they learned in college and what the current project actually uses. This program is built for that gap.",
    "We pick the stack based on what you're running: MEAN or MERN if you're a JavaScript shop, .NET or Java if you're on the Microsoft or enterprise side, Python with Django and MySQL if that's closer to home. The sessions are hands-on from day one; nobody's just watching slides.",
  ],
  curriculum: [
    { number: "01", title: "MEAN & MERN", description: "MongoDB, Express, Angular or React, and Node: the two stacks most teams are already shipping on." },
    { number: "02", title: ".NET", description: "C# and the .NET ecosystem for teams standardized on Microsoft tooling." },
    { number: "03", title: "Java", description: "Spring-based backend development for teams running Java in production." },
    { number: "04", title: "Python (Django, Node.js, MySQL)", description: "Django on the backend, Node.js where it fits, MySQL underneath it all." },
  ],
  audience: [
    "Engineering teams standardizing on a single stack across projects",
    "Developers moving from one framework to another, say Angular to React",
    "IT teams that hired for one stack and now need to support another",
  ],
  outcomes: [
    "A working application built end to end during the sessions, not just slides",
    "Engineers who can read and extend each other’s code across the stack",
    "A shared set of conventions your team can carry into new projects",
  ],
  faq: [
    {
      question: "Can you train our team on our own codebase?",
      answer: "Yes, where practical, and under NDA if required. Exercises can be built around scenarios that resemble your actual repositories and conventions, which is usually where the training sticks best.",
    },
    {
      question: "Our team is split between two stacks. Can one batch cover both?",
      answer: "It's usually better to run two focused batches than one diluted one, and we'll tell you honestly which your situation calls for. Migration-focused sessions (for example Angular to React) are a common middle path.",
    },
    {
      question: "How long does the program take?",
      answer: "Depends on depth: a focused framework-migration sprint can run one intensive week; a full end-to-end program typically runs multi-week around your delivery calendar. You'll get a proposed schedule with the quote.",
    },
  ],
};
