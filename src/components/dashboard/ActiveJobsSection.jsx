import { useNavigate } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import Card from '../shared/Card';
import StatusBadge from '../shared/StatusBadge';
import EmptyState from '../shared/EmptyState';
import { getCategoryLabel } from '../../utils/helpers';

export default function ActiveJobsSection() {
  const navigate = useNavigate();
  const { activeJobs } = useJobs();

  if (activeJobs.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No active jobs"
        message="Need something done? Chat with Emma on WhatsApp to get started!"
        showEmmaCta
        emmaText="Hi Emma, I'd like to book a job"
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Active Jobs</h2>
        <button
          onClick={() => navigate('/jobs')}
          className="text-xs font-medium flex items-center gap-1 cursor-pointer"
          style={{ color: '#8CC63F' }}
        >
          View all <ArrowRight size={12} />
        </button>
      </div>
      {activeJobs.slice(0, 3).map((job) => (
        <Card key={job.id} hover onClick={() => navigate(`/jobs/${job.id}`)}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold" style={{ color: '#8CC63F' }}>
                  {getCategoryLabel(job.category)}
                </span>
                <StatusBadge status={job.status} />
              </div>
              <p className="text-sm font-medium truncate" style={{ color: '#1F2937' }}>
                {job.description}
              </p>
              {job.trade && (
                <p className="text-xs mt-1" style={{ color: '#566573' }}>
                  {job.trade.name} — {job.trade.business_name}
                </p>
              )}
            </div>
            <ArrowRight size={16} style={{ color: '#9CA3AF' }} className="shrink-0 mt-1" />
          </div>
        </Card>
      ))}
    </div>
  );
}
