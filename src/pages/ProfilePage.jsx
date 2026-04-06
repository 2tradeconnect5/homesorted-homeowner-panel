import { useNavigate } from 'react-router-dom';
import { Building2, Settings, LogOut, MessageCircle, Download, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import Card from '../components/shared/Card';
import { getInitials } from '../utils/helpers';
import { formatDate, formatPhone } from '../utils/formatters';
import { EMMA_WHATSAPP_BASE } from '../utils/constants';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { homeowner, logout } = useAuth();
  const { properties } = useProperties();

  if (!homeowner) return null;

  const initials = getInitials(homeowner.first_name, homeowner.last_name);

  const quickActions = [
    { icon: Building2, label: 'Manage Properties', onClick: () => navigate('/properties') },
    { icon: Settings, label: 'Settings', onClick: () => navigate('/settings') },
    {
      icon: Download,
      label: 'Download HomeInsight PDF',
      onClick: () => window.open(`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent("Hi Emma, I'd like to download my HomeInsight PDF")}`, '_blank'),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <Card>
        <div className="flex flex-col items-center text-center py-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
            style={{ background: '#2C4459' }}
          >
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            {homeowner.first_name} {homeowner.last_name}
          </h1>
          <p className="text-sm" style={{ color: '#566573' }}>{formatPhone(homeowner.phone)}</p>
          <p className="text-sm" style={{ color: '#566573' }}>{homeowner.email}</p>
          <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
            Member since {formatDate(homeowner.registration_date)}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs font-medium" style={{ color: '#566573' }}>
              {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}
            </span>
            {homeowner.is_premium ? (
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: '#F5A623' }}>
                <Crown size={12} /> Premium
              </span>
            ) : (
              <a
                href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Tell me about HomeInsight Premium')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold"
                style={{ color: '#8CC63F' }}
              >
                Learn about Premium
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="space-y-2">
        <h2 className="section-heading">Quick Actions</h2>
        {quickActions.map(({ icon: Icon, label, onClick }) => (
          <Card key={label} hover onClick={onClick}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#F3F4F6' }}>
                <Icon size={18} style={{ color: '#566573' }} />
              </div>
              <span className="text-sm font-medium flex-1" style={{ color: '#1F2937' }}>{label}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Chat with Emma */}
      <a
        // TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real WhatsApp number before go-live
        href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma!')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[10px] text-white font-semibold text-[15px] active:scale-[0.98] transition-transform"
        style={{ background: '#8CC63F' }}
      >
        <MessageCircle size={18} /> Chat with Emma
      </a>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate('/login'); }}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[10px] text-sm font-medium active:scale-[0.98] transition-transform cursor-pointer"
        style={{ border: '2px solid #E5E8E8', color: '#DC2626' }}
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  );
}
