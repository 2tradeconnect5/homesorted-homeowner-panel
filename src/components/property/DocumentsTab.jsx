import { useState } from 'react';
import { FileText, Download, Search } from 'lucide-react';
import { mockDocuments } from '../../data/mockDocuments';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import EmptyState from '../shared/EmptyState';
import { formatDate } from '../../utils/formatters';

export default function DocumentsTab({ eircode }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const docs = mockDocuments.filter((d) => d.property_eircode === eircode);

  const filtered = docs.filter((d) => {
    if (typeFilter && d.type !== typeFilter) return false;
    if (search && d.file_name && !d.file_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (docs.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents yet"
        message="Invoices and reports will appear here after your first job."
      />
    );
  }

  const typeStyles = {
    INVOICE: { bg: '#EBF5FB', text: '#2874A6' },
    SNAG_REPORT: { bg: '#FFF7ED', text: '#E67E22' },
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-[10px] pl-9 pr-3 py-2 text-sm outline-none"
            style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
            onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
            onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-[10px] px-3 py-2 text-sm outline-none cursor-pointer"
          style={{ border: '2px solid #E5E8E8', color: '#1F2937', background: 'white' }}
        >
          <option value="">All Types</option>
          <option value="INVOICE">Invoices</option>
          <option value="SNAG_REPORT">Snag Reports</option>
        </select>
      </div>

      {filtered.map((doc) => {
        const ts = typeStyles[doc.type] || { bg: '#F3F4F6', text: '#566573' };
        return (
          <Card key={doc.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: ts.bg }}>
                  <FileText size={18} style={{ color: ts.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#1F2937' }}>
                    {doc.file_name || 'No file'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      label={doc.type === 'INVOICE' ? 'Invoice' : 'Snag Report'}
                      bg={ts.bg}
                      text={ts.text}
                    />
                    {doc.invoice_type && (
                      <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                        {doc.invoice_type === 'GENERATED' ? 'Generated' : doc.invoice_type === 'UPLOADED' ? 'Uploaded' : 'Skipped'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: '#9CA3AF' }}>
                    {formatDate(doc.created_at)}
                  </p>
                </div>
              </div>
              {doc.file_url && doc.file_url !== '#' && (
                <button className="p-2 rounded-lg hover:bg-hs-grey-50 transition-colors cursor-pointer" aria-label="Download">
                  <Download size={16} style={{ color: '#566573' }} />
                </button>
              )}
              {doc.file_url === '#' && (
                <button className="p-2 rounded-lg hover:bg-hs-grey-50 transition-colors cursor-pointer" aria-label="Download">
                  <Download size={16} style={{ color: '#9CA3AF' }} />
                </button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
