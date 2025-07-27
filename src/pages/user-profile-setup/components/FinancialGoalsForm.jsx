import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialGoalsForm = ({ data, errors, onUpdate }) => {
  const financialGoalsOptions = [
    {
      id: 'epargne',
      label: 'Épargne',
      icon: 'PiggyBank',
      description: 'Constituer une épargne de précaution'
    },
    {
      id: 'investissement',
      label: 'Investissement',
      icon: 'TrendingUp',
      description: 'Faire fructifier mon argent'
    },
    {
      id: 'remboursement',
      label: 'Remboursement de dettes',
      icon: 'CreditCard',
      description: 'Réduire mes dettes existantes'
    },
    {
      id: 'achat_immobilier',
      label: 'Achat immobilier',
      icon: 'Home',
      description: 'Acquérir un bien immobilier'
    },
    {
      id: 'retraite',
      label: 'Préparation retraite',
      icon: 'Calendar',
      description: 'Préparer ma future retraite'
    },
    {
      id: 'education',
      label: 'Éducation / Formation',
      icon: 'GraduationCap',
      description: 'Financer des études ou formations'
    },
    {
      id: 'voyage',
      label: 'Voyages / Loisirs',
      icon: 'Plane',
      description: 'Financer mes projets personnels'
    },
    {
      id: 'autre',
      label: 'Autre',
      icon: 'Target',
      description: 'Un objectif spécifique'
    }
  ];

  const incomeRanges = [
    { value: 'moins_1500', label: 'Moins de 1 500 €' },
    { value: '1500_2500', label: '1 500 € - 2 500 €' },
    { value: '2500_4000', label: '2 500 € - 4 000 €' },
    { value: '4000_6000', label: '4 000 € - 6 000 €' },
    { value: '6000_plus', label: 'Plus de 6 000 €' },
    { value: 'variable', label: 'Revenus variables' },
    { value: 'non_renseigne', label: 'Préfère ne pas dire' }
  ];

  const handleGoalToggle = (goalId) => {
    const currentGoals = data.financialGoals || [];
    const updatedGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(id => id !== goalId)
      : [...currentGoals, goalId];
    
    onUpdate(prev => ({
      ...prev,
      financialGoals: updatedGoals
    }));
  };

  const handleIncomeChange = (incomeRange) => {
    onUpdate(prev => ({
      ...prev,
      monthlyIncome: incomeRange
    }));
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Target" size={32} color="var(--color-secondary)" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
          Objectifs financiers
        </h2>
        <p className="text-text-secondary">
          Sélectionnez vos principaux objectifs pour recevoir des conseils personnalisés
        </p>
      </div>

      {/* Financial Goals Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quels sont vos objectifs financiers prioritaires ?
          <span className="text-sm font-normal text-text-secondary ml-2">
            (Sélectionnez toutes les réponses applicables)
          </span>
        </h3>
        
        {errors.financialGoals && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors.financialGoals}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {financialGoalsOptions.map((goal) => {
            const isSelected = (data.financialGoals || []).includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${isSelected 
                    ? 'border-secondary bg-secondary/10 shadow-glass-hover' 
                    : 'border-border/20 hover:border-secondary/40 hover:bg-secondary/5'
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${isSelected ? 'bg-secondary/20' : 'bg-muted'}`}>
                    <Icon 
                      name={goal.icon} 
                      size={20} 
                      color={isSelected ? 'var(--color-secondary)' : 'var(--color-text-secondary)'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">{goal.label}</h4>
                    <p className="text-sm text-text-secondary">{goal.description}</p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={20} color="var(--color-secondary)" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Monthly Income Range */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Revenus mensuels approximatifs
          <span className="text-sm font-normal text-text-secondary ml-2">
            (Information confidentielle, utilisée pour personnaliser les conseils)
          </span>
        </h3>

        {errors.monthlyIncome && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors.monthlyIncome}</p>
          </div>
        )}

        <div className="space-y-3">
          {incomeRanges.map((range) => {
            const isSelected = data.monthlyIncome === range.value;
            return (
              <button
                key={range.value}
                onClick={() => handleIncomeChange(range.value)}
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left
                  ${isSelected 
                    ? 'border-primary bg-primary/10 shadow-glass-hover' 
                    : 'border-border/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-primary bg-primary' :'border-border/40'
                      }`}>
                      {isSelected && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="font-medium text-text-primary">{range.label}</span>
                  </div>
                  {range.value !== 'non_renseigne' && (
                    <Icon name="Euro" size={16} color="var(--color-text-secondary)" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-accent mb-1">Confidentialité garantie</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Ces informations nous permettent de personnaliser nos recommandations financières. 
              Elles sont strictement confidentielles et ne seront jamais partagées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoalsForm;