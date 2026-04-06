export function getGreeting(firstName) {
  const hour = new Date().getHours();
  let timeGreeting;
  if (hour < 12) timeGreeting = 'Good morning';
  else if (hour < 18) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';
  return `${timeGreeting}, ${firstName}`;
}

export function getInitials(firstName, lastName) {
  return `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
}

export function getCategoryLabel(key) {
  const map = {
    PLUMBING: 'Plumbing',
    ELECTRICAL: 'Electrical',
    HEATING_GAS: 'Heating & Gas',
    ROOFING: 'Roofing',
    PAINTING_DECORATING: 'Painting & Decorating',
    CARPENTRY_JOINERY: 'Carpentry & Joinery',
    FLOORING: 'Flooring',
    GENERAL_BUILDING: 'General Building',
  };
  return map[key] || key;
}

export function getCategoryIcon(key) {
  const map = {
    PLUMBING: 'Wrench',
    ELECTRICAL: 'Zap',
    HEATING_GAS: 'Flame',
    ROOFING: 'Home',
    PAINTING_DECORATING: 'Paintbrush',
    CARPENTRY_JOINERY: 'Hammer',
    FLOORING: 'LayoutGrid',
    GENERAL_BUILDING: 'Building2',
  };
  return map[key] || 'Wrench';
}

export function getStatusStyle(status) {
  const styles = {
    INTAKE: { bg: '#FFF7ED', text: '#E67E22', border: '#E67E22' },
    ROUTING: { bg: '#FFF7ED', text: '#E67E22', border: '#E67E22' },
    SHORTLISTED: { bg: '#F3E8FF', text: '#7C3AED', border: '#7C3AED' },
    QUOTED: { bg: '#F3E8FF', text: '#7C3AED', border: '#7C3AED' },
    ACCEPTED: { bg: '#EBF5FB', text: '#2874A6', border: '#2874A6' },
    IN_PROGRESS: { bg: '#EBF5FB', text: '#2874A6', border: '#2874A6' },
    COMPLETED: { bg: '#EEF8E0', text: '#5A8A2A', border: '#8CC63F' },
    DISPUTED: { bg: '#FEE2E2', text: '#DC2626', border: '#DC2626' },
    EXPIRED_INCOMPLETE: { bg: '#F3F4F6', text: '#9CA3AF', border: '#9CA3AF' },
  };
  return styles[status] || styles.INTAKE;
}

export function getStatusLabel(status) {
  const labels = {
    INTAKE: 'Submitted',
    ROUTING: 'Finding Trades',
    SHORTLISTED: 'Shortlisted',
    QUOTED: 'Quotes Ready',
    ACCEPTED: 'Accepted',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    DISPUTED: 'Disputed',
    EXPIRED_INCOMPLETE: 'Expired',
  };
  return labels[status] || status;
}

export function isJobActive(status) {
  return !['COMPLETED', 'DISPUTED', 'EXPIRED_INCOMPLETE'].includes(status);
}

export function getWarrantyStatus(expiryDateStr) {
  const now = new Date();
  const expiry = new Date(expiryDateStr);
  const daysUntil = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) return 'EXPIRED';
  if (daysUntil <= 30) return 'EXPIRING_SOON';
  return 'ACTIVE';
}
