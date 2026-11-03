import { site } from "@/content/site";

/**
 * Floating WhatsApp button, bottom-right on every marketing page.
 * Most Port Harcourt parents would rather WhatsApp than fill a form,
 * so this opens a chat with a pre-filled admissions enquiry.
 *
 * z-30 keeps it under the header (z-40), so the mobile menu covers it.
 */
const message = `Hello, I'd like to make an enquiry about ${site.name}.`;
const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export function WhatsAppButton() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] lg:bottom-8 lg:right-8"
    >
      <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7 fill-current">
        <path d="M16.04 3C9.0 3 3.28 8.72 3.28 15.76c0 2.25.59 4.45 1.71 6.39L3 29l7.03-1.94a12.7 12.7 0 0 0 6.01 1.53h.01c7.04 0 12.76-5.72 12.76-12.76S23.08 3 16.04 3Zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.17 1.15 1.11-4.07-.25-.42a10.57 10.57 0 0 1-1.62-5.6c0-5.84 4.75-10.6 10.6-10.6 5.84 0 10.6 4.76 10.6 10.6 0 5.85-4.76 10.65-10.47 10.65Zm5.81-7.94c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.08 1.3 3.3c.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="hidden pr-1 text-sm font-medium sm:inline">
        Chat with us
      </span>
    </a>
  );
}
