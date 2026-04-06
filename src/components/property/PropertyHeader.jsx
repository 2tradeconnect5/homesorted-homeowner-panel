import { MapPin, Calendar } from 'lucide-react';
import Badge from '../shared/Badge';
import { formatDate } from '../../utils/formatters';

export default function PropertyHeader({ property, isPremium }) {
  const ownershipStyles = {
    ACTIVE: { bg: '#EEF8E0', text: '#5A8A2A' },
    PENDING_TRANSFER: { bg: '#FFF7ED', text: '#E67E22' },
    TRANSFERRED: { bg: '#F3F4F6', text: '#9CA3AF' },
  };
  const os = ownershipStyles[property.ownership_state] || ownershipStyles.ACTIVE;

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h1 className="text-lg font-bold leading-tight" style={{ color: '#2C4459' }}>
          {property.address}
        </h1>
        {isPremium && (
          <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ background: '#F5A623' }}>
            Premium
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge label={property.eircode} bg="#EEF8E0" text="#5A8A2A" />
        <span className="text-xs" style={{ color: '#566573' }}>
          {property.property_type === 'HOUSE' ? 'House' : 'Apartment'} · {property.property_age}
        </span>
        <Badge label={property.ownership_state === 'ACTIVE' ? 'Active' : property.ownership_state} bg={os.bg} text={os.text} />
      </div>
      <div className="flex items-center gap-1 text-xs" style={{ color: '#9CA3AF' }}>
        <Calendar size={12} />
        <span>Registered {formatDate(property.registration_date)}</span>
      </div>
    </div>
  );
}
