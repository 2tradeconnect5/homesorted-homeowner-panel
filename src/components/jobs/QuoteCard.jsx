import { ShieldCheck, Clock } from 'lucide-react';
import Card from '../shared/Card';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';

export default function QuoteCard({ quote }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
              {quote.trade_name}
            </p>
            {quote.trade_verified && (
              <ShieldCheck size={14} style={{ color: '#5A8A2A' }} />
            )}
          </div>
          <p className="text-xl font-bold" style={{ color: '#2C4459' }}>
            {formatCurrency(quote.estimated_cost)}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#566573' }}>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {quote.estimated_duration}
            </span>
            <span>{formatRelativeTime(quote.submitted_at)}</span>
          </div>
        </div>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold shrink-0"
          style={{ background: '#F3E8FF', color: '#7C3AED' }}
        >
          {quote.status}
        </span>
      </div>
    </Card>
  );
}
