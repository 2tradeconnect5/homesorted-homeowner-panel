import { useAuth } from '../context/AuthContext';
import { getGreeting } from '../utils/helpers';
import QuickStats from '../components/dashboard/QuickStats';
import ActiveJobsSection from '../components/dashboard/ActiveJobsSection';
import UpcomingReminders from '../components/dashboard/UpcomingReminders';
import RecentActivity from '../components/dashboard/RecentActivity';
import PendingActions from '../components/dashboard/PendingActions';

export default function DashboardPage() {
  const { homeowner } = useAuth();

  return (
    <div className="space-y-6 pb-4">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#2C4459' }}>
          {getGreeting(homeowner?.first_name || 'there')}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#566573' }}>
          Your home, always managed
        </p>
      </div>

      <QuickStats />
      <PendingActions />
      <ActiveJobsSection />
      <UpcomingReminders />
      <RecentActivity />
    </div>
  );
}
