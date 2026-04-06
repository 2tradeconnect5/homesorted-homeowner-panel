import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockWarranties } from '../../data/mockWarranties';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import EmptyState from '../shared/EmptyState';
import { formatDate } from '../../utils/formatters';
import { getCategoryLabel, getWarrantyStatus } from '../../utils/helpers';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';
import { ArrowRight } from 'lucide-react';

const statusStyles = {
  ACTIVE: { bg: '#EEF8E0', text: '#5A8A2A', label: 'Active' },
  EXPIRING_SOON: { bg: '#FFF7ED', text: '#E67E22', label: 'Expiring Soon' },
  EXPIRED: { bg: '#FEE2E2', text: '#DC2626', label: 'Expired' },
};

export default function WarrantiesTab({ eircode }) {
  const { homeowner } = useAuth();
  const warranties = mockWarranties
    .filter((w) => w.property_eircode === eircode)
    .map((w) => ({ ...w, computedStatus: getWarrantyStatus(w.warranty_expiry_date) }))
    .sort((a, b) => new Date(a.warranty_expiry_date) - new Date(b.warranty_expiry_date));

  if (warranties.length === 0) {
    return (
      <EmptyState
        icon={Shield}
        title="No warranties tracked"
        message="After a job, ask your trade about warranty details."
      />
    );
  }

  return (
    <div className="space-y-3">
      {warranties.map((w) => {
        const s = statusStyles[w.computedStatus] || statusStyles.ACTIVE;
        return (
          <Card key={w.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: s.bg }}
                >
                  <Shield size={18} style={{ color: s.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                    {w.description}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
                    {w.trade_name} — {getCategoryLabel(w.category)}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                    Expires {formatDate(w.warranty_expiry_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge label={s.label} bg={s.bg} text={s.text} />
                {w.computedStatus === 'EXPIRING_SOON' && (
                  <AlertCircle size={16} style={{ color: '#E67E22' }} />
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {!homeowner?.is_premium && (
        <Card className="!bg-hs-cream">
          <p className="text-sm font-medium mb-1" style={{ color: '#2C4459' }}>
            Get reminded automatically
          </p>
          <p className="text-xs mb-2" style={{ color: '#566573' }}>
            Premium members get WhatsApp reminders before warranties expire.
          </p>
          <a
            href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Tell me about HomeInsight Premium')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: '#8CC63F' }}
          >
            Learn about Premium <ArrowRight size={12} />
          </a>
        </Card>
      )}
    </div>
  );
}
