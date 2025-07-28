
import React, { Suspense } from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading des pages pour optimiser les performances
const UserProfileSetup = React.lazy(() => import('./pages/user-profile-setup'));
const FinancialDataEntryDashboard = React.lazy(() => import('./pages/financial-data-entry-dashboard'));
const FinancialHealthDashboard = React.lazy(() => import('./pages/financial-health-dashboard'));
const FinancialQuestionInput = React.lazy(() => import('./pages/financial-question-input'));
const PersonalizedFinancialEquationVisualization = React.lazy(() => import('./pages/personalized-financial-equation-visualization'));
const InteractiveScenarioSimulator = React.lazy(() => import('./pages/interactive-scenario-simulator'));
const NeuroscienceInsightsLibrary = React.lazy(() => import('./pages/neuroscience-insights-library'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-text-secondary">Chargement...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterRoutes>
          {/* Redirection par défaut vers le profil utilisateur */}
          <Route path="/" element={<Navigate to="/profile-setup" replace />} />
          
          {/* Configuration du profil utilisateur */}
          <Route path="/profile-setup" element={<UserProfileSetup />} />
          
          {/* Saisie des données financières */}
          <Route path="/financial-data-entry" element={<FinancialDataEntryDashboard />} />
          
          {/* Tableau de bord de santé financière */}
          <Route path="/health-dashboard" element={<FinancialHealthDashboard />} />
          
          {/* Saisie de questions financières */}
          <Route path="/financial-questions" element={<FinancialQuestionInput />} />
          
          {/* Visualisation de l'équation financière personnalisée */}
          <Route path="/equation-visualization" element={<PersonalizedFinancialEquationVisualization />} />
          
          {/* Simulateur de scénarios interactifs */}
          <Route path="/scenario-simulator" element={<InteractiveScenarioSimulator />} />
          
          {/* Bibliothèque d'insights neuroscientifiques */}
          <Route path="/insights-library" element={<NeuroscienceInsightsLibrary />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
