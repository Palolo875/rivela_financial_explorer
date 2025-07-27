import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightCards = ({ insights = [], onInsightAction }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock insights data
  const mockInsights = insights.length > 0 ? insights : [
    {
      id: 1,
      category: 'behavioral',
      type: 'spending_pattern',
      title: 'Dépenses Émotionnelles Détectées',
      summary: 'Vos achats augmentent de 45% les jours de stress élevé',
      impact: 'high',
      confidence: 0.89,
      neuroscience: {
        principle: 'Système de Récompense Dopaminergique',
        explanation: `Le stress active le système de récompense du cerveau, poussant à chercher des gratifications immédiates comme les achats impulsifs.`,
        source: 'Journal of Consumer Psychology, 2023',
        credibility: 'peer_reviewed'
      },
      data: {
        correlation: 0.78,
        sample_size: 90,
        time_period: '3 mois'
      },
      actionable: {
        suggestion: 'Créer une pause de 24h avant tout achat non-essentiel',
        potential_savings: 280,
        difficulty: 'medium'
      },
      visualization: {
        type: 'trend',
        data: [120, 180, 95, 220, 160, 190, 85]
      }
    },
    {
      id: 2,
      category: 'financial',
      type: 'hidden_costs',
      title: 'Frais Cachés Identifiés',
      summary: '€47/mois en frais récurrents non-optimisés',
      impact: 'medium',
      confidence: 0.95,
      neuroscience: {
        principle: 'Biais de Négligence des Petits Montants',
        explanation: `Le cerveau tend à ignorer les petites dépenses récurrentes, créant un angle mort cognitif coûteux.`,
        source: 'Behavioral Economics Review, 2023',
        credibility: 'peer_reviewed'
      },
      data: {
        monthly_impact: 47,
        annual_impact: 564,
        categories: ['Abonnements', 'Frais bancaires', 'Services auto-renouvelés']
      },
      actionable: {
        suggestion: 'Audit mensuel des abonnements et négociation des frais',
        potential_savings: 564,
        difficulty: 'easy'
      }
    },
    {
      id: 3,
      category: 'goal',
      type: 'progress_insight',
      title: 'Accélération Possible des Objectifs',
      summary: 'Objectif épargne atteignable 3 mois plus tôt',
      impact: 'high',
      confidence: 0.82,
      neuroscience: {
        principle: 'Motivation par Proximité d\'Objectif',
        explanation: `La perception de proximité d'un objectif active les circuits de motivation et améliore la persévérance.`,
        source: 'Psychological Science, 2023',
        credibility: 'peer_reviewed'
      },
      data: {
        current_timeline: '18 mois',
        optimized_timeline: '15 mois',
        required_adjustment: '12% d\'épargne supplémentaire'
      },
      actionable: {
        suggestion: 'Rediriger les économies de frais cachés vers l\'épargne',
        potential_gain: 3,
        difficulty: 'easy'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'Tous', icon: 'Grid3X3' },
    { id: 'behavioral', label: 'Comportemental', icon: 'Brain' },
    { id: 'financial', label: 'Financier', icon: 'TrendingUp' },
    { id: 'goal', label: 'Objectifs', icon: 'Target' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'CheckCircle2';
      default: return 'Info';
    }
  };

  const getCredibilityBadge = (credibility) => {
    switch (credibility) {
      case 'peer_reviewed':
        return { icon: 'Award', color: 'text-success', label: 'Étude Validée' };
      case 'research':
        return { icon: 'BookOpen', color: 'text-primary', label: 'Recherche' };
      default:
        return { icon: 'Info', color: 'text-text-secondary', label: 'Information' };
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? mockInsights 
    : mockInsights.filter(insight => insight.category === selectedCategory);

  const toggleExpanded = (insightId) => {
    setExpandedCard(expandedCard === insightId ? null : insightId);
  };

  const handleAction = (insight) => {
    if (onInsightAction) {
      onInsightAction(insight);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            iconName={category.icon}
            iconPosition="left"
            onClick={() => setSelectedCategory(category.id)}
            className="text-xs"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredInsights.map((insight) => {
            const isExpanded = expandedCard === insight.id;
            const impactColor = getImpactColor(insight.impact);
            const impactIcon = getImpactIcon(insight.impact);
            const credibilityBadge = getCredibilityBadge(insight.neuroscience?.credibility);

            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`glass rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                {/* Card Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-black/5 transition-colors"
                  onClick={() => toggleExpanded(insight.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={impactIcon} 
                        size={18} 
                        color={`var(--color-${insight.impact === 'high' ? 'error' : insight.impact === 'medium' ? 'warning' : 'success'})`}
                      />
                      <h3 className="font-heading font-semibold text-sm text-foreground">
                        {insight.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Confidence indicator */}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-xs text-text-secondary">
                          {Math.round(insight.confidence * 100)}%
                        </span>
                      </div>
                      <Icon 
                        name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                        color="var(--color-text-secondary)" 
                      />
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-3">
                    {insight.summary}
                  </p>

                  {/* Quick stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={14} color="var(--color-primary)" />
                        <span className="text-xs text-primary font-medium">
                          Impact {insight.impact}
                        </span>
                      </div>
                      {credibilityBadge && (
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={credibilityBadge.icon} 
                            size={14} 
                            color={`var(--color-${credibilityBadge.color.replace('text-', '')})`}
                          />
                          <span className={`text-xs ${credibilityBadge.color} font-medium`}>
                            {credibilityBadge.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border/20"
                    >
                      <div className="p-4 space-y-4">
                        {/* Neuroscience Explanation */}
                        {insight.neuroscience && (
                          <div className="glass rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Icon name="Brain" size={16} color="var(--color-primary)" />
                              <h4 className="font-heading font-semibold text-sm text-foreground">
                                Base Neuroscientifique
                              </h4>
                            </div>
                            <h5 className="font-medium text-sm text-primary mb-2">
                              {insight.neuroscience.principle}
                            </h5>
                            <p className="text-sm text-text-secondary mb-3">
                              {insight.neuroscience.explanation}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Icon name="ExternalLink" size={12} color="var(--color-text-secondary)" />
                              <span className="text-xs text-text-secondary">
                                Source: {insight.neuroscience.source}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Data Details */}
                        {insight.data && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(insight.data).map(([key, value]) => (
                              <div key={key} className="glass rounded-lg p-3">
                                <div className="text-xs text-text-secondary mb-1 capitalize">
                                  {key.replace('_', ' ')}
                                </div>
                                <div className="font-semibold text-sm text-foreground">
                                  {typeof value === 'number' ? (key.includes('correlation') ? `${Math.round(value * 100)}%` : value) : 
                                    value
                                  }
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Actionable Suggestions */}
                        {insight.actionable && (
                          <div className="glass rounded-lg p-4 bg-primary/5">
                            <div className="flex items-center space-x-2 mb-3">
                              <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                              <h4 className="font-heading font-semibold text-sm text-foreground">
                                Action Recommandée
                              </h4>
                            </div>
                            <p className="text-sm text-text-secondary mb-3">
                              {insight.actionable.suggestion}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {insight.actionable.potential_savings && (
                                  <div className="flex items-center space-x-1">
                                    <Icon name="PiggyBank" size={14} color="var(--color-success)" />
                                    <span className="text-xs text-success font-medium">
                                      +€{insight.actionable.potential_savings}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-1">
                                  <Icon name="Gauge" size={14} color="var(--color-text-secondary)" />
                                  <span className="text-xs text-text-secondary capitalize">
                                    {insight.actionable.difficulty}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction(insight)}
                                className="text-xs"
                              >
                                Appliquer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredInsights.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Aucun insight trouvé
          </h3>
          <p className="text-text-secondary">
            Aucun insight disponible pour cette catégorie.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InsightCards;