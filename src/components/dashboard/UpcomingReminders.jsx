import { Shield, Calendar, AlertCircle } from 'lucide-react';
import { mockWarranties } from '../../data/mockWarranties';
import { mockServiceAnniversaries } from '../../data/mockServiceAnniversaries';
import Card from '../shared/Card';
import { getCategoryLabel, getWarrantyStatus } from '../../utils/helpers';
import { formatDate } from '../../utils/formatters';

export default function UpcomingReminders() {
  const now = new Date();
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const warrantyReminders = mockWarranties.filter((w) => {
    const expiry = new Date(w.warranty_expiry_date);
    return expiry <= ninetyDaysFromNow && expiry >= now;
  });

  const serviceReminders = mockServiceAnniversaries.filter((s) => {
    const reminder = new Date(s.next_reminder_date);
    return reminder <= ninetyDaysFromNow && reminder >= now;
  });

  if (warrantyReminders.length === 0 && serviceReminders.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="section-heading">Upcoming Reminders</h2>
      {warrantyReminders.map((w) => {
        const status = getWarrantyStatus(w.warranty_expiry_date);
        const isUrgent = status === 'EXPIRING_SOON';
        return (
          <Card key={w.id}>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: isUrgent ? '#FFF7ED' : '#F3E8FF' }}
              >
                <Shield size={18} style={{ color: isUrgent ? '#E67E22' : '#7C3AED' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  {w.description}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
                  {getCategoryLabel(w.category)} — Expires {formatDate(w.warranty_expiry_date)}
                </p>
              </div>
              {isUrgent && (
                <AlertCircle size={16} style={{ color: '#E67E22' }} className="shrink-0 mt-0.5" />
              )}
            </div>
          </Card>
        );
      })}
      {serviceReminders.map((s, i) => (
        <Card key={i}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EEF8E0' }}>
              <Calendar size={18} style={{ color: '#5A8A2A' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                Annual {getCategoryLabel(s.category).toLowerCase()} check-up
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
                Due {formatDate(s.next_reminder_date)}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
