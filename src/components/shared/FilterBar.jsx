import { TRADE_CATEGORIES } from '../../utils/constants';

export default function FilterBar({ categoryFilter, setCategoryFilter, statusFilter, setStatusFilter, statusOptions = [] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="rounded-[10px] px-3 py-2 text-sm outline-none cursor-pointer"
        style={{ border: '2px solid #E5E8E8', color: '#1F2937', background: 'white' }}
      >
        <option value="">All Categories</option>
        {TRADE_CATEGORIES.map((c) => (
          <option key={c.key} value={c.key}>
            {c.label}
          </option>
        ))}
      </select>
      {statusOptions.length > 0 && (
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-[10px] px-3 py-2 text-sm outline-none cursor-pointer"
          style={{ border: '2px solid #E5E8E8', color: '#1F2937', background: 'white' }}
        >
          <option value="">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
