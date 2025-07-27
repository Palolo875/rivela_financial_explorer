import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 6, 
  steps = [],
  className = "",
  showLabels = true,
  variant = "default" // default, minimal, detailed
}) => {
  const defaultSteps = [
    { id: 1, label: 'Questions', description: 'Exploration initiale' },
    { id: 2, label: 'Données', description: 'Saisie des informations' },
    { id: 3, label: 'Équation', description: 'Formule personnalisée' },
    { id: 4, label: 'Scénarios', description: 'Simulation interactive' },
    { id: 5, label: 'Apprentissage', description: 'Insights neuroscientifiques' },
    { id: 6, label: 'Dashboard', description: 'Suivi continu' }
  ];

  const progressSteps = steps.length > 0 ? steps : defaultSteps.slice(0, totalSteps);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepNumber, status) => {
    if (status === 'completed') return 'CheckCircle2';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--color-success)';
      case 'current': return 'var(--color-primary)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-600 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Horizontal Layout */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-600 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {progressSteps.map((step, index) => {
              const stepNumber = index + 1;
              const status = getStepStatus(stepNumber);
              const isActive = status === 'current';
              const isCompleted = status === 'completed';

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div 
                    className={`
                      relative w-12 h-12 rounded-full flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${isCompleted 
                        ? 'bg-success glass-hover' 
                        : isActive 
                          ? 'bg-primary glass-hover animate-breathe' :'bg-muted'
                      }
                    `}
                  >
                    <Icon 
                      name={getStepIcon(stepNumber, status)} 
                      size={20} 
                      color={status === 'upcoming' ? 'var(--color-muted-foreground)' : 'white'}
                      strokeWidth={status === 'current' ? 2.5 : 2}
                    />
                    
                    {isActive && (
                      <div className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-ping" />
                    )}
                  </div>

                  {/* Step Content */}
                  {showLabels && (
                    <div className="mt-3 text-center max-w-24">
                      <div 
                        className={`
                          text-sm font-medium font-heading
                          ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'}
                        `}
                      >
                        {step.label}
                      </div>
                      {variant === 'detailed' && (
                        <div className="text-xs text-text-secondary mt-1 leading-tight">
                          {step.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Layout */}
      <div className="md:hidden">
        <div className="space-y-4">
          {progressSteps.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            const isActive = status === 'current';
            const isCompleted = status === 'completed';

            return (
              <div key={step.id} className="flex items-center space-x-4">
                {/* Step Circle */}
                <div 
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    transition-all duration-300 ease-out
                    ${isCompleted 
                      ? 'bg-success glass-hover' 
                      : isActive 
                        ? 'bg-primary glass-hover animate-breathe' :'bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={getStepIcon(stepNumber, status)} 
                    size={18} 
                    color={status === 'upcoming' ? 'var(--color-muted-foreground)' : 'white'}
                    strokeWidth={status === 'current' ? 2.5 : 2}
                  />
                  
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-ping" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div 
                    className={`
                      text-base font-medium font-heading
                      ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'}
                    `}
                  >
                    {step.label}
                  </div>
                  {showLabels && (
                    <div className="text-sm text-text-secondary mt-0.5">
                      {step.description}
                    </div>
                  )}
                </div>

                {/* Connection Line */}
                {index < progressSteps.length - 1 && (
                  <div className="absolute left-5 mt-10 w-0.5 h-4 bg-muted" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 glass rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">
              Progression globale
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-600 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;