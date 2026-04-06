export default function Badge({ label, bg, text, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}
