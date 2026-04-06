import { NavLink } from 'react-router-dom';
import {
  Home, Building2, Briefcase, FileText, Bell, User, Settings,
  ChevronLeft, ChevronRight, ExternalLink, MessageCircle,
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useProperties } from '../../context/PropertyContext';
import { useJobs } from '../../context/JobContext';
import { CROSS_LINKS, EMMA_WHATSAPP_BASE } from '../../utils/constants';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/properties', icon: Building2, label: 'Properties' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/notifications', icon: Bell, label: 'Notifications', showBadge: true },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { unreadCount } = useNotifications();
  const { properties } = useProperties();
  const { activeJobs } = useJobs();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white z-50 flex flex-col sidebar-transition
          ${collapsed ? 'w-16' : 'w-[260px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative
        `}
        style={{ borderRight: '1px solid #E5E8E8' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 shrink-0" style={{ borderBottom: '1px solid #E5E8E8' }}>
          {collapsed ? (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#8CC63F' }}>
              <span className="text-white font-bold text-sm">HS</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img src="/homesorted-logo.png" alt="" className="w-8 h-8 object-contain" />
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold" style={{ color: '#8CC63F' }}>HomeSorted</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map(({ to, icon: Icon, label, showBadge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onMobileClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150 relative
                    ${isActive
                      ? 'bg-hs-green-bg'
                      : 'hover:bg-hs-grey-50'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  style={({ isActive }) => ({
                    color: isActive ? '#5A8A2A' : '#566573',
                  })}
                  title={collapsed ? label : undefined}
                >
                  <div className="relative shrink-0">
                    <Icon size={20} />
                    {showBadge && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-0.5" style={{ background: '#DC2626' }}>
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {!collapsed && <span>{label}</span>}
                  {!collapsed && label === 'Jobs' && activeJobs.length > 0 && (
                    <span className="ml-auto text-xs font-semibold rounded-full px-2 py-0.5" style={{ background: '#EBF5FB', color: '#2874A6' }}>
                      {activeJobs.length}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Property sub-nav */}
          {!collapsed && properties.length > 0 && (
            <div className="mt-4 px-4">
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: '#9CA3AF' }}>
                Properties
              </p>
              <ul className="space-y-1">
                {properties.map((p) => (
                  <li key={p.eircode}>
                    <NavLink
                      to={`/properties/${p.eircode}`}
                      onClick={onMobileClose}
                      className={({ isActive }) => `
                        block px-3 py-2 rounded-lg text-xs font-medium transition-colors
                        ${isActive ? 'bg-hs-green-bg' : 'hover:bg-hs-grey-50'}
                      `}
                      style={({ isActive }) => ({
                        color: isActive ? '#5A8A2A' : '#566573',
                      })}
                    >
                      <span className="block truncate">{p.address.split(',')[0]}</span>
                      <span className="text-[10px] opacity-60">{p.eircode}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Emma WhatsApp */}
          {!collapsed && (
            <div className="mt-4 px-3">
              <a
                // TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real WhatsApp number before go-live
                href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-hs-green-bg"
                style={{ color: '#8CC63F' }}
              >
                <MessageCircle size={20} />
                <span>Chat with Emma</span>
                <ExternalLink size={12} className="ml-auto opacity-50" />
              </a>
            </div>
          )}
        </nav>

        {/* Cross-platform links */}
        {!collapsed && (
          <div className="px-4 pt-3 pb-2" style={{ borderTop: '1px solid #E5E8E8' }}>
            <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: '#9CA3AF' }}>
              HomeSorted Apps
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href={CROSS_LINKS.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#566573' }}>
                  HomeSorted Website
                </a>
              </li>
              <li>
                <a href={CROSS_LINKS.tradeApp} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#566573' }}>
                  Trade App <span className="opacity-50">— Are you a trade?</span>
                </a>
              </li>
              <li>
                <a href={CROSS_LINKS.partnerDashboard} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#566573' }}>
                  Partner Portal <span className="opacity-50">— Property manager?</span>
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Collapse toggle */}
        <div className="hidden md:flex p-2" style={{ borderTop: '1px solid #E5E8E8' }}>
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-hs-grey-50 cursor-pointer"
            style={{ color: '#566573' }}
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
