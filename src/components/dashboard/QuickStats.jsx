import { useNavigate } from 'react-router-dom';
import { Building2, Briefcase, Users, FileText } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useJobs } from '../../context/JobContext';
import { mockHomeTeam } from '../../data/mockHomeTeam';
import { mockDocuments } from '../../data/mockDocuments';

const stats = [
  { key: 'properties', icon: Building2, label: 'Properties', link: '/properties' },
  { key: 'activeJobs', icon: Briefcase, label: 'Active Jobs', link: '/jobs' },
  { key: 'homeTeam', icon: Users, label: 'Home Team', link: '/properties' },
  { key: 'documents', icon: FileText, label: 'Documents', link: '/documents' },
];

export default function QuickStats() {
  const navigate = useNavigate();
  const { properties } = useProperties();
  const { activeJobs } = useJobs();

  const counts = {
    properties: properties.length,
    activeJobs: activeJobs.length,
    homeTeam: mockHomeTeam.length,
    documents: mockDocuments.filter((d) => d.file_url).length,
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
      {stats.map(({ key, icon: Icon, label, link }) => (
        <button
          key={key}
          onClick={() => navigate(link)}
          className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-[12px] bg-white min-w-[85px] active:scale-[0.98] transition-transform cursor-pointer"
          style={{ border: '1px solid #E5E8E8', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#EEF8E0' }}>
            <Icon size={18} style={{ color: '#5A8A2A' }} />
          </div>
          <span className="text-lg font-bold" style={{ color: '#1F2937' }}>{counts[key]}</span>
          <span className="text-[11px] font-medium" style={{ color: '#566573' }}>{label}</span>
        </button>
      ))}
    </div>
  );
}
