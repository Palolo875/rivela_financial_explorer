import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import EquationVisualization from './components/EquationVisualization';
import InsightCards from './components/InsightCards';
import WhatIfSimulator from './components/WhatIfSimulator';
import SocialProofCounter from './components/SocialProofCounter';
import AudioSynthesis from './components/AudioSynthesis';
import { generateFinancialEquation, generatePersonalizedInsights } from '../../services/aiService';

const PersonalizedFinancialEquationVisualization = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [showAudioSynthesis, setShowAudioSynthesis] = useState(false);
  const [currentEquation, setCurrentEquation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [revelationPhase, setRevelationPhase] = useState('loading');
  const [emotionalContext, setEmotionalContext] = useState(null);

  // Mock user data and equation
  const mockUserData = {
    name: 'Marie',
    completedSteps: 3,
    equation: {
      formula: "Dépenses Weekend × État Émotionnel = Dépassement Mensuel",
      variables: [
        {
          id: 'weekend_spending',
          name: 'Dépenses Weekend',
          value: 280,
          unit: '€',
          impact: 0.85,
          color: '#EF4444',
          description: 'Moyenne des dépenses de weekend sur 3 mois'
        },
        {
          id: 'emotional_state',
          name: 'État Émotionnel',
          value: 6.2,
          unit: '/10',
          impact: 0.72,
          color: '#F59E0B',
          description: 'Score moyen de stress financier'
        },
        {
          id: 'monthly_overage',
          name: 'Dépassement Mensuel',
          value: 420,
          unit: '€',
          impact: 1.0,
          color: '#DC2626',
          description: 'Montant moyen de dépassement budgétaire'
        }
      ],
      insights: [
        {
          id: 1,
          type: 'correlation',
          strength: 0.89,
          message: "Forte corrélation entre stress émotionnel et dépenses impulsives le weekend"
        },
        {
          id: 2,
          type: 'pattern',
          strength: 0.76,
          message: "Les dépenses augmentent de 34% quand le stress dépasse 7/10"
        }
      ]
    },
    emotionalProfile: {
      level: 6.2,
      color: '#F59E0B',
      trend: 'increasing',
      triggers: ['weekend', 'stress_work', 'social_pressure']
    }
  };

  // Initialize component with real AI data
  useEffect(() => {
    const initializeWithAI = async () => {
      setRevelationPhase('loading');
      
      try {
        // Get user data from localStorage or mock for now
        const userData = {
          financialData: JSON.parse(localStorage.getItem('rivela_financial_data') || '{}'),
          spendingPatterns: JSON.parse(localStorage.getItem('rivela_spending_patterns') || '{}'),
          emotionalState: parseInt(localStorage.getItem('rivela_emotional_state') || '6'),
          triggers: JSON.parse(localStorage.getItem('rivela_triggers') || '["weekend", "stress_work"]')
        };

        // Generate real AI equation
        const equation = await generateFinancialEquation(userData);
        const insights = await generatePersonalizedInsights(userData);
        
        setCurrentEquation(equation);
        setEmotionalContext({
          level: userData.emotionalState,
          color: '#F59E0B',
          trend: 'increasing',
          triggers: userData.triggers
        });
        
        setRevelationPhase('revealing');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setRevelationPhase('complete');
        
        // Show revelation notification with real AI insights
        setNotifications([{
          id: Date.now(),
          type: 'achievement',
          title: 'Révélation Financière IA !',
          message: `Votre équation personnalisée révèle des patterns cachés analysés par intelligence artificielle.`,
          details: `Équation générée: ${equation?.formula || 'Analyse en cours...'}`,
          action: {
            label: 'Explorer les insights',
            handler: () => {
              document.getElementById('insights-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }
          },
          persistent: true
        }]);

      } catch (error) {
        setRevelationPhase('complete');
        // Fallback to mock data if AI fails
        setCurrentEquation(mockUserData.equation);
        setEmotionalContext(mockUserData.emotionalProfile);
        
        setNotifications([{
          id: Date.now(),
          type: 'warning',
          title: 'Mode de démonstration',
          message: 'Utilisation des données de démonstration. Connectez-vous pour une analyse personnalisée.',
          persistent: false
        }]);
        
        // AI initialization failed - using fallback data
      }
    };

    initializeWithAI();
  }, []);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleVariableChange = (variableId, newValue) => {
    setCurrentEquation(prev => ({
      ...prev,
      variables: prev.variables.map(v => 
        v.id === variableId ? { ...v, value: newValue } : v
      )
    }));
  };

  const handleScenarioChange = (scenario) => {
    // Update equation with scenario data
    setCurrentEquation(prev => ({
      ...prev,
      variables: scenario.variables || prev.variables
    }));
    
    // Show scenario notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'insight',
      title: 'Scénario Appliqué',
      message: `Le scénario "${scenario.name}" a été appliqué à votre équation.`,
      details: `Impact estimé: ${scenario.impact?.balanceChange > 0 ? '+' : ''}${scenario.impact?.balanceChange}€/mois`
    }, ...prev]);
  };

  const handleInsightAction = (insight) => {
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      title: 'Action Planifiée',
      message: `L'insight "${insight.title}" a été ajouté à votre plan d'action.`,
      action: {
        label: 'Voir le plan',
        handler: () => navigate('/financial-health-dashboard')
      }
    }, ...prev]);
  };

  const handleSocialProofInsight = (insight) => {
    setNotifications(prev => [{
      id: Date.now(),
      type: 'insight',
      title: 'Insight Communautaire',
      message: `${insight.percentage}% des utilisateurs ont découvert: ${insight.title}`,
      details: `Impact moyen: +${insight.averageImpact}€/mois`
    }, ...prev]);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      {/* Notifications */}
      <NotificationBanner
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top"
        maxVisible={2}
        autoHideDelay={8000}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator
                currentStep={3}
                totalSteps={6}
                variant="detailed"
                showLabels={true}
              />
            </div>

            {/* Page Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Votre Équation Financière Personnalisée
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Découvrez les relations mathématiques cachées dans vos habitudes financières 
                  et révélez les patterns qui influencent votre situation économique.
                </p>
              </motion.div>
            </div>

            {/* Revelation Loading State */}
            <AnimatePresence>
              {revelationPhase === 'loading' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-16"
                >
                  <div className="glass rounded-2xl p-8 text-center max-w-md">
                    <div className="animate-spin mb-4 mx-auto">
                      <Icon name="RefreshCw" size={32} color="var(--color-primary)" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Analyse en cours...
                    </h3>
                    <p className="text-text-secondary">
                      Nous analysons vos données pour révéler votre équation personnalisée
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Equation Visualization */}
            <AnimatePresence>
              {revelationPhase !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative">
                    <EquationVisualization
                      equationData={currentEquation}
                      isFullscreen={isFullscreen}
                      onVariableChange={handleVariableChange}
                      emotionalContext={emotionalContext}
                    />
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleFullscreenToggle}
                        className="glass"
                      >
                        <Icon 
                          name={isFullscreen ? "Minimize2" : "Maximize2"} 
                          size={20} 
                        />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowWhatIf(true)}
                        className="glass"
                      >
                        <Icon name="Calculator" size={20} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowAudioSynthesis(!showAudioSynthesis)}
                        className="glass"
                      >
                        <Icon name="Volume2" size={20} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Audio Synthesis Panel */}
        <AnimatePresence>
          {showAudioSynthesis && revelationPhase === 'complete' && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 sm:px-6 lg:px-8 mb-8"
            >
              <div className="max-w-7xl mx-auto">
                <AudioSynthesis
                  equationData={currentEquation}
                  insights={currentEquation?.insights}
                  isVisible={showAudioSynthesis}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Insights Section */}
        <section id="insights-section" className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Insights Neuroscientifiques
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Découvrez les explications scientifiques derrière vos patterns financiers 
                  et les actions concrètes pour optimiser votre situation.
                </p>
              </div>
              
              <InsightCards
                insights={[]}
                onInsightAction={handleInsightAction}
              />
            </motion.div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Communauté Rivela
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Découvrez comment d'autres utilisateurs avec des profils similaires 
                  ont transformé leur situation financière.
                </p>
              </div>
              
              <SocialProofCounter
                showDetails={true}
                onInsightClick={handleSocialProofInsight}
              />
            </motion.div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Prochaines Étapes
                </h2>
                <p className="text-text-secondary">
                  Continuez votre exploration financière avec ces outils avancés.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6 cursor-pointer"
                  onClick={() => handleNavigation('/interactive-scenario-simulator')}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Simulateur de Scénarios
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Explorez différents scénarios financiers
                      </p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-4">
                    Testez l'impact de différentes décisions financières sur votre équation 
                    personnalisée et découvrez les stratégies optimales.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Explorer les scénarios</span>
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6 cursor-pointer"
                  onClick={() => handleNavigation('/neuroscience-insights-library')}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Icon name="Brain" size={24} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        Bibliothèque Neurosciences
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Approfondissez vos connaissances
                      </p>
                    </div>
                  </div>
                  <p className="text-text-secondary mb-4">
                    Explorez les principes neuroscientifiques qui expliquent vos comportements 
                    financiers et apprenez à les optimiser.
                  </p>
                  <div className="flex items-center text-secondary text-sm font-medium">
                    <span>Découvrir les insights</span>
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* What-If Simulator Modal */}
      <WhatIfSimulator
        isOpen={showWhatIf}
        onClose={() => setShowWhatIf(false)}
        currentEquation={currentEquation}
        onScenarioChange={handleScenarioChange}
      />

      {/* Particle Effects for Revelation */}
      <AnimatePresence>
        {revelationPhase === 'revealing' && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/60 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [null, Math.random() * window.innerHeight]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalizedFinancialEquationVisualization;