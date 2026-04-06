import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import PropertyHeader from '../components/property/PropertyHeader';
import TabStrip from '../components/shared/TabStrip';
import OverviewTab from '../components/property/OverviewTab';
import JobHistoryTab from '../components/property/JobHistoryTab';
import HomeTeamTab from '../components/property/HomeTeamTab';
import DocumentsTab from '../components/property/DocumentsTab';
import WarrantiesTab from '../components/property/WarrantiesTab';
import ImprovementsTab from '../components/property/ImprovementsTab';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'jobs', label: 'Job History' },
  { key: 'home-team', label: 'Home Team' },
  { key: 'documents', label: 'Documents' },
  { key: 'warranties', label: 'Warranties' },
  { key: 'improvements', label: 'Improvements' },
];

export default function PropertyDetailPage() {
  const { eircode } = useParams();
  const { homeowner } = useAuth();
  const { properties, selectProperty } = useProperties();
  const [activeTab, setActiveTab] = useState('overview');

  const property = properties.find((p) => p.eircode === eircode);

  if (!property) {
    return <Navigate to="/properties" replace />;
  }

  // Select this property in context
  if (eircode) selectProperty(eircode);

  return (
    <div className="space-y-4">
      <PropertyHeader property={property} isPremium={homeowner?.is_premium} />
      <TabStrip tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="animate-fade-in">
        {activeTab === 'overview' && <OverviewTab eircode={eircode} />}
        {activeTab === 'jobs' && <JobHistoryTab eircode={eircode} />}
        {activeTab === 'home-team' && <HomeTeamTab eircode={eircode} />}
        {activeTab === 'documents' && <DocumentsTab eircode={eircode} />}
        {activeTab === 'warranties' && <WarrantiesTab eircode={eircode} />}
        {activeTab === 'improvements' && <ImprovementsTab property={property} />}
      </div>
    </div>
  );
}
