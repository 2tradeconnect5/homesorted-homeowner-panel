import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Star, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import Card from '../shared/Card';
import { formatRelativeTime } from '../../utils/formatters';

const iconMap = {
  JOB_UPDATE: Briefcase,
  POW_VERIFICATION: AlertTriangle,
  WARRANTY_REMINDER: Star,
  SERVICE_ANNIVERSARY: Star,
  DOCUMENT_ADDED: FileText,
  REVIEW_PROMPT: MessageCircle,
};

const colorMap = {
  JOB_UPDATE: '#2874A6',
  POW_VERIFICATION: '#E67E22',
  WARRANTY_REMINDER: '#7C3AED',
  SERVICE_ANNIVERSARY: '#8CC63F',
  DOCUMENT_ADDED: '#2C4459',
  REVIEW_PROMPT: '#F5A623',
};

export default function RecentActivity() {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const recent = notifications.slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="section-heading">Recent Activity</h2>
      <Card>
        <div className="space-y-3">
          {recent.map((n, i) => {
            const Icon = iconMap[n.type] || Briefcase;
            const color = colorMap[n.type] || '#566573';
            return (
              <div key={n.id}>
                <button
                  onClick={() => n.link && navigate(n.link)}
                  className={`flex items-start gap-3 w-full text-left ${n.link ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: '#1F2937' }}>{n.message}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>
                      {formatRelativeTime(n.created_at)}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ background: '#8CC63F' }} />
                  )}
                </button>
                {i < recent.length - 1 && <div className="border-b mt-3" style={{ borderColor: '#F3F4F6' }} />}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
