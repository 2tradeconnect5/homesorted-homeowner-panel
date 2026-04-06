import { NavLink } from 'react-router-dom';
import { Home, Building2, MessageCircle, FileText, User } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';

const tabs = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/properties', icon: Building2, label: 'Properties' },
  // TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real Emma WhatsApp number before go-live
  { to: null, icon: MessageCircle, label: 'Emma', isExternal: true, href: `${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma!')}` },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { unreadCount } = useNotifications();

  return (
    <nav
      className="fixed bottom-0 z-40 w-full max-w-[430px] left-1/2 -translate-x-1/2 bg-white safe-area-bottom md:hidden"
      style={{ boxShadow: '0 -1px 8px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(({ to, icon: Icon, label, isExternal, href }) => {
          if (isExternal) {
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative text-hs-grey-400"
              >
                <Icon size={22} strokeWidth={1.8} />
                <span className="text-[11px] font-medium">{label}</span>
              </a>
            );
          }
          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative ${
                  isActive ? 'text-hs-green' : 'text-hs-grey-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                    {label === 'Home' && unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-hs-red rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium">{label}</span>
                  {isActive && <div className="nav-dot mt-0.5" />}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
