import { Star, MessageCircle } from 'lucide-react';
import Card from '../shared/Card';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';

export default function ReviewSection({ review, tradeName }) {
  if (!review) {
    return (
      <Card className="!bg-hs-cream">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FFF7ED' }}>
            <Star size={18} style={{ color: '#F5A623' }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
              How was your experience with {tradeName}?
            </p>
            <p className="text-xs mt-0.5 mb-2" style={{ color: '#566573' }}>
              Your feedback helps other homeowners and rewards great trades.
            </p>
            <a
              href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent(`Hi Emma, I'd like to leave a review for ${tradeName}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-white text-xs font-semibold active:scale-[0.98] transition-transform"
              style={{ background: '#8CC63F' }}
            >
              <MessageCircle size={14} /> Leave Review via Emma
            </a>
          </div>
        </div>
      </Card>
    );
  }

  const fields = [
    { label: 'Promptness', value: review.promptness },
    { label: 'Quality', value: review.quality },
    { label: 'Communication', value: review.communication },
    { label: 'Cleanliness', value: review.cleanliness },
  ];

  return (
    <Card>
      <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Your Review</h3>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {fields.map((f) => (
          <div key={f.label} className="rounded-lg p-2" style={{ background: '#F9FAFB' }}>
            <p className="text-[10px] font-medium" style={{ color: '#9CA3AF' }}>{f.label}</p>
            <p className="text-xs font-semibold" style={{ color: '#1F2937' }}>{f.value}</p>
          </div>
        ))}
      </div>
      {review.comment && (
        <div className="rounded-lg p-3" style={{ background: '#F9FAFB' }}>
          <p className="text-xs italic" style={{ color: '#566573' }}>"{review.comment}"</p>
        </div>
      )}
    </Card>
  );
}
