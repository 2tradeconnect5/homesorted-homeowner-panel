import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, History } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { mockPastJobs } from '../../data/mockPastJobs';
import Card from '../shared/Card';
import StatusBadge from '../shared/StatusBadge';
import Badge from '../shared/Badge';
import FilterBar from '../shared/FilterBar';
import EmptyState from '../shared/EmptyState';
import { getCategoryLabel } from '../../utils/helpers';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { VERIFICATION_STATUSES } from '../../utils/constants';

export default function JobHistoryTab({ eircode }) {
  const navigate = useNavigate();
  const { getJobsByProperty } = useJobs();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const propertyJobs = getJobsByProperty(eircode);
  const pastJobs = mockPastJobs.filter((pj) => pj.property_eircode === eircode);

  // Combine and sort
  const allItems = [
    ...propertyJobs.map((j) => ({
      type: 'homesorted',
      id: j.id,
      date: j.completed_at || j.created_at,
      category: j.category,
      description: j.description,
      status: j.status,
      tradeName: j.trade?.name,
      amount: j.final_amount || j.quoted_amount,
      job: j,
    })),
    ...pastJobs.map((pj) => ({
      type: 'past',
      id: pj.id,
      date: pj.date_completed,
      category: pj.category,
      description: pj.description,
      status: null,
      tradeName: pj.trade_name,
      amount: null,
      verificationStatus: pj.verification_status,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered = allItems.filter((item) => {
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (statusFilter === 'PAST' && item.type !== 'past') return false;
    if (statusFilter === 'HOMESORTED' && item.type !== 'homesorted') return false;
    if (statusFilter && statusFilter !== 'PAST' && statusFilter !== 'HOMESORTED' && item.status !== statusFilter) return false;
    return true;
  });

  if (allItems.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No jobs yet"
        message="When you book through Emma, your job history builds here automatically."
        showEmmaCta
        emmaText="Hi Emma, I'd like to book a job"
      />
    );
  }

  return (
    <div className="space-y-3">
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statusOptions={[
          { value: 'HOMESORTED', label: 'HomeSorted Jobs' },
          { value: 'PAST', label: 'Past Jobs' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'QUOTED', label: 'Quoted' },
        ]}
      />
      <p className="text-xs" style={{ color: '#9CA3AF' }}>{filtered.length} jobs</p>
      {filtered.map((item) => (
        <Card
          key={item.id}
          hover={item.type === 'homesorted'}
          onClick={item.type === 'homesorted' ? () => navigate(`/jobs/${item.id}`) : undefined}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[11px] font-semibold" style={{ color: '#8CC63F' }}>
                  {getCategoryLabel(item.category)}
                </span>
                {item.status && <StatusBadge status={item.status} />}
                {item.type === 'past' && item.verificationStatus && (
                  <Badge
                    label={VERIFICATION_STATUSES[item.verificationStatus]?.label || item.verificationStatus}
                    bg={VERIFICATION_STATUSES[item.verificationStatus]?.bgColor}
                    text={VERIFICATION_STATUSES[item.verificationStatus]?.textColor}
                  />
                )}
              </div>
              <p className="text-sm font-medium truncate" style={{ color: '#1F2937' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#566573' }}>
                {item.tradeName && <span>{item.tradeName}</span>}
                <span>{formatDate(item.date)}</span>
                {item.amount != null && (
                  <span className="font-semibold" style={{ color: '#1F2937' }}>
                    {formatCurrency(item.amount)}
                  </span>
                )}
              </div>
            </div>
            {item.type === 'homesorted' && (
              <ArrowRight size={16} style={{ color: '#9CA3AF' }} className="shrink-0 mt-1" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
