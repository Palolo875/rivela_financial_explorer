import React from 'react';
import Icon from '../../../components/AppIcon';

const FamilySituationForm = ({ data, errors, onUpdate }) => {
  const familyStatusOptions = [
    {
      value: 'celibataire',
      label: 'Célibataire',
      icon: 'User',
      description: 'Sans conjoint(e)'
    },
    {
      value: 'couple_sans_enfant',
      label: 'En couple sans enfant',
      icon: 'Heart',
      description: 'Marié(e), pacsé(e) ou en concubinage'
    },
    {
      value: 'couple_avec_enfants',
      label: 'En couple avec enfant(s)',
      icon: 'Users',
      description: 'Famille avec enfant(s) à charge'
    },
    {
      value: 'parent_solo',
      label: 'Parent célibataire',
      icon: 'Baby',
      description: 'Seul(e) avec enfant(s) à charge'
    },
    {
      value: 'famille_recomposee',
      label: 'Famille recomposée',
      icon: 'Home',
      description: 'Couple avec enfants de précédentes unions'
    },
    {
      value: 'autre',
      label: 'Autre situation',
      icon: 'MoreHorizontal',
      description: 'Situation familiale spécifique'
    }
  ];

  const handleFamilyStatusChange = (status) => {
    onUpdate(prev => ({
      ...prev,
      familyStatus: status
    }));
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Home" size={32} color="var(--color-accent)" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
          Situation familiale
        </h2>
        <p className="text-text-secondary">
          Votre situation familiale nous aide à adapter nos conseils financiers à votre contexte
        </p>
      </div>

      {/* Family Status Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quelle est votre situation familiale actuelle ?
        </h3>
        
        {errors.familyStatus && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors.familyStatus}</p>
          </div>
        )}

        <div className="space-y-4">
          {familyStatusOptions.map((option) => {
            const isSelected = data.familyStatus === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleFamilyStatusChange(option.value)}
                className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left
                  ${isSelected 
                    ? 'border-accent bg-accent/10 shadow-glass-hover' 
                    : 'border-border/20 hover:border-accent/40 hover:bg-accent/5'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                      ${isSelected ? 'bg-accent/20' : 'bg-muted'}`}>
                      <Icon 
                        name={option.icon} 
                        size={24} 
                        color={isSelected ? 'var(--color-accent)' : 'var(--color-text-secondary)'} 
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">{option.label}</h4>
                      <p className="text-sm text-text-secondary">{option.description}</p>
                    </div>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected 
                      ? 'border-accent bg-accent' :'border-border/40'
                    }`}>
                    {isSelected && (
                      <Icon name="Check" size={16} color="white" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Context */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              Pourquoi cette information est-elle importante ?
            </h4>
            <ul className="text-sm text-text-secondary space-y-1 leading-relaxed">
              <li>• Adapter les stratégies d'épargne selon vos charges familiales</li>
              <li>• Proposer des solutions d'assurance appropriées</li>
              <li>• Suggérer des investissements cohérents avec votre situation</li>
              <li>• Recommander des optimisations fiscales pertinentes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={16} color="var(--color-success)" />
            <h5 className="font-medium text-success">Conseil famille</h5>
          </div>
          <p className="text-sm text-text-secondary">
            Pensez à inclure vos proches dans vos décisions financières importantes
          </p>
        </div>
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} color="var(--color-primary)" />
            <h5 className="font-medium text-primary">Sécurité financière</h5>
          </div>
          <p className="text-sm text-text-secondary">
            Adaptez votre épargne de précaution selon votre situation familiale
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilySituationForm;