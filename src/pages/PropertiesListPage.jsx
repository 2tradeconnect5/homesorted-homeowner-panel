import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useJobs } from '../context/JobContext';
import Card from '../components/shared/Card';
import Badge from '../components/shared/Badge';

export default function PropertiesListPage() {
  const navigate = useNavigate();
  const { properties } = useProperties();
  const { getJobsByProperty } = useJobs();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold" style={{ color: '#2C4459' }}>
        Your Properties
      </h1>
      <p className="text-sm" style={{ color: '#566573' }}>
        {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} on your account
      </p>

      <div className="space-y-3">
        {properties.map((p) => {
          const jobCount = getJobsByProperty(p.eircode).length;
          return (
            <Card key={p.eircode} hover onClick={() => navigate(`/properties/${p.eircode}`)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: '#EEF8E0' }}>
                    <MapPin size={20} style={{ color: '#5A8A2A' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                      {p.address}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge label={p.eircode} bg="#EEF8E0" text="#5A8A2A" />
                      <span className="text-xs" style={{ color: '#566573' }}>
                        {p.property_type === 'HOUSE' ? 'House' : 'Apartment'} · {p.property_age}
                      </span>
                    </div>
                    <p className="text-[11px] mt-1" style={{ color: '#9CA3AF' }}>
                      {jobCount} job{jobCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: '#9CA3AF' }} className="shrink-0 mt-3" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
