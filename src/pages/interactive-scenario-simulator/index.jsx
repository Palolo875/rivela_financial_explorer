import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import ScenarioTabs from './components/ScenarioTabs';
import ScenarioControls from './components/ScenarioControls';
import ScenarioVisualization from './components/ScenarioVisualization';
import ComparisonView from './components/ComparisonView';
import ActionPanel from './components/ActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InteractiveScenarioSimulator = () => {
  const [activeScenario, setActiveScenario] = useState('current');
  const [showComparison, setShowComparison] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock scenario data
  const [scenarios, setScenarios] = useState([
    {
      type: 'current',
      name: 'Situation Actuelle',
      description: 'Votre situation financière actuelle',
      parameters: {
        incomeChange: 0,
        expenseChange: 0,
        savingsRate: 15,
        goalTimeline: 24,
        riskTolerance: 40
      },
      monthlySavings: 850,
      overallHealthIndex: 68,
      goalAchievement: 75,
      timeToGoal: 24,
      improvement: 0,
      riskLevel: 'Modéré',
      healthIndex: {
        savings: 70,
        debt: 45,
        stability: 80,
        goals: 65
      },
      alerts: [
        {
          type: 'info',
          title: 'Situation stable',
          message: 'Votre situation financière actuelle est équilibrée avec un potentiel d\'amélioration.'
        },
        {
          type: 'warning',
          title: 'Frais cachés détectés',
          message: 'Nous avons identifié 127€ de frais récurrents qui pourraient être optimisés.'
        }
      ]
    },
    {
      type: 'optimistic',
      name: 'Scénario Optimiste',
      description: 'Conditions favorables et croissance',
      parameters: {
        incomeChange: 25,
        expenseChange: -10,
        savingsRate: 25,
        goalTimeline: 18,
        riskTolerance: 60
      },
      monthlySavings: 1340,
      overallHealthIndex: 85,
      goalAchievement: 95,
      timeToGoal: 18,
      improvement: 22.5,
      riskLevel: 'Élevé',
      healthIndex: {
        savings: 90,
        debt: 30,
        stability: 85,
        goals: 95
      },
      alerts: [
        {
          type: 'success',
          title: 'Excellent potentiel',
          message: 'Ce scénario vous permettrait d\'atteindre vos objectifs 6 mois plus tôt que prévu.'
        },
        {
          type: 'info',
          title: 'Opportunité d\'investissement',
          message: 'Avec cette épargne supplémentaire, vous pourriez diversifier vos investissements.'
        }
      ]
    },
    {
      type: 'conservative',
      name: 'Scénario Conservateur',
      description: 'Approche prudente et sécurisée',
      parameters: {
        incomeChange: -5,
        expenseChange: 5,
        savingsRate: 12,
        goalTimeline: 36,
        riskTolerance: 20
      },
      monthlySavings: 680,
      overallHealthIndex: 72,
      goalAchievement: 60,
      timeToGoal: 36,
      improvement: -8.3,
      riskLevel: 'Faible',
      healthIndex: {
        savings: 55,
        debt: 60,
        stability: 95,
        goals: 50
      },
      alerts: [
        {
          type: 'warning',
          title: 'Objectifs retardés',
          message: 'Dans ce scénario, vos objectifs financiers seraient atteints avec 12 mois de retard.'
        },
        {
          type: 'info',
          title: 'Sécurité maximale',
          message: 'Cette approche garantit une stabilité financière même en cas de difficultés.'
        }
      ]
    }
  ]);

  // Mock projection data for charts
  const projectionData = [
    { month: 'Jan', savings: 850, expenses: 2100, income: 3200 },
    { month: 'Fév', savings: 920, expenses: 2050, income: 3250 },
    { month: 'Mar', savings: 1050, expenses: 2000, income: 3300 },
    { month: 'Avr', savings: 1180, expenses: 1980, income: 3350 },
    { month: 'Mai', savings: 1250, expenses: 1950, income: 3400 },
    { month: 'Jun', savings: 1340, expenses: 1920, income: 3450 }
  ];

  useEffect(() => {
    // Show welcome notification
    const welcomeNotification = {
      id: Date.now(),
      type: 'insight',
      title: 'Simulateur de scénarios activé',
      message: 'Explorez différents scénarios financiers et découvrez leur impact sur vos objectifs.',
      details: 'Ajustez les paramètres en temps réel et comparez les résultats.',
      action: {
        label: 'Commencer l\'exploration',
        handler: () => console.log('Starting exploration...')
      }
    };
    setNotifications([welcomeNotification]);
  }, []);

  const handleParameterChange = (scenarioType, parameter, value) => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      setScenarios(prev => prev.map(scenario => {
        if (scenario.type === scenarioType) {
          const updatedParameters = {
            ...scenario.parameters,
            [parameter]: value
          };
          
          // Recalculate scenario metrics based on new parameters
          const newMonthlySavings = calculateMonthlySavings(updatedParameters);
          const newHealthIndex = calculateHealthIndex(updatedParameters);
          const newGoalAchievement = calculateGoalAchievement(updatedParameters);
          
          return {
            ...scenario,
            parameters: updatedParameters,
            monthlySavings: newMonthlySavings,
            overallHealthIndex: newHealthIndex,
            goalAchievement: newGoalAchievement,
            timeToGoal: Math.max(1, Math.round(36 - (newGoalAchievement / 100) * 24)),
            improvement: ((newMonthlySavings - 850) / 850) * 100
          };
        }
        return scenario;
      }));
      
      setIsCalculating(false);
      
      // Show calculation complete notification
      const calculationNotification = {
        id: Date.now(),
        type: 'success',
        title: 'Calculs mis à jour',
        message: 'Vos modifications ont été prises en compte et les projections actualisées.',
        persistent: false
      };
      setNotifications(prev => [calculationNotification, ...prev.slice(0, 2)]);
    }, 800);
  };

  const calculateMonthlySavings = (parameters) => {
    const base = 850;
    const incomeEffect = (parameters.incomeChange / 100) * base;
    const expenseEffect = -(parameters.expenseChange / 100) * base;
    const savingsEffect = (parameters.savingsRate - 15) * 20;
    return Math.max(0, Math.round(base + incomeEffect + expenseEffect + savingsEffect));
  };

  const calculateHealthIndex = (parameters) => {
    const base = 68;
    const incomeBonus = Math.max(0, parameters.incomeChange) * 0.3;
    const expenseBonus = Math.max(0, -parameters.expenseChange) * 0.4;
    const savingsBonus = Math.max(0, parameters.savingsRate - 15) * 0.8;
    return Math.min(100, Math.round(base + incomeBonus + expenseBonus + savingsBonus));
  };

  const calculateGoalAchievement = (parameters) => {
    const base = 75;
    const timelineEffect = (24 - parameters.goalTimeline) * 1.2;
    const savingsEffect = (parameters.savingsRate - 15) * 1.5;
    return Math.min(100, Math.max(0, Math.round(base + timelineEffect + savingsEffect)));
  };

  const handleSaveScenario = (scenarios) => {
    localStorage.setItem('financial_scenarios', JSON.stringify(scenarios));
    const saveNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Scénarios sauvegardés',
      message: 'Vos scénarios ont été sauvegardés localement avec succès.'
    };
    setNotifications(prev => [saveNotification, ...prev.slice(0, 2)]);
  };

  const handleExportPDF = (scenarios) => {
    // Simulate PDF export
    const exportNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Export PDF généré',
      message: 'Votre rapport de scénarios a été exporté au format PDF.',
      action: {
        label: 'Télécharger',
        handler: () => console.log('Downloading PDF...')
      }
    };
    setNotifications(prev => [exportNotification, ...prev.slice(0, 2)]);
  };

  const handleShareScenario = (scenarios, method) => {
    const shareNotification = {
      id: Date.now(),
      type: 'info',
      title: 'Partage préparé',
      message: `Vos scénarios sont prêts à être partagés ${method === 'email' ? 'par email' : method === 'link' ? 'via un lien' : 'sur les réseaux sociaux'}.`
    };
    setNotifications(prev => [shareNotification, ...prev.slice(0, 2)]);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const currentScenario = scenarios.find(s => s.type === activeScenario);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <NotificationBanner
        notifications={notifications}
        onDismiss={handleDismissNotification}
        position="top"
        maxVisible={3}
        autoHideDelay={5000}
      />

      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glass">
                  <Icon name="GitCompare" size={24} color="white" strokeWidth={2.5} />
                </div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
                  Simulateur de Scénarios
                </h1>
              </div>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Testez différents scénarios financiers et découvrez leur impact sur vos objectifs grâce à des projections en temps réel.
              </p>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={4} 
              totalSteps={6} 
              variant="minimal"
            />
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Scenario Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ScenarioTabs
                activeScenario={activeScenario}
                onScenarioChange={setActiveScenario}
                scenarios={scenarios}
              />
            </motion.div>

            {/* Toggle Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={!showComparison ? "default" : "outline"}
                onClick={() => setShowComparison(false)}
                iconName="Settings"
                iconPosition="left"
              >
                Paramètres
              </Button>
              <Button
                variant={showComparison ? "default" : "outline"}
                onClick={() => setShowComparison(true)}
                iconName="GitCompare"
                iconPosition="left"
              >
                Comparaison
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {!showComparison ? (
                <motion.div
                  key="parameters"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1">
                      <ScenarioControls
                        scenario={currentScenario}
                        onParameterChange={handleParameterChange}
                      />
                    </div>

                    {/* Visualization */}
                    <div className="lg:col-span-2">
                      <ScenarioVisualization
                        scenario={currentScenario}
                        projectionData={projectionData}
                      />
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-8">
                    <ScenarioControls
                      scenario={currentScenario}
                      onParameterChange={handleParameterChange}
                    />
                    <ScenarioVisualization
                      scenario={currentScenario}
                      projectionData={projectionData}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ComparisonView scenarios={scenarios} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ActionPanel
                scenarios={scenarios}
                onSaveScenario={handleSaveScenario}
                onExportPDF={handleExportPDF}
                onShareScenario={handleShareScenario}
              />
            </motion.div>
          </div>

          {/* Calculation Loading Overlay */}
          <AnimatePresence>
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <div className="glass rounded-xl p-6 flex items-center space-x-4">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      Calcul en cours...
                    </div>
                    <div className="text-sm text-text-secondary">
                      Mise à jour des projections financières
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default InteractiveScenarioSimulator;