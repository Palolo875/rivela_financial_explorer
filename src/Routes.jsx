import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import FinancialQuestionInputPage from "pages/financial-question-input";
import InteractiveScenarioSimulatorPage from "pages/interactive-scenario-simulator";
import NeuroscienceInsightsLibraryPage from "pages/neuroscience-insights-library";
import FinancialHealthDashboardPage from "pages/financial-health-dashboard";
import FinancialDataEntryDashboardPage from "pages/financial-data-entry-dashboard";
import PersonalizedFinancialEquationVisualizationPage from "pages/personalized-financial-equation-visualization";
import UserProfileSetupPage from "pages/user-profile-setup";
import GlassmorphismDemo from "pages/glassmorphism-demo";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<FinancialHealthDashboardPage />} />
        <Route path="/financial-question-input" element={<FinancialQuestionInputPage />} />
        <Route path="/interactive-scenario-simulator" element={<InteractiveScenarioSimulatorPage />} />
        <Route path="/neuroscience-insights-library" element={<NeuroscienceInsightsLibraryPage />} />
        <Route path="/financial-health-dashboard" element={<FinancialHealthDashboardPage />} />
        <Route path="/financial-data-entry-dashboard" element={<FinancialDataEntryDashboardPage />} />
        <Route path="/personalized-financial-equation-visualization" element={<PersonalizedFinancialEquationVisualizationPage />} />
        <Route path="/user-profile-setup" element={<UserProfileSetupPage />} />
        <Route path="/glassmorphism-demo" element={<GlassmorphismDemo />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;