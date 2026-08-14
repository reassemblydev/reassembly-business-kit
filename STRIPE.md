# Stripe wiring — Business Kit 1.0

## Files
- `api/create-checkout-session.js` — the endpoint the Buy button calls. Deploy to `/api/create-checkout-session`.
- `success.dc.html` — post-payment page (`success_url`). Deploy as `/success.html`.
- Cancel returns to `/#kit` on the main page.

## One-time setup
1. **Stripe Dashboard → Products** → create "Business Kit 1.0", price $4,999 one-time. Copy the Price API ID (`price_…`).
2. Deploy `api/create-checkout-session.js` (Vercel: drop the repo in, the `api/` folder is automatic).
3. Set env vars on the host:
   - `STRIPE_SECRET_KEY` = `sk_live_…`
   - `PRICE_BUSINESS_KIT` = `price_…`
   - `SITE_URL` = `https://reassembly.co`
4. In the page's Tweaks, set `stripePublishableKey` to your `pk_live_…` and leave
   `checkoutEndpoint` as `/api/create-checkout-session`.

## Flow
Buy → POST to the endpoint → Stripe creates a Checkout Session → page calls
`stripe.redirectToCheckout({ sessionId: id })` → Stripe-hosted payment → `/success.html`.

## Security
The publishable key (`pk_…`) is safe in the page. The secret key (`sk_…`) must only ever live in
the host's env vars — never in `index.dc.html`, never in git.

## Recommended next
- Add a webhook (`checkout.session.completed`) to trigger your onboarding email/CRM.
- Add a second Price for a deposit if you offer split payment; pass it as `line_items[0].price`.
