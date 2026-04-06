import { useNavigate } from 'react-router-dom';
import { Briefcase, ShieldCheck, Shield, Calendar, FileText, Star } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatRelativeTime } from '../../utils/formatters';

const iconMap = {
  JOB_UPDATE: Briefcase,
  POW_VERIFICATION: ShieldCheck,
  WARRANTY_REMINDER: Shield,
  SERVICE_ANNIVERSARY: Calendar,
  DOCUMENT_ADDED: FileText,
  REVIEW_PROMPT: Star,
};

const colorMap = {
  JOB_UPDATE: '#2874A6',
  POW_VERIFICATION: '#E67E22',
  WARRANTY_REMINDER: '#7C3AED',
  SERVICE_ANNIVERSARY: '#8CC63F',
  DOCUMENT_ADDED: '#2C4459',
  REVIEW_PROMPT: '#F5A623',
};

export default function NotificationItem({ notification }) {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  const Icon = iconMap[notification.type] || Briefcase;
  const color = colorMap[notification.type] || '#566573';

  const handleClick = () => {
    if (!notification.read) markAsRead(notification.id);
    if (notification.link) navigate(notification.link);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-[12px] transition-colors ${
        notification.link ? 'cursor-pointer hover:bg-hs-grey-50' : 'cursor-default'
      }`}
      style={!notification.read ? { background: '#F9FAFB', borderLeft: '3px solid #8CC63F' } : {}}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `${color}15` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
          {notification.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
          {notification.message}
        </p>
        <p className="text-[11px] mt-1" style={{ color: '#9CA3AF' }}>
          {formatRelativeTime(notification.created_at)}
        </p>
      </div>
      {!notification.read && (
        <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: '#8CC63F' }} />
      )}
    </button>
  );
}
