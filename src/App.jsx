import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { NotificationProvider } from './context/NotificationContext';
import { JobProvider } from './context/JobContext';
import ErrorBoundary from './components/shared/ErrorBoundary';
import AppShell from './components/layout/AppShell';
import LoadingSpinner from './components/shared/LoadingSpinner';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PropertiesListPage from './pages/PropertiesListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AllJobsPage from './pages/AllJobsPage';
import JobDetailPage from './pages/JobDetailPage';
import AllDocumentsPage from './pages/AllDocumentsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <PropertyProvider>
              <NotificationProvider>
                <JobProvider>
                  <AppShell />
                </JobProvider>
              </NotificationProvider>
            </PropertyProvider>
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesListPage />} />
        <Route path="/properties/:eircode" element={<PropertyDetailPage />} />
        <Route path="/properties/:eircode/jobs" element={<PropertyDetailPage />} />
        <Route path="/properties/:eircode/home-team" element={<PropertyDetailPage />} />
        <Route path="/properties/:eircode/documents" element={<PropertyDetailPage />} />
        <Route path="/properties/:eircode/warranties" element={<PropertyDetailPage />} />
        <Route path="/properties/:eircode/past-jobs" element={<PropertyDetailPage />} />
        <Route path="/jobs" element={<AllJobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/documents" element={<AllDocumentsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
}
