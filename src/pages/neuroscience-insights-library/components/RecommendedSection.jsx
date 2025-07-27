import React from 'react';
import Icon from '../../../components/AppIcon';
import InsightCard from './InsightCard';

const RecommendedSection = ({ 
  recommendations, 
  onBookmark, 
  onShare, 
  bookmarkedInsights = [] 
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center">
            <Icon name="Sparkles" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              Recommandé pour vous
            </h2>
            <p className="text-sm text-text-secondary">
              Basé sur vos patterns comportementaux détectés
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="TrendingUp" size={14} />
          <span>Mis à jour quotidiennement</span>
        </div>
      </div>

      {/* Recommendation Reasons */}
      <div className="glass rounded-xl p-4 border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={20} color="var(--color-accent)" />
          <div>
            <h3 className="font-heading font-semibold text-base text-foreground mb-2">
              Pourquoi ces recommandations ?
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle2" size={14} color="var(--color-success)" />
                <span className="text-sm text-text-primary">
                  Dépenses émotionnelles détectées dans vos données
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle2" size={14} color="var(--color-success)" />
                <span className="text-sm text-text-primary">
                  Patterns de stress financier identifiés
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle2" size={14} color="var(--color-success)" />
                <span className="text-sm text-text-primary">
                  Opportunités d'optimisation comportementale
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            onBookmark={onBookmark}
            onShare={onShare}
            isBookmarked={bookmarkedInsights.includes(insight.id)}
            isRecommended={true}
          />
        ))}
      </div>

      {/* Learning Path Suggestion */}
      <div className="glass rounded-xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Route" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Parcours d'apprentissage suggéré
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Suivez ce parcours personnalisé pour maximiser votre compréhension des mécanismes financiers
            </p>
            
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: "Comprendre vos déclencheurs émotionnels",
                  duration: "15 min",
                  completed: true
                },
                {
                  step: 2,
                  title: "Identifier les biais dans vos décisions",
                  duration: "20 min",
                  completed: false,
                  current: true
                },
                {
                  step: 3,
                  title: "Développer des stratégies de contrôle",
                  duration: "25 min",
                  completed: false
                }
              ].map((pathStep) => (
                <div key={pathStep.step} className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${pathStep.completed 
                      ? 'bg-success text-white' 
                      : pathStep.current 
                        ? 'bg-primary text-white animate-pulse' :'bg-muted text-text-secondary'
                    }
                  `}>
                    {pathStep.completed ? (
                      <Icon name="Check" size={14} />
                    ) : (
                      pathStep.step
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`
                      text-sm font-medium
                      ${pathStep.current ? 'text-primary' : 'text-foreground'}
                    `}>
                      {pathStep.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {pathStep.duration}
                    </div>
                  </div>
                  {pathStep.current && (
                    <Icon name="ArrowRight" size={16} color="var(--color-primary)" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;