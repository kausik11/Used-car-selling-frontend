import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '919874074477';
const DEFAULT_MESSAGE = 'Hello, I want to know more about available cars.';

const WhatsAppFloatButton = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white ring-1 ring-black/10 shadow-[0_0_0_6px_rgba(37,211,102,0.22),0_0_22px_rgba(37,211,102,0.75)] transition hover:bg-[#1fb85a] hover:shadow-[0_0_0_10px_rgba(37,211,102,0.28),0_0_35px_rgba(37,211,102,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
    >
      <FaWhatsapp className="text-3xl transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
    </a>
  );
};

export default WhatsAppFloatButton;
