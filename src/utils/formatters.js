import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatCurrency(amount) {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return format(parseISO(dateStr), 'd MMM yyyy');
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return format(parseISO(dateStr), 'd MMM yyyy, HH:mm');
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—';
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
}

export function formatPhone(phone) {
  if (!phone) return '—';
  const clean = phone.replace(/^353/, '');
  return `+353 ${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`;
}

export function formatEircode(eircode) {
  if (!eircode) return '—';
  return eircode.toUpperCase();
}
