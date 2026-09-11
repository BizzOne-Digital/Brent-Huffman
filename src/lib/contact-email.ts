export const DEFAULT_CONTACT_EMAIL = "brenthuffman@huffmanheating.net";
export const DEFAULT_BUSINESS_ADDRESS = "Claremont, North Carolina";

/** Business location shown in footer/contact (not service-area cities). */
const LEGACY_BUSINESS_ADDRESSES = new Set([
  "newton, north carolina",
  "newton, nc",
  "conover, north carolina",
  "conover, nc",
]);

/** Known typos from earlier site versions / admin entry */
const LEGACY_EMAIL_ALIASES: Record<string, string> = {
  "brentuffman@huffmanheating.net": DEFAULT_CONTACT_EMAIL,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function resolvePublicContactEmail(raw?: string | null): string {
  let email = (raw ?? "").trim().toLowerCase();
  email = LEGACY_EMAIL_ALIASES[email] ?? email;
  if (!email || !EMAIL_RE.test(email)) {
    return DEFAULT_CONTACT_EMAIL;
  }
  return email;
}

export function buildMailtoHref(
  rawEmail?: string | null,
  options?: { subject?: string; body?: string }
): string {
  const email = resolvePublicContactEmail(rawEmail);
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

/** For visitors who do not have a desktop mail app configured */
export function buildGmailComposeUrl(
  rawEmail?: string | null,
  options?: { subject?: string; body?: string }
): string {
  const email = resolvePublicContactEmail(rawEmail);
  const params = new URLSearchParams({ view: "cm", to: email });
  if (options?.subject) params.set("su", options.subject);
  if (options?.body) params.set("body", options.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function resolvePublicBusinessAddress(raw?: string | null): string {
  const trimmed = (raw ?? "").trim();
  if (!trimmed || LEGACY_BUSINESS_ADDRESSES.has(trimmed.toLowerCase())) {
    return DEFAULT_BUSINESS_ADDRESS;
  }
  return trimmed;
}

export function shouldPersistBusinessAddressFix(raw?: string | null): boolean {
  const trimmed = (raw ?? "").trim();
  return !trimmed || LEGACY_BUSINESS_ADDRESSES.has(trimmed.toLowerCase());
}

export function shouldPersistEmailFix(raw?: string | null): boolean {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return true;
  return resolvePublicContactEmail(trimmed) !== trimmed.toLowerCase();
}
