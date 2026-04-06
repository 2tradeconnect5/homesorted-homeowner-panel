import { MessageCircle } from 'lucide-react';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';

export default function EmmaFloatingButton() {
  return (
    <a
      // TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real WhatsApp number before go-live
      href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma!')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-[0.95] transition-transform md:bottom-6 md:right-6"
      style={{ background: '#8CC63F' }}
      aria-label="Chat with Emma on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" />
    </a>
  );
}
