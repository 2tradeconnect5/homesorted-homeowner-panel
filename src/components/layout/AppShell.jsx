import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import EmmaFloatingButton from './EmmaFloatingButton';

export default function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/properties') return 'Properties';
    if (path.startsWith('/properties/')) return 'Property';
    if (path === '/jobs') return 'Jobs';
    if (path.startsWith('/jobs/')) return 'Job Detail';
    if (path === '/documents') return 'Documents';
    if (path === '/notifications') return 'Notifications';
    if (path === '/profile') return 'Profile';
    if (path === '/settings') return 'Settings';
    return 'HomeSorted';
  };

  return (
    <div className="min-h-dvh flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Mobile sidebar (overlay) */}
      <div className="md:hidden">
        <Sidebar
          collapsed={false}
          onToggle={() => {}}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-dvh">
        <Header
          title={getPageTitle()}
          showMenu={true}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Mobile layout: centered 430px max */}
        <main className="flex-1 w-full">
          <div className="max-w-[430px] mx-auto w-full px-4 pt-4 pb-24 md:max-w-[1200px] md:pb-6 md:px-6 animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Mobile bottom nav */}
        <BottomNav />

        {/* Floating Emma button — hidden on mobile (Emma is in bottom nav) */}
        <div className="hidden md:block">
          <EmmaFloatingButton />
        </div>
      </div>
    </div>
  );
}
