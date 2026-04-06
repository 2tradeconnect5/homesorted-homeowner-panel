import { Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';

export default function Header({ title, onMenuToggle, showMenu = false }) {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{ background: '#2C4459' }}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button
              onClick={onMenuToggle}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer md:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <img src="/homesorted-logo.png" alt="" className="w-7 h-7 object-contain hidden md:block" />
            <h1 className="text-white font-semibold text-[17px]">{title || 'HomeSorted'}</h1>
          </div>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1" style={{ background: '#DC2626' }}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
