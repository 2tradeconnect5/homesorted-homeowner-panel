import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { mockPastJobs } from '../../data/mockPastJobs';
import { mockJobs } from '../../data/mockJobs';
import Card from '../shared/Card';
import { EMMA_WHATSAPP_BASE } from '../../utils/constants';

export default function PendingActions() {
  const navigate = useNavigate();

  const pendingVerifications = mockPastJobs.filter(
    (pj) => pj.added_by === 'TRADE' && pj.verification_status === 'VERIFIED'
  );

  const unreviewed = mockJobs.filter(
    (j) => j.status === 'COMPLETED' && !j.review
  );

  if (pendingVerifications.length === 0 && unreviewed.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="section-heading">Needs Your Attention</h2>

      {unreviewed.map((job) => (
        <Card key={job.id} hover onClick={() => navigate(`/jobs/${job.id}`)}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FFF7ED' }}>
              <Star size={18} style={{ color: '#F5A623' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                How was your experience with {job.trade?.name}?
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
                {job.description}
              </p>
            </div>
            <ArrowRight size={16} style={{ color: '#9CA3AF' }} className="shrink-0 mt-1" />
          </div>
        </Card>
      ))}

      {pendingVerifications.length > 0 && (
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FFF7ED' }}>
              <ShieldCheck size={18} style={{ color: '#E67E22' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                {pendingVerifications.length} past job{pendingVerifications.length > 1 ? 's' : ''} to verify
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#566573' }}>
                Trades have logged work at your property. Confirm to build your home record.
              </p>
              <a
                href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma, I want to verify some past jobs')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs font-semibold"
                style={{ color: '#8CC63F' }}
              >
                Verify via Emma <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
