import { DEFAULT_CONTACT_EMAIL } from "./contact-email";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
};

/**
 * Optional: set RESEND_API_KEY + CONTACT_NOTIFICATION_EMAIL (and RESEND_FROM_EMAIL) on Vercel
 * so contact form submissions email Brent in addition to saving in the admin dashboard.
 */
export async function sendLeadNotificationEmail(lead: LeadPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL?.trim() ||
    process.env.SITE_CONTACT_EMAIL?.trim() ||
    DEFAULT_CONTACT_EMAIL;

  if (!apiKey) {
    return false;
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Huffman Heating Website <onboarding@resend.dev>";

  const text = [
    `New message from the Huffman Heating website`,
    ``,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    ``,
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `Website contact: ${lead.name}`,
        text,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}
