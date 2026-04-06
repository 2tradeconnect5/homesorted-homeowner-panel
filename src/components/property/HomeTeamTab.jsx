import { ShieldCheck, MessageCircle, Users } from 'lucide-react';
import { mockHomeTeam } from '../../data/mockHomeTeam';
import { TRADE_CATEGORIES, EMMA_WHATSAPP_BASE } from '../../utils/constants';
import { getCategoryLabel } from '../../utils/helpers';
import { formatDate } from '../../utils/formatters';
import Card from '../shared/Card';
import EmptyState from '../shared/EmptyState';

export default function HomeTeamTab({ eircode }) {
  const homeTeam = mockHomeTeam.filter((ht) => ht.property_eircode === eircode);

  if (homeTeam.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Your Home Team is empty"
        message="Complete a job and your trade is automatically saved to your Home Team."
        showEmmaCta
        emmaText="Hi Emma, I'd like to book a job"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {TRADE_CATEGORIES.map((cat) => {
        const member = homeTeam.find((ht) => ht.category === cat.key);
        if (member) {
          return (
            <Card key={cat.key}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#8CC63F' }}>
                  {cat.label}
                </span>
                {member.verified_badge && (
                  <ShieldCheck size={14} style={{ color: '#5A8A2A' }} />
                )}
              </div>
              <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                {member.trade_name}
              </p>
              <p className="text-xs" style={{ color: '#566573' }}>{member.business_name}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: '#9CA3AF' }}>
                <span>{member.jobs_completed} job{member.jobs_completed !== 1 ? 's' : ''}</span>
                {member.last_used_date && <span>Last: {formatDate(member.last_used_date)}</span>}
              </div>
              <a
                href={`https://wa.me/${member.trade_id ? '353XXXXXXXXX' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs font-semibold"
                style={{ color: '#8CC63F' }}
              >
                <MessageCircle size={12} /> Contact via WhatsApp
              </a>
            </Card>
          );
        }

        return (
          <div
            key={cat.key}
            className="rounded-[12px] p-4 border-2 border-dashed flex flex-col items-center justify-center text-center min-h-[100px]"
            style={{ borderColor: '#E5E8E8' }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>
              {cat.label}
            </span>
            <p className="text-xs" style={{ color: '#D1D5DB' }}>
              No trade yet
            </p>
            <p className="text-[10px] mt-1" style={{ color: '#D1D5DB' }}>
              Book a {cat.label.toLowerCase()} job to build your team
            </p>
          </div>
        );
      })}
    </div>
  );
}
