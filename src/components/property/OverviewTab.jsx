import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { mockHomeTeam } from '../../data/mockHomeTeam';
import { mockPastJobs } from '../../data/mockPastJobs';
import Card from '../shared/Card';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryLabel } from '../../utils/helpers';
import { EMMA_WHATSAPP_BASE, TRADE_CATEGORIES } from '../../utils/constants';
import { Briefcase, Users, PieChart, Star, ArrowRight } from 'lucide-react';

export default function OverviewTab({ eircode }) {
  const { homeowner } = useAuth();
  const { getJobsByProperty } = useJobs();

  const propertyJobs = getJobsByProperty(eircode);
  const pastJobs = mockPastJobs.filter((pj) => pj.property_eircode === eircode);
  const homeTeam = mockHomeTeam.filter((ht) => ht.property_eircode === eircode);
  const completedJobs = propertyJobs.filter((j) => j.status === 'COMPLETED');
  const totalSpend = completedJobs.reduce((sum, j) => sum + (j.final_amount || 0), 0);
  const verifiedPast = pastJobs.filter((pj) => pj.verification_status === 'VERIFIED').length;

  // Spend by category
  const spendByCategory = {};
  completedJobs.forEach((j) => {
    spendByCategory[j.category] = (spendByCategory[j.category] || 0) + (j.final_amount || 0);
  });
  const categoryColors = {
    PLUMBING: '#2874A6',
    ELECTRICAL: '#F5A623',
    HEATING_GAS: '#DC2626',
    PAINTING_DECORATING: '#8CC63F',
    CARPENTRY_JOINERY: '#7C3AED',
    ROOFING: '#E67E22',
    FLOORING: '#2C4459',
    GENERAL_BUILDING: '#566573',
  };

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={14} style={{ color: '#2874A6' }} />
            <span className="text-[11px] font-medium" style={{ color: '#566573' }}>Total Jobs</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
            {propertyJobs.length + pastJobs.length}
          </p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>
            {verifiedPast} verified past, {pastJobs.length - verifiedPast} unverified
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Star size={14} style={{ color: '#F5A623' }} />
            <span className="text-[11px] font-medium" style={{ color: '#566573' }}>Total Spend</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
            {formatCurrency(totalSpend)}
          </p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>HomeSorted jobs only</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} style={{ color: '#8CC63F' }} />
            <span className="text-[11px] font-medium" style={{ color: '#566573' }}>Home Team</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
            {homeTeam.length}/8
          </p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>categories filled</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-1">
            <PieChart size={14} style={{ color: '#7C3AED' }} />
            <span className="text-[11px] font-medium" style={{ color: '#566573' }}>Categories</span>
          </div>
          <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
            {Object.keys(spendByCategory).length}
          </p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>types of work done</p>
        </Card>
      </div>

      {/* Spend breakdown */}
      {totalSpend > 0 && (
        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Spend by Category</h3>
          <div className="space-y-2">
            {Object.entries(spendByCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amount]) => {
                const pct = Math.round((amount / totalSpend) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: '#566573' }}>{getCategoryLabel(cat)}</span>
                      <span className="font-semibold" style={{ color: '#1F2937' }}>
                        {formatCurrency(amount)} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${pct}%`, background: categoryColors[cat] || '#8CC63F' }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      )}

      {/* Premium upsell */}
      {!homeowner?.is_premium && (
        <Card className="!bg-hs-cream">
          <h3 className="text-sm font-bold mb-2" style={{ color: '#2C4459' }}>
            Get more from your home record
          </h3>
          <ul className="space-y-1.5 text-xs mb-3" style={{ color: '#566573' }}>
            <li>Priority routing for faster trade matching</li>
            <li>Quarterly Home Health Report to your WhatsApp</li>
            <li>Pre-Sale Property Report when you sell</li>
            <li>Warranty expiry reminders before they lapse</li>
            <li>Maintenance budget forecast</li>
          </ul>
          <a
            href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Tell me about HomeInsight Premium')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: '#8CC63F' }}
          >
            Learn about Premium <ArrowRight size={12} />
          </a>
        </Card>
      )}
    </div>
  );
}
