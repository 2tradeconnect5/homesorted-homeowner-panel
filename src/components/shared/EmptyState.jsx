import { MessageCircle } from 'lucide-react';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';

export default function EmptyState({ icon: Icon, title, message, showEmmaCta = false, emmaText = '' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: '#F3F4F6' }}
      >
        <Icon size={24} style={{ color: '#9CA3AF' }} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: '#1F2937' }}>
        {title}
      </h3>
      <p className="text-sm max-w-[280px]" style={{ color: '#566573' }}>
        {message}
      </p>
      {showEmmaCta && (
        <a
          // TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real WhatsApp number before go-live
          href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent(emmaText || 'Hi Emma!')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold active:scale-[0.98] transition-transform"
          style={{ background: '#8CC63F' }}
        >
          <MessageCircle size={16} />
          Chat with Emma
        </a>
      )}
    </div>
  );
}
