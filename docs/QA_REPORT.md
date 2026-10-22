# Ladder7 — Verification ledger (dev branch)

## Source/build scope
- Source of truth audited: `main` commit `45dbbf4`.
- Original `main` files were not written to.
- Initial `dev` head equalled `main` and was the exclusive write target.
- Framework retained: React 19, TypeScript, Vite 8, Tailwind 3, existing content modules.
- No new runtime dependencies introduced.
- Code validation workflow: `.github/workflows/validate.yml` runs `npm ci`, `npm run build` (including TS typecheck) and `npm run lint` on pushes to dev.

## Implemented and source-reviewable
- Single cohesive wireframe network SVG controlled by native scroll progress.
- Geometric interpolation of paths between network and a hand; no solid 3D sculptures.
- Perspective shifts across page sections, with reverse scroll recomputing geometry.
- Exactly 5 recognizable fingers as separately constructed polyline groups in FAQ.
- A line-drawn question mark in FAQ; two mirrored outlines for contact.
- Native scrolling without scroll lock/snap, cleanup of listeners and requestAnimationFrame.
- Reduced-motion static gesture configuration and CSS transition suppression.
- Semantic headings, focus styling, skip link, mobile drawer escape handling.
- Product tabs with arrow-key support, controls, accessible FAQ, service disclosures.
- Responsive tablet/mobile breakpoints; phone, mailto and external social links.
- Original content and image assets retained.

## Validation to complete / cannot assert from source code alone
- Browser screenshots and desktop/tablet/mobile visual inspection.
- Screen reader audit and automated accessibility scanner.
- Real-world Lighthouse/Core Web Vitals.
- Contact email-client interoperability, external link availability.
- Live website comparison and local teammate reference inspection.
- Exact quality/correctness of all gestures in actual devices.

Do not describe the website as fully production-validated until all checks above pass.
