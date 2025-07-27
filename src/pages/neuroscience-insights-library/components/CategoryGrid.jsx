import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryGrid = ({ onCategorySelect, selectedCategory = '' }) => {
  const categories = [
    {
      id: 'emotional-triggers',
      name: 'Déclencheurs Émotionnels',
      description: 'Comment les émotions influencent vos décisions financières',
      icon: 'Heart',
      color: 'from-error to-warning',
      count: 8,
      insights: [
        'Dépenses de compensation émotionnelle',
        'Impact du stress sur les achats impulsifs',
        'Thérapie par le shopping'
      ]
    },
    {
      id: 'decision-fatigue',
      name: 'Fatigue Décisionnelle',
      description: 'Pourquoi nous prenons de mauvaises décisions quand nous sommes fatigués',
      icon: 'Brain',
      color: 'from-primary to-secondary',
      count: 6,
      insights: [
        'Épuisement mental et choix financiers',
        'Optimisation de la prise de décision',
        'Moments critiques de la journée'
      ]
    },
    {
      id: 'reward-psychology',
      name: 'Psychologie des Récompenses',
      description: 'Le système de récompense du cerveau et l\'argent',
      icon: 'Trophy',
      color: 'from-accent to-warning',
      count: 7,
      insights: [
        'Dopamine et gratification immédiate',
        'Récompenses différées vs immédiates',
        'Addiction aux achats'
      ]
    },
    {
      id: 'cognitive-biases',
      name: 'Biais Cognitifs',
      description: 'Les raccourcis mentaux qui nous trompent avec l\'argent',
      icon: 'Eye',
      color: 'from-secondary to-primary',
      count: 9,
      insights: [
        'Biais de confirmation financier',
        'Effet d\'ancrage sur les prix',
        'Aversion aux pertes'
      ]
    },
    {
      id: 'financial-habits',
      name: 'Habitudes Financières',
      description: 'Comment se forment et se changent nos habitudes d\'argent',
      icon: 'Repeat',
      color: 'from-success to-secondary',
      count: 5,
      insights: [
        'Formation des habitudes d\'épargne',
        'Automatisation des décisions',
        'Changement comportemental durable'
      ]
    },
    {
      id: 'stress-money',
      name: 'Stress et Argent',
      description: 'La relation complexe entre stress et comportement financier',
      icon: 'Zap',
      color: 'from-warning to-error',
      count: 4,
      insights: [
        'Cortisol et prise de risque',
        'Stress chronique et épargne',
        'Techniques de gestion du stress financier'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Explorez par catégorie
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Découvrez les mécanismes neuroscientifiques qui gouvernent vos décisions financières
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                glass rounded-xl p-6 border text-left transition-all duration-300
                hover:glass-hover hover:scale-105 group
                ${isSelected 
                  ? 'border-primary/40 ring-2 ring-primary/20' :'border-border/20'
                }
              `}
            >
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${category.color}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon 
                    name={category.icon} 
                    size={24} 
                    color="white" 
                    strokeWidth={2.5} 
                  />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">
                    {category.count}
                  </div>
                  <div className="text-xs text-text-secondary">
                    insights
                  </div>
                </div>
              </div>

              {/* Category Content */}
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {category.description}
                </p>

                {/* Key Insights Preview */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                    Sujets clés
                  </div>
                  <div className="space-y-1">
                    {category.insights.map((insight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span className="text-xs text-text-primary">
                          {insight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/10">
                <span className="text-xs text-text-secondary">
                  Cliquez pour explorer
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  color="var(--color-primary)"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              39
            </div>
            <div className="text-sm text-text-secondary">
              Insights totaux
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              156
            </div>
            <div className="text-sm text-text-secondary">
              Sources vérifiées
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              12
            </div>
            <div className="text-sm text-text-secondary">
              Nouveautés ce mois
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              4.8
            </div>
            <div className="text-sm text-text-secondary">
              Note moyenne
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;