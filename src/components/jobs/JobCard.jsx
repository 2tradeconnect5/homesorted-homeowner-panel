import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../shared/Card';
import StatusBadge from '../shared/StatusBadge';
import { getCategoryLabel } from '../../utils/helpers';
import { formatDate, formatCurrency } from '../../utils/formatters';

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <Card hover onClick={() => navigate(`/jobs/${job.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] font-semibold" style={{ color: '#8CC63F' }}>
              {getCategoryLabel(job.category)}
            </span>
            <StatusBadge status={job.status} />
            {job.is_emergency && (
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                Emergency
              </span>
            )}
          </div>
          <p className="text-sm font-medium truncate" style={{ color: '#1F2937' }}>
            {job.description}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#566573' }}>
            {job.trade && <span>{job.trade.name}</span>}
            <span>{formatDate(job.completed_at || job.created_at)}</span>
            {(job.final_amount || job.quoted_amount) != null && (
              <span className="font-semibold" style={{ color: '#1F2937' }}>
                {formatCurrency(job.final_amount || job.quoted_amount)}
              </span>
            )}
          </div>
        </div>
        <ArrowRight size={16} style={{ color: '#9CA3AF' }} className="shrink-0 mt-1" />
      </div>
    </Card>
  );
}
