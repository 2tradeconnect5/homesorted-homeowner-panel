import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, ShieldCheck, MessageCircle, Download, AlertTriangle, Info } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useProperties } from '../context/PropertyContext';
import { mockQuotes } from '../data/mockQuotes';
import { mockDocuments } from '../data/mockDocuments';
import Card from '../components/shared/Card';
import StatusBadge from '../components/shared/StatusBadge';
import Badge from '../components/shared/Badge';
import JobTimeline from '../components/jobs/JobTimeline';
import QuoteCard from '../components/jobs/QuoteCard';
import ReviewSection from '../components/jobs/ReviewSection';
import { getCategoryLabel, getStatusStyle } from '../utils/helpers';
import { formatCurrency, formatDate } from '../utils/formatters';
import { EMMA_WHATSAPP_BASE } from '../utils/constants';

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { properties } = useProperties();

  const job = getJobById(jobId);
  if (!job) return <Navigate to="/jobs" replace />;

  const property = properties.find((p) => p.eircode === job.property_eircode);
  const quotes = mockQuotes.filter((q) => q.job_id === job.id);
  const docs = mockDocuments.filter((d) => d.job_id === job.id);
  const invoice = docs.find((d) => d.type === 'INVOICE');
  const statusStyle = getStatusStyle(job.status);

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm font-medium cursor-pointer"
        style={{ color: '#566573' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs font-semibold" style={{ color: '#8CC63F' }}>
            {getCategoryLabel(job.category)}
          </span>
          <StatusBadge status={job.status} />
          {job.is_emergency && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              Emergency
            </span>
          )}
        </div>
        <h1 className="text-lg font-bold" style={{ color: '#2C4459' }}>
          {job.description}
        </h1>
        {property && (
          <button
            onClick={() => navigate(`/properties/${property.eircode}`)}
            className="flex items-center gap-1 mt-1 text-xs cursor-pointer"
            style={{ color: '#566573' }}
          >
            <MapPin size={12} /> {property.address} ({property.eircode})
          </button>
        )}
      </div>

      {/* Timeline */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Job Timeline</h3>
        <JobTimeline timeline={job.timeline} currentStatus={job.status} />
      </Card>

      {/* Trade info */}
      {job.trade && (
        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Trade</h3>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                  {job.trade.name}
                </p>
                {job.trade.verified_badge && (
                  <ShieldCheck size={14} style={{ color: '#5A8A2A' }} />
                )}
              </div>
              <p className="text-xs" style={{ color: '#566573' }}>{job.trade.business_name}</p>
            </div>
            <a
              href={`https://wa.me/${job.trade.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-white text-xs font-semibold active:scale-[0.98] transition-transform"
              style={{ background: '#8CC63F' }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </Card>
      )}

      {/* Quotes */}
      {quotes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold" style={{ color: '#1F2937' }}>
            Quotes ({quotes.length})
          </h3>
          {quotes.map((q) => (
            <QuoteCard key={q.id} quote={q} />
          ))}
          {job.status === 'QUOTED' && (
            <div className="flex items-start gap-2 p-3 rounded-[10px]" style={{ background: '#EBF5FB' }}>
              <Info size={14} style={{ color: '#2874A6' }} className="shrink-0 mt-0.5" />
              <p className="text-xs" style={{ color: '#2874A6' }}>
                Accepting and declining quotes is handled through Emma on WhatsApp.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Invoice */}
      {invoice && (
        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Invoice</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  label={invoice.invoice_type === 'GENERATED' ? 'Generated' : invoice.invoice_type === 'UPLOADED' ? 'Uploaded' : 'Skipped'}
                  bg={invoice.invoice_type === 'GENERATED' ? '#EEF8E0' : '#F3F4F6'}
                  text={invoice.invoice_type === 'GENERATED' ? '#5A8A2A' : '#566573'}
                />
              </div>
              {invoice.fields && (
                <p className="text-lg font-bold" style={{ color: '#2C4459' }}>
                  {formatCurrency(invoice.fields.amount)}
                </p>
              )}
              {job.final_amount && !invoice.fields && (
                <p className="text-lg font-bold" style={{ color: '#2C4459' }}>
                  {formatCurrency(job.final_amount)}
                </p>
              )}
              <p className="text-xs" style={{ color: '#9CA3AF' }}>
                {formatDate(invoice.created_at)}
              </p>
            </div>
            {invoice.file_url && (
              <button className="p-2 rounded-lg hover:bg-hs-grey-50 transition-colors cursor-pointer" aria-label="Download invoice">
                <Download size={18} style={{ color: '#566573' }} />
              </button>
            )}
          </div>
          {invoice.fields && (
            <div className="mt-3 pt-3 space-y-1.5" style={{ borderTop: '1px solid #F3F4F6' }}>
              <p className="text-xs" style={{ color: '#566573' }}>
                <span className="font-medium">From:</span> {invoice.fields.business_name}
              </p>
              {invoice.fields.business_address && (
                <p className="text-xs" style={{ color: '#566573' }}>{invoice.fields.business_address}</p>
              )}
              {invoice.fields.payment_terms && (
                <p className="text-xs" style={{ color: '#566573' }}>
                  <span className="font-medium">Terms:</span> {invoice.fields.payment_terms}
                </p>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Review */}
      {job.status === 'COMPLETED' && (
        <ReviewSection review={job.review} tradeName={job.trade?.name || 'the trade'} />
      )}

      {/* Dispute section */}
      {job.dispute && (
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FEE2E2' }}>
              <AlertTriangle size={18} style={{ color: '#DC2626' }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#DC2626' }}>Dispute</h3>
              <p className="text-xs mt-0.5" style={{ color: '#566573' }}>{job.dispute.reason}</p>
              <Badge
                label={job.dispute.status === 'UNDER_REVIEW' ? 'Under Review' : job.dispute.status}
                bg="#FFF7ED"
                text="#E67E22"
                className="mt-2"
              />
              <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
                Raised {formatDate(job.dispute.raised_at)}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
