import { createContext, useContext, useState, useMemo } from 'react';
import { mockJobs } from '../data/mockJobs';
import { isJobActive } from '../utils/helpers';

const JobContext = createContext(null);

export function JobProvider({ children }) {
  const [jobs] = useState(mockJobs);

  const activeJobs = useMemo(() => jobs.filter((j) => isJobActive(j.status)), [jobs]);

  const getJobsByProperty = (eircode) => jobs.filter((j) => j.property_eircode === eircode);

  const getJobById = (jobId) => jobs.find((j) => j.id === jobId);

  const completedJobs = useMemo(() => jobs.filter((j) => j.status === 'COMPLETED'), [jobs]);

  const totalSpend = useMemo(
    () => completedJobs.reduce((sum, j) => sum + (j.final_amount || 0), 0),
    [completedJobs]
  );

  return (
    <JobContext.Provider
      value={{ jobs, activeJobs, completedJobs, totalSpend, getJobsByProperty, getJobById }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used within JobProvider');
  return ctx;
}
