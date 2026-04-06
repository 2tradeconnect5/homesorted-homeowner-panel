import { getStatusStyle, getStatusLabel } from '../../utils/helpers';

export default function StatusBadge({ status, className = '' }) {
  const style = getStatusStyle(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={{ background: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}
