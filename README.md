# Ladder7 Web Platform

Modern, responsive web application and digital platform reconstruction for Ladder7 Nextstep Solutions.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React & Material Symbols
- **Linter:** Oxlint

## Project Structure
```text
ladder7clone/
├── public/
│   ├── favicon.svg
│   ├── logo-icon.png
│   └── images/
│       ├── hero/
│       ├── icons/
│       ├── logos/
│       └── products/
├── src/
│   ├── components/
│   │   ├── AdvisorCTA.tsx
│   │   ├── Capabilities.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSlider.tsx
│   │   ├── JourneySection.tsx
│   │   ├── ProductsShowcase.tsx
│   │   └── WhyLadder7.tsx
│   ├── data/
│   │   ├── capabilitiesData.ts
│   │   ├── faqData.ts
│   │   ├── heroSlides.ts
│   │   └── productsData.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```
