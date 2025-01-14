import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import LayoutWrapper from './layouts/LayoutWrapper';
import { routeLayouts } from './config';
import AuthGuard from './guards/AuthGuard';
import { AuthProvider } from './store/AuthContext';
import LayerProvider from './store/LayerProvider';
import StateChangerProvider from './store/StateChanger/StateChangerProvider';
// Pages Components
import AdminPage from './pages/admin/AdminPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import AuthPage from './pages/auth/AuthPage';
import FeaturesLabPage from './pages/features-lab/FeaturesLabPage';
import FiltersPage from './pages/filters/FiltersPage';
import FormsPage from './pages/forms/FormsPage';
import NotificationDashboardPage from './pages/notification-dashboard/NotificationDashboardPage';
import ProtectedPage from './pages/protected/ProtectedPage';
import ReportingPage from './pages/reporting/ReportingPage';
// Genesis Components
import './share/genesis-components';

export const routes = {
  admin: '/admin',
  analytics: '/analytics',
  auth: '/auth',
  featuresLab: '/features-lab',
  filters: '/filters',
  forms: '/forms',
  notificationDashboard: '/notification-dashboard',
  protected: '/protected',
  reporting: '/reporting',
}

const LayoutWithLocation = () => {
  const location = useLocation();
  const layout = routeLayouts[location.pathname] || 'default';

  let pageComponent;

  switch (location.pathname) {
    case routes.admin:
      pageComponent = <AdminPage />;
      break;
    case routes.analytics:
      pageComponent = <AnalyticsPage />;
      break;
    case routes.auth:
      pageComponent = <AuthPage />;
      break;
    case routes.featuresLab:
      pageComponent = <FeaturesLabPage />;
      break;
    case routes.filters:
      pageComponent = <FiltersPage />;
      break;
    case routes.forms:
      pageComponent = <FormsPage />;
      break;
    case routes.notificationDashboard:
      pageComponent = <NotificationDashboardPage />;
      break;
    case routes.protected:
      pageComponent = <ProtectedPage />;
      break;
    case routes.reporting:
      pageComponent = <ReportingPage />;
      break;
    default:
      pageComponent = <AuthPage />;
  }

  if (
    location.pathname === '/auth' ||
    location.pathname === '/'
  ) {
    return <LayoutWrapper layout={layout}>{pageComponent}</LayoutWrapper>;
  } else {
    return (
      <AuthGuard>
        <LayoutWrapper layout={layout}>{pageComponent}</LayoutWrapper>
      </AuthGuard>
    );
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LayerProvider>
        <StateChangerProvider>
          <Router>
            <Routes>
              <Route path="*" element={<LayoutWithLocation />} />
            </Routes>
          </Router>
        </StateChangerProvider>
      </LayerProvider>
    </AuthProvider>
  );
};

export default App;
