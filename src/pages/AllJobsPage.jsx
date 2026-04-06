import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/jobs/JobCard';
import TabStrip from '../components/shared/TabStrip';
import FilterBar from '../components/shared/FilterBar';
import EmptyState from '../components/shared/EmptyState';

const TABS = [
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'all', label: 'All' },
];

export default function AllJobsPage() {
  const { jobs, activeJobs, completedJobs } = useJobs();
  const [activeTab, setActiveTab] = useState('active');
  const [categoryFilter, setCategoryFilter] = useState('');

  const tabJobs = {
    active: activeJobs,
    completed: completedJobs,
    all: jobs,
  };

  const currentJobs = (tabJobs[activeTab] || jobs)
    .filter((j) => !categoryFilter || j.category === categoryFilter)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold" style={{ color: '#2C4459' }}>Jobs</h1>
      <TabStrip
        tabs={TABS.map((t) => ({ ...t, count: (tabJobs[t.key] || []).length }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter=""
        setStatusFilter={() => {}}
      />

      {currentJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          message="No jobs match your current filters. Try adjusting or chat with Emma to book a new job."
          showEmmaCta
          emmaText="Hi Emma, I'd like to book a job"
        />
      ) : (
        <div className="space-y-3">
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
