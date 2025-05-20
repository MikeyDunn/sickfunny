This site is built to be **ultra-fast, minimal, static, and beautiful without bloat**.

## Core Principles

- **Speed first.** Every decision prioritizes page load performance and rendering speed.
- **Zero backend.** No server-side logic, no databases. Everything is prebuilt.
- **No JS unless essential.** Avoid JavaScript unless it's required for true functionality.
- **Markdown content.** Blog posts and pages should be written in plain Markdown.
- **System fonts only.** Use the system font stack for instant rendering and no font loading.
- **Git is the source of truth.** Content, styling, and structure are all versioned and controlled via Git. Changes should be made via commits, not live editors or headless CMSes.

## Styling Rules

- Use `system-ui` font stack with font smoothing for best native appearance.
- CSS should remain minimal and lean. Prefer embedded styles or small custom files over libraries.
- Favicon and apple-touch-icon must exist to avoid 404s.
- Avoid CSS frameworks unless they are surgically scoped and justified.

## HTML / Templating

- Use Nunjucks (`.njk`) templating system.
- Shared layout resides in `_includes/layout.njk`.
- Manually define meta and Open Graph tags in layout or frontmatter. Avoid over-relying on SEO plugins unless dealing with scale.
- Sitemap and robots.txt must be manually reviewed when structure or URLs change.
- Maintain a styled 404 page.
- Canonical URLs should be defined for all indexable pages.

## Image Handling

- All images are locally hosted.
- Use `@11ty/eleventy-img` for responsive generation:
  - Output AVIF, WebP, and JPEG
  - Resize to multiple widths
  - Lazy load and use async decoding
- Avoid embedding externally hosted images unless explicitly temporary.

## Build Process

- The build process must include:
  - Static site generation (Eleventy)
  - Responsive image generation
  - Critical CSS inlining (using the CLI, not plugin, for better control)
  - HTML minification
- We use the CLI version of `critical` for finer control and sequencing.

## Deployment

- Static site is deployed to S3 using GitHub Actions.
- Only `_site/` should be deployed.
- Assume CloudFront or similar CDN is configured externally.
- Site must remain fully functional in a cold cache state (no reliance on previously loaded assets).

## Plugin Philosophy

- Prefer **manual implementations** when they offer:
  - More control
  - Better visibility into behavior
  - Reduced dependencies
- Do not use plugins that add overhead without meaningful speed or simplicity improvements.
- Review each plugin’s cost in file size, build time, and output size before inclusion.

## Acceptable Enhancements

- HTML minification
- Critical CSS inlining (via CLI)
- Responsive images with `@11ty/eleventy-img`
- Lazy loading assets
- Preloading essential assets
- Accessibility improvements
- Clean semantic markup

## Things to Avoid

- External fonts (Google Fonts, Adobe Fonts, etc.)
- Analytics/tracking scripts (unless privacy-first and lightweight)
- CSS or JS frameworks
- SEO/meta plugins that override manual control
- Any runtime or backend features

## Voice & Tone

- Slightly irreverent, clean, brutally fast.
- “Looks like it was made by someone who knew exactly what they were doing, and didn’t care about fluff.”

## Maintenance Guidelines

- All edits must go through Git — Git history is our changelog.
- Feature requests should be compared against this document before implementation.
- Always consider performance, maintainability, and visual simplicity first.

## Guideline Change Policy

If any future feature request, change, or enhancement conflicts with an existing rule in this document, the implementation should **pause and confirm** whether the rule should be updated.

This ensures the philosophy and standards of the site remain consistent, intentional, and up to date.

If a change is accepted, this file (`SITE_PROMPT.md`) should be updated to reflect the new rule or exception, so future development remains aligned.
