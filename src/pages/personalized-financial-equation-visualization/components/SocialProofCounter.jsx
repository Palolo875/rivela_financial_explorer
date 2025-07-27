import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SocialProofCounter = ({ 
  className = "",
  showDetails = false,
  onInsightClick 
}) => {
  const [currentStats, setCurrentStats] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Mock social proof data
  const socialProofData = {
    totalUsers: 12847,
    activeToday: 1234,
    insightsGenerated: 45623,
    averageSavings: 340,
    topInsights: [
      {
        id: 1,
        category: 'spending_pattern',
        title: 'Dépenses émotionnelles détectées',
        percentage: 78,
        userCount: 10021,
        averageImpact: 280,
        icon: 'Heart'
      },
      {
        id: 2,
        category: 'hidden_costs',
        title: 'Frais cachés identifiés',
        percentage: 65,
        userCount: 8350,
        averageImpact: 156,
        icon: 'Eye'
      },
      {
        id: 3,
        category: 'goal_optimization',
        title: 'Objectifs optimisés',
        percentage: 52,
        userCount: 6680,
        averageImpact: 420,
        icon: 'Target'
      },
      {
        id: 4,
        category: 'behavioral_change',
        title: 'Changements comportementaux',
        percentage: 43,
        userCount: 5524,
        averageImpact: 195,
        icon: 'TrendingUp'
      }
    ],
    recentActivity: [
      { action: 'insight_generated', count: 23, timeframe: '5 min' },
      { action: 'goal_achieved', count: 7, timeframe: '15 min' },
      { action: 'pattern_discovered', count: 12, timeframe: '30 min' }
    ],
    demographics: {
      ageGroups: [
        { range: '25-34', percentage: 42 },
        { range: '35-44', percentage: 31 },
        { range: '18-24', percentage: 16 },
        { range: '45+', percentage: 11 }
      ],
      topRegions: [
        { name: 'Île-de-France', percentage: 28 },
        { name: 'Auvergne-Rhône-Alpes', percentage: 15 },
        { name: 'Nouvelle-Aquitaine', percentage: 12 }
      ]
    }
  };

  // Animate counters on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        activeToday: socialProofData.activeToday + Math.floor(Math.random() * 10),
        insightsGenerated: socialProofData.insightsGenerated + Math.floor(Math.random() * 5)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const AnimatedCounter = ({ value, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isAnimating) return;
      
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [value, duration, isAnimating]);

    return (
      <span className="font-bold">
        {count.toLocaleString('fr-FR')}{suffix}
      </span>
    );
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
    if (onInsightClick) {
      onInsightClick(insight);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Stats */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={16} color="var(--color-primary)" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Communauté Rivela
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              <AnimatedCounter value={socialProofData.totalUsers} />
            </div>
            <div className="text-xs text-text-secondary">
              Utilisateurs actifs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              <AnimatedCounter 
                value={currentStats.activeToday || socialProofData.activeToday} 
              />
            </div>
            <div className="text-xs text-text-secondary">
              Actifs aujourd'hui
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              <AnimatedCounter 
                value={currentStats.insightsGenerated || socialProofData.insightsGenerated} 
              />
            </div>
            <div className="text-xs text-text-secondary">
              Insights générés
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              <AnimatedCounter value={socialProofData.averageSavings} suffix="€" />
            </div>
            <div className="text-xs text-text-secondary">
              Économies moyennes
            </div>
          </div>
        </div>
      </div>

      {/* Top Insights */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-semibold text-base text-foreground">
            Insights Populaires
          </h4>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-text-secondary">En temps réel</span>
          </div>
        </div>

        <div className="space-y-3">
          {socialProofData.topInsights.map((insight) => (
            <motion.button
              key={insight.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInsightClick(insight)}
              className="w-full glass rounded-lg p-3 text-left hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={insight.icon} 
                    size={16} 
                    color="var(--color-primary)" 
                  />
                  <div>
                    <div className="font-medium text-sm text-foreground">
                      {insight.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {insight.userCount.toLocaleString('fr-FR')} utilisateurs
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">
                    {insight.percentage}%
                  </div>
                  <div className="text-xs text-success">
                    +{insight.averageImpact}€
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 w-full bg-muted rounded-full h-1">
                <motion.div 
                  className="bg-primary h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${insight.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-4">
        <h4 className="font-heading font-semibold text-base text-foreground mb-4">
          Activité Récente
        </h4>
        
        <div className="space-y-2">
          {socialProofData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-foreground">
                  {activity.action === 'insight_generated' && 'Insights générés'}
                  {activity.action === 'goal_achieved' && 'Objectifs atteints'}
                  {activity.action === 'pattern_discovered' && 'Patterns découverts'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-primary">
                  +{activity.count}
                </span>
                <span className="text-xs text-text-secondary">
                  {activity.timeframe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics (if showDetails is true) */}
      {showDetails && (
        <div className="glass rounded-xl p-4">
          <h4 className="font-heading font-semibold text-base text-foreground mb-4">
            Profil de la Communauté
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age Groups */}
            <div>
              <h5 className="font-medium text-sm text-foreground mb-2">
                Tranches d'âge
              </h5>
              <div className="space-y-2">
                {socialProofData.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {group.range} ans
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground font-medium">
                        {group.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Regions */}
            <div>
              <h5 className="font-medium text-sm text-foreground mb-2">
                Régions principales
              </h5>
              <div className="space-y-2">
                {socialProofData.demographics.topRegions.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {region.name}
                    </span>
                    <span className="text-xs text-foreground font-medium">
                      {region.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Insight Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-1000 flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={selectedInsight.icon} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {selectedInsight.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} color="var(--color-text-secondary)" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">
                      {selectedInsight.percentage}%
                    </div>
                    <div className="text-xs text-text-secondary">
                      Taux de détection
                    </div>
                  </div>
                  <div className="glass rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">
                      +{selectedInsight.averageImpact}€
                    </div>
                    <div className="text-xs text-text-secondary">
                      Impact moyen
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-3">
                  <div className="text-sm text-text-secondary mb-1">
                    Utilisateurs concernés
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {selectedInsight.userCount.toLocaleString('fr-FR')}
                  </div>
                </div>

                <p className="text-sm text-text-secondary">
                  Cet insight a été découvert par {selectedInsight.percentage}% des utilisateurs 
                  de Rivela, avec un impact financier moyen de +{selectedInsight.averageImpact}€ 
                  par mois.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofCounter;