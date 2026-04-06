import { useState } from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/shared/Card';
import { CROSS_LINKS, EMMA_WHATSAPP_BASE } from '../utils/constants';

function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <div>
        <p className="text-sm font-medium" style={{ color: '#1F2937' }}>{label}</p>
        {description && <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${checked ? '' : ''}`}
        style={{ background: checked ? '#8CC63F' : '#D1D5DB' }}
        role="switch"
        aria-checked={checked}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { homeowner, updateHomeowner } = useAuth();
  const [notifPrefs, setNotifPrefs] = useState({
    jobUpdates: true,
    warrantyReminders: true,
    serviceAnniversaries: true,
    reviewPrompts: true,
    powVerification: true,
  });

  const toggleNotif = (key) => (val) => setNotifPrefs((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold" style={{ color: '#2C4459' }}>Settings</h1>

      {/* Notification preferences */}
      <Card>
        <h2 className="text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>Notification Preferences</h2>
        <ToggleSwitch label="Job updates" description="Status changes, new quotes" checked={notifPrefs.jobUpdates} onChange={toggleNotif('jobUpdates')} />
        <ToggleSwitch label="Warranty reminders" description="Before warranties expire" checked={notifPrefs.warrantyReminders} onChange={toggleNotif('warrantyReminders')} />
        <ToggleSwitch label="Service anniversaries" description="Annual maintenance reminders" checked={notifPrefs.serviceAnniversaries} onChange={toggleNotif('serviceAnniversaries')} />
        <ToggleSwitch label="Review prompts" description="After jobs are completed" checked={notifPrefs.reviewPrompts} onChange={toggleNotif('reviewPrompts')} />
        <ToggleSwitch label="Verification requests" description="When trades log past work" checked={notifPrefs.powVerification} onChange={toggleNotif('powVerification')} />
      </Card>

      {/* Marketing */}
      <Card>
        <ToggleSwitch
          label="Marketing communications"
          description="Tips, updates, and offers from HomeSorted"
          checked={homeowner?.marketing_opt_in || false}
          onChange={(val) => updateHomeowner({ marketing_opt_in: val })}
        />
      </Card>

      {/* Support */}
      <Card>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Support</h2>
        <div className="space-y-3">
          <a
            href={`${EMMA_WHATSAPP_BASE}?text=${encodeURIComponent('Hi Emma, I need help with something')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: '#8CC63F' }}
          >
            <MessageCircle size={16} /> Help & Support (WhatsApp)
          </a>
          <a
            href={CROSS_LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#566573' }}
          >
            About HomeSorted <ExternalLink size={12} />
          </a>
          <a
            href={`${CROSS_LINKS.website}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#566573' }}
          >
            Privacy Policy <ExternalLink size={12} />
          </a>
          <a
            href={`${CROSS_LINKS.website}/terms`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
            style={{ color: '#566573' }}
          >
            Terms of Service <ExternalLink size={12} />
          </a>
        </div>
      </Card>

      <p className="text-center text-[11px] py-4" style={{ color: '#9CA3AF' }}>
        HomeSorted Homeowner Panel v1.0.0
      </p>
    </div>
  );
}
