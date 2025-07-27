import React from 'react';
import Icon from '../../../components/AppIcon';

const DataCompletionProgress = ({ 
  incomeData, 
  expensesData, 
  variableExpensesData, 
  debtsData, 
  goalsData 
}) => {
  const sections = [
    {
      id: 'income',
      name: 'Sources de revenus',
      icon: 'TrendingUp',
      data: incomeData,
      minRequired: 1,
      color: 'success'
    },
    {
      id: 'expenses',
      name: 'Dépenses fixes',
      icon: 'Home',
      data: expensesData,
      minRequired: 3,
      color: 'error'
    },
    {
      id: 'variable',
      name: 'Dépenses variables',
      icon: 'Activity',
      data: variableExpensesData,
      minRequired: 2,
      color: 'warning'
    },
    {
      id: 'debts',
      name: 'Dettes',
      icon: 'CreditCard',
      data: debtsData,
      minRequired: 0,
      color: 'error'
    },
    {
      id: 'goals',
      name: 'Objectifs financiers',
      icon: 'Target',
      data: goalsData,
      minRequired: 1,
      color: 'primary'
    }
  ];

  const calculateSectionProgress = (section) => {
    const count = section.data.length;
    const required = section.minRequired;
    
    if (required === 0) {
      return count > 0 ? 100 : 0;
    }
    
    return Math.min((count / required) * 100, 100);
  };

  const totalProgress = sections.reduce((sum, section) => {
    return sum + calculateSectionProgress(section);
  }, 0) / sections.length;

  const completedSections = sections.filter(section => 
    calculateSectionProgress(section) >= 100
  ).length;

  const getColorClasses = (color) => {
    const colors = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        progress: 'bg-success'
      },
      error: {
        bg: 'bg-error/10',
        text: 'text-error',
        progress: 'bg-error'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        progress: 'bg-warning'
      },
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        progress: 'bg-primary'
      }
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="glass rounded-xl p-6 border border-border/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Progression de la saisie
          </h3>
          <p className="text-sm text-text-secondary">
            {completedSections}/{sections.length} sections complétées
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {Math.round(totalProgress)}%
          </div>
          <div className="text-xs text-text-secondary">
            Complété
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-600 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Section Progress */}
      <div className="space-y-4">
        {sections.map((section) => {
          const progress = calculateSectionProgress(section);
          const isComplete = progress >= 100;
          const colorClasses = getColorClasses(section.color);
          
          return (
            <div key={section.id} className="flex items-center space-x-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.bg}`}>
                <Icon 
                  name={section.icon} 
                  size={20} 
                  color={`var(--color-${section.color})`}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground text-sm">
                    {section.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">
                      {section.data.length}
                      {section.minRequired > 0 && `/${section.minRequired}`}
                    </span>
                    {isComplete && (
                      <Icon 
                        name="CheckCircle2" 
                        size={16} 
                        color="var(--color-success)"
                      />
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${colorClasses.progress}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      {totalProgress < 100 && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
            <div>
              <h4 className="font-medium text-primary text-sm mb-1">
                Recommandations pour compléter votre profil
              </h4>
              <ul className="text-xs text-text-secondary space-y-1">
                {sections
                  .filter(section => calculateSectionProgress(section) < 100)
                  .map(section => (
                    <li key={section.id}>
                      • {section.name}: {
                        section.minRequired > 0 
                          ? `Ajoutez ${section.minRequired - section.data.length} élément${section.minRequired - section.data.length > 1 ? 's' : ''} minimum`
                          : 'Ajoutez au moins un élément pour une analyse complète'
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {totalProgress >= 100 && (
        <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
            <div>
              <h4 className="font-medium text-success text-sm mb-1">
                Profil financier complet !
              </h4>
              <p className="text-xs text-text-secondary">
                Vous pouvez maintenant générer votre équation financière personnalisée et explorer vos scénarios.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCompletionProgress;