// Helper to build wa.me deep links with pre-filled text.
// Single source of truth for the agency's WhatsApp number.

const PHONE_DIGITS = "351963869519";

export function whatsappLink(text: string): string {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}
