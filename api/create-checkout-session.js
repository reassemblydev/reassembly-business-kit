// Serverless Stripe Checkout endpoint (Vercel / Netlify Functions / any Node host).
// Deploy at the path the page calls: /api/create-checkout-session
//
// Env vars required (NEVER put these in the HTML):
//   STRIPE_SECRET_KEY = sk_live_…    (or sk_test_… while testing)
//   PRICE_BUSINESS_KIT = price_…     (Stripe Dashboard → Products → Business Kit 1.0 → API ID)
//   SITE_URL = https://reassembly.co
//
// npm i stripe

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

const SITE = process.env.SITE_URL || "https://reassembly.co";

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", SITE);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const quantity = Math.min(Math.max(parseInt(body.quantity, 10) || 1, 1), 5);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.PRICE_BUSINESS_KIT, quantity }],
      // Deposit / split-payment alternative: use a second Price and pass it here instead.
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "company",
          label: { type: "custom", custom: "Company name" },
          type: "text",
          optional: false
        }
      ],
      metadata: { product: "business-kit-1.0" },
      success_url: SITE + "/success.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: SITE + "/#kit"
    });

    // The page calls stripe.redirectToCheckout({ sessionId: id }) with this.
    res.setHeader("Access-Control-Allow-Origin", SITE);
    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("stripe/create-checkout-session", err);
    return res.status(500).json({ error: err.message });
  }
};
