# REASSEMBLY BUSINESS KIT 1.0 — project rules

## What this is
A one-page marketing site for Reassembly (reassembly.co), selling **Business Kit 1.0**:
Brand Identity · Web Site · Social Media · Marketing Automation · Operations Automation.
Main file: `index.dc.html` (must keep the `.dc.html` suffix to stay editable).

## Brand typography (from the client's Typography.pdf)
- **Display / hero:** Bulevar Poster — `fonts/Bulevar-Poster.otf`, declared as `"Bulevar"`.
  Hero headline is uppercase, `white-space:nowrap`, and auto-fit by JS to span the full column width.
  `fonts/Bulevar-Regular.otf` is loaded as `"Bulevar Text"` (unused so far).
- **Headings:** Manufaktur italic bold per the guide — NOT licensed/web-hosted, so Archivo italic 700
  stands in via `--display`. Swap in real Manufaktur files if the client supplies them.
- **Body:** **Bould** — `fonts/bould-light.woff2` (300), `bould-regular.woff2` (400),
  `bould-medium.woff2` (500), declared as `"Bould"` via `--body`.
- Guideline metrics: body 16/140%/5% tracking · big body 20/170%/5% light · small/caption 13/140%/5%
  · h2 32 · h3 20 · h4 16 (+5%) · h5 12 (+10%) · h6 10.

## Color
CSS vars in the helmet: `--paper #F4F1EA`, `--paper2 #EAE5DA`, `--ink #1B1815`, `--ink70 #5A534C`,
`--ink40 #8E877F`, `--accent #C0552C` (rust), `--accent2 #2C7C6E`, `--line rgba(27,24,21,.14)`.
Max two background tones (paper / ink). Accent and paper are exposed as Tweaks.

## Logo
`assets/logo-rco-ink.svg` (recolored to `--ink`) in header + footer.
`assets/logo-rco-bic-blue.svg` is the original brand blue `#3D3082`.

## Copy
Tone: plainspoken. Hero: eyebrow "Digital tools & services that harness" → headline
"Attention + Efficiency". Sections: hero, what we do, process (6 weeks), case studies,
pricing + pay, testimonials, FAQ, contact, footer.
Placeholders still open: two case studies, both testimonials, the real price.
Only real case study so far: "Auto Dealership Inventory Segmentation".

## Stripe
Checkout redirect, stubbed. Tweaks: `stripePublishableKey` (pk_…) and `checkoutEndpoint`
(default `/api/create-checkout-session`, must return a Session `id`). Secret keys stay server-side —
never in this page. Until a real key is set, the button prints the wiring steps.

## Conventions
- Design Components only: single `index.dc.html`, inline styles, no CSS classes, no stylesheets
  beyond `@font-face` / resets in `<helmet>`.
- Motion: subtle reveals via IntersectionObserver in the logic class (`reveals` tweak toggles it).
- No hand-drawn SVG illustration; image placeholders are striped divs with monospace labels.
- Keep small requests small — don't redesign unrelated sections.
