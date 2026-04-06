export const TRADE_CATEGORIES = [
  { key: 'PLUMBING', label: 'Plumbing', icon: 'Wrench' },
  { key: 'ELECTRICAL', label: 'Electrical', icon: 'Zap' },
  { key: 'HEATING_GAS', label: 'Heating & Gas', icon: 'Flame' },
  { key: 'ROOFING', label: 'Roofing', icon: 'Home' },
  { key: 'PAINTING_DECORATING', label: 'Painting & Decorating', icon: 'Paintbrush' },
  { key: 'CARPENTRY_JOINERY', label: 'Carpentry & Joinery', icon: 'Hammer' },
  { key: 'FLOORING', label: 'Flooring', icon: 'LayoutGrid' },
  { key: 'GENERAL_BUILDING', label: 'General Building', icon: 'Building2' },
];

export const JOB_STATUSES = {
  INTAKE: { label: 'Submitted', color: 'hs-orange', bgColor: 'bg-hs-orange-light', textColor: 'text-hs-orange' },
  ROUTING: { label: 'Finding Trades', color: 'hs-orange', bgColor: 'bg-hs-orange-light', textColor: 'text-hs-orange' },
  SHORTLISTED: { label: 'Shortlisted', color: 'hs-purple', bgColor: 'bg-hs-purple-light', textColor: 'text-hs-purple' },
  QUOTED: { label: 'Quotes Ready', color: 'hs-purple', bgColor: 'bg-hs-purple-light', textColor: 'text-hs-purple' },
  ACCEPTED: { label: 'Accepted', color: 'hs-blue', bgColor: 'bg-hs-blue-light', textColor: 'text-hs-blue' },
  IN_PROGRESS: { label: 'In Progress', color: 'hs-blue', bgColor: 'bg-hs-blue-light', textColor: 'text-hs-blue' },
  COMPLETED: { label: 'Completed', color: 'hs-green', bgColor: 'bg-hs-green-bg', textColor: 'text-hs-green-dark' },
  DISPUTED: { label: 'Disputed', color: 'hs-red', bgColor: 'bg-hs-red-light', textColor: 'text-hs-red' },
  EXPIRED_INCOMPLETE: { label: 'Expired', color: 'hs-grey-400', bgColor: 'bg-hs-grey-100', textColor: 'text-hs-grey-500' },
};

export const VERIFICATION_STATUSES = {
  VERIFIED: { label: 'Verified', bgColor: '#EEF8E0', textColor: '#5A8A2A' },
  PENDING_VERIFICATION: { label: 'Pending', bgColor: '#FFF7ED', textColor: '#E67E22' },
  UNVERIFIED: { label: 'Unverified', bgColor: '#F3F4F6', textColor: '#9CA3AF' },
};

export const CROSS_LINKS = {
  website: 'https://homesorted-website.vercel.app',
  tradeApp: 'https://homesorted-trade-app.vercel.app',
  partnerDashboard: 'https://homesorted-partner-dashboard.vercel.app',
};

// TODO PRE-LAUNCH: Replace 353XXXXXXXXX with real WhatsApp number before go-live
export const EMMA_WHATSAPP_BASE = 'https://wa.me/353XXXXXXXXX';

export const NOTIFICATION_TYPES = {
  JOB_UPDATE: { icon: 'Briefcase', color: '#2874A6' },
  POW_VERIFICATION: { icon: 'ShieldCheck', color: '#E67E22' },
  WARRANTY_REMINDER: { icon: 'Shield', color: '#7C3AED' },
  SERVICE_ANNIVERSARY: { icon: 'Calendar', color: '#8CC63F' },
  DOCUMENT_ADDED: { icon: 'FileText', color: '#2C4459' },
  REVIEW_PROMPT: { icon: 'Star', color: '#F5A623' },
};

export const JOB_TIMELINE_STATES = [
  'INTAKE',
  'ROUTING',
  'SHORTLISTED',
  'QUOTED',
  'ACCEPTED',
  'IN_PROGRESS',
  'COMPLETED',
];
