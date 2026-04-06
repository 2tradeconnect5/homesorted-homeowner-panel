export default function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      className={`bg-white rounded-[12px] p-4 ${hover ? 'cursor-pointer transition-shadow hover:shadow-md' : ''} ${className}`}
      style={{ border: '1px solid #E5E8E8', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
