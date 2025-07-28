import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import tab components
import IncomeSourcesTab from './components/IncomeSourcesTab';
import FixedExpensesTab from './components/FixedExpensesTab';
import VariableExpensesTab from './components/VariableExpensesTab';
import DebtsTab from './components/DebtsTab';
import FinancialGoalsTab from './components/FinancialGoalsTab';
import DataCompletionProgress from './components/DataCompletionProgress';
import QuickAddFloatingButton from './components/QuickAddFloatingButton';

const FinancialDataEntryDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Data states
  const [incomeData, setIncomeData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [variableExpensesData, setVariableExpensesData] = useState([]);
  const [debtsData, setDebtsData] = useState([]);
  const [goalsData, setGoalsData] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedIncome = localStorage.getItem('rivela_income_data');
        const storedExpenses = localStorage.getItem('rivela_expenses_data');
        const storedVariableExpenses = localStorage.getItem('rivela_variable_expenses_data');
        const storedDebts = localStorage.getItem('rivela_debts_data');
        const storedGoals = localStorage.getItem('rivela_goals_data');

        if (storedIncome) setIncomeData(JSON.parse(storedIncome));
        if (storedExpenses) setExpensesData(JSON.parse(storedExpenses));
        if (storedVariableExpenses) setVariableExpensesData(JSON.parse(storedVariableExpenses));
        if (storedDebts) setDebtsData(JSON.parse(storedDebts));
        if (storedGoals) setGoalsData(JSON.parse(storedGoals));
      } catch (error) {
        // Error loading stored data - using defaults
        addNotification({
          type: 'error',
          title: 'Erreur de chargement',
          message: 'Impossible de charger vos données sauvegardées. Vous pouvez recommencer la saisie.'
        });
      }
    };

    loadStoredData();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      try {
        localStorage.setItem('rivela_income_data', JSON.stringify(incomeData));
        localStorage.setItem('rivela_expenses_data', JSON.stringify(expensesData));
        localStorage.setItem('rivela_variable_expenses_data', JSON.stringify(variableExpensesData));
        localStorage.setItem('rivela_debts_data', JSON.stringify(debtsData));
        localStorage.setItem('rivela_goals_data', JSON.stringify(goalsData));
        
        if (hasUnsavedChanges) {
          setHasUnsavedChanges(false);
          addNotification({
            type: 'success',
            title: 'Données sauvegardées',
            message: 'Vos informations ont été automatiquement sauvegardées.',
            autoHide: true
          });
        }
      } catch (error) {
        // Error saving data
        addNotification({
          type: 'error',
          title: 'Erreur de sauvegarde',
          message: 'Impossible de sauvegarder vos données. Vérifiez l\'espace de stockage disponible.'
        });
      }
    };

    const saveTimer = setTimeout(autoSave, 2000);
    return () => clearTimeout(saveTimer);
  }, [incomeData, expensesData, variableExpensesData, debtsData, goalsData, hasUnsavedChanges]);

  const tabs = [
    {
      id: 'income',
      label: 'Sources de revenus',
      icon: 'TrendingUp',
      color: 'success',
      component: IncomeSourcesTab,
      props: { incomeData, onUpdateIncome: setIncomeData }
    },
    {
      id: 'expenses',
      label: 'Dépenses fixes',
      icon: 'Home',
      color: 'error',
      component: FixedExpensesTab,
      props: { expensesData, onUpdateExpenses: setExpensesData }
    },
    {
      id: 'variable',
      label: 'Dépenses variables',
      icon: 'Activity',
      color: 'warning',
      component: VariableExpensesTab,
      props: { variableExpensesData, onUpdateVariableExpenses: setVariableExpensesData }
    },
    {
      id: 'debts',
      label: 'Dettes',
      icon: 'CreditCard',
      color: 'error',
      component: DebtsTab,
      props: { debtsData, onUpdateDebts: setDebtsData }
    },
    {
      id: 'goals',
      label: 'Objectifs financiers',
      icon: 'Target',
      color: 'primary',
      component: FinancialGoalsTab,
      props: { goalsData, onUpdateGoals: setGoalsData }
    }
  ];

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleQuickAdd = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleDataChange = () => {
    setHasUnsavedChanges(true);
  };

  const calculateCompletionPercentage = () => {
    const sections = [
      { data: incomeData, min: 1 },
      { data: expensesData, min: 3 },
      { data: variableExpensesData, min: 2 },
      { data: debtsData, min: 0 },
      { data: goalsData, min: 1 }
    ];

    const totalProgress = sections.reduce((sum, section) => {
      const progress = section.min === 0 
        ? (section.data.length > 0 ? 100 : 0)
        : Math.min((section.data.length / section.min) * 100, 100);
      return sum + progress;
    }, 0) / sections.length;

    return Math.round(totalProgress);
  };

  const canProceedToNextStep = () => {
    return incomeData.length >= 1 && 
           expensesData.length >= 3 && 
           variableExpensesData.length >= 2 && 
           goalsData.length >= 1;
  };

  const handleContinueToEquation = () => {
    if (canProceedToNextStep()) {
      navigate('/personalized-financial-equation-visualization');
    } else {
      addNotification({
        type: 'warning',
        title: 'Données incomplètes',
        message: 'Veuillez compléter les sections requises avant de continuer.',
        details: 'Au minimum: 1 source de revenus, 3 dépenses fixes, 2 dépenses variables et 1 objectif financier.'
      });
    }
  };

  const getTabColorClasses = (color, isActive) => {
    const colors = {
      success: isActive ? 'bg-success/10 text-success border-success/20' : 'text-text-secondary hover:text-success hover:bg-success/5',
      error: isActive ? 'bg-error/10 text-error border-error/20' : 'text-text-secondary hover:text-error hover:bg-error/5',
      warning: isActive ? 'bg-warning/10 text-warning border-warning/20' : 'text-text-secondary hover:text-warning hover:bg-warning/5',
      primary: isActive ? 'bg-primary/10 text-primary border-primary/20' : 'text-text-secondary hover:text-primary hover:bg-primary/5'
    };
    return colors[color] || colors.primary;
  };

  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={2} 
              totalSteps={6}
              variant="detailed"
            />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Saisie des données financières
                </h1>
                <p className="text-text-secondary">
                  Renseignez vos informations financières pour générer votre équation personnalisée
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {calculateCompletionPercentage()}%
                  </div>
                  <div className="text-xs text-text-secondary">
                    Complété
                  </div>
                </div>
                
                {canProceedToNextStep() && (
                  <Button
                    onClick={handleContinueToEquation}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    <Icon name="ArrowRight" size={16} color="white" />
                    <span className="ml-2">Générer l'équation</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Progress & Navigation */}
            <div className="lg:col-span-1 space-y-6">
              {/* Data Completion Progress */}
              <DataCompletionProgress
                incomeData={incomeData}
                expensesData={expensesData}
                variableExpensesData={variableExpensesData}
                debtsData={debtsData}
                goalsData={goalsData}
              />

              {/* Tab Navigation - Desktop */}
              <div className="hidden lg:block glass rounded-xl p-4 border border-border/20">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Sections
                </h3>
                <nav className="space-y-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(index)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                        font-medium text-sm transition-all duration-200
                        ${getTabColorClasses(tab.color, activeTab === index)}
                        ${activeTab === index ? 'border' : ''}
                      `}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={18} 
                        color={activeTab === index ? `var(--color-${tab.color})` : 'currentColor'}
                      />
                      <span className="flex-1 text-left">{tab.label}</span>
                      {activeTab === index && (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation - Mobile */}
              <div className="lg:hidden mb-6">
                <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(index)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-md
                        font-medium text-xs whitespace-nowrap transition-all duration-200
                        ${activeTab === index 
                          ? 'bg-surface text-foreground shadow-sm' 
                          : 'text-text-secondary hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={16} 
                        color="currentColor"
                      />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="glass rounded-xl p-6 border border-border/20 min-h-[600px]">
                <ActiveTabComponent 
                  {...tabs[activeTab].props}
                  onDataChange={handleDataChange}
                />
              </div>

              {/* Continue Button - Mobile */}
              <div className="md:hidden mt-6">
                {canProceedToNextStep() ? (
                  <Button
                    onClick={handleContinueToEquation}
                    className="w-full bg-gradient-to-r from-primary to-secondary"
                    size="lg"
                  >
                    <Icon name="ArrowRight" size={20} color="white" />
                    <span className="ml-2">Générer l'équation financière</span>
                  </Button>
                ) : (
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mx-auto mb-2" />
                    <p className="text-sm text-warning font-medium mb-1">
                      Données incomplètes
                    </p>
                    <p className="text-xs text-text-secondary">
                      Complétez {calculateCompletionPercentage()}% pour continuer
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Floating Button */}
      <QuickAddFloatingButton 
        onQuickAdd={handleQuickAdd}
        activeTab={activeTab}
      />

      {/* Notifications */}
      <NotificationBanner
        notifications={notifications}
        onDismiss={handleDismissNotification}
        position="top"
        maxVisible={3}
        autoHideDelay={4000}
      />
    </div>
  );
};

export default FinancialDataEntryDashboard;