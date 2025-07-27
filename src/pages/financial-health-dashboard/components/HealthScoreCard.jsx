import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthScoreCard = ({ 
  score = 75, 
  trend = 'up', 
  previousScore = 68,
  className = "" 
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'from-success/20 to-success/5';
    if (score >= 60) return 'from-warning/20 to-warning/5';
    return 'from-error/20 to-error/5';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            Indice de Santé Financière
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Évaluation globale de votre situation
          </p>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">
            {Math.abs(score - previousScore)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold font-heading ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-sm text-text-secondary font-medium">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Épargne</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-500"
                style={{ width: '85%' }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">85%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Dépenses</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-warning transition-all duration-500"
                style={{ width: '70%' }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">70%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Objectifs</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">60%</span>
          </div>
        </div>
      </div>

      {/* Quick Insight */}
      <div className={`mt-6 p-4 rounded-xl bg-gradient-to-r ${getScoreBackground(score)}`}>
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Conseil personnalisé
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {score >= 80 
                ? "Excellente santé financière ! Continuez sur cette voie."
                : score >= 60 
                  ? "Bonne progression. Optimisez vos dépenses variables."
                  : "Améliorations nécessaires. Concentrez-vous sur l'épargne."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;