import React from 'react';
import Icon from '../../../components/AppIcon';

const ScenarioControls = ({ scenario, onParameterChange, className = "" }) => {
  const handleSliderChange = (parameter, value) => {
    onParameterChange(scenario.type, parameter, value);
  };

  const formatValue = (parameter, value) => {
    switch (parameter) {
      case 'incomeChange':
        return `${value > 0 ? '+' : ''}${value}%`;
      case 'expenseChange':
        return `${value > 0 ? '+' : ''}${value}%`;
      case 'savingsRate':
        return `${value}%`;
      case 'goalTimeline':
        return `${value} mois`;
      case 'riskTolerance':
        return ['Très faible', 'Faible', 'Modéré', 'Élevé', 'Très élevé'][Math.floor(value / 20)];
      default:
        return value;
    }
  };

  const getParameterConfig = (parameter) => {
    const configs = {
      incomeChange: {
        label: 'Changement de revenus',
        icon: 'TrendingUp',
        min: -50,
        max: 100,
        step: 5,
        color: 'text-success'
      },
      expenseChange: {
        label: 'Modification des dépenses',
        icon: 'TrendingDown',
        min: -50,
        max: 50,
        step: 5,
        color: 'text-warning'
      },
      savingsRate: {
        label: 'Taux d\'épargne',
        icon: 'PiggyBank',
        min: 0,
        max: 50,
        step: 1,
        color: 'text-primary'
      },
      goalTimeline: {
        label: 'Délai objectif',
        icon: 'Calendar',
        min: 1,
        max: 60,
        step: 1,
        color: 'text-secondary'
      },
      riskTolerance: {
        label: 'Tolérance au risque',
        icon: 'Shield',
        min: 0,
        max: 100,
        step: 20,
        color: 'text-accent'
      }
    };
    return configs[parameter] || {};
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Paramètres du scénario
        </h3>
      </div>

      {Object.entries(scenario.parameters).map(([parameter, value]) => {
        const config = getParameterConfig(parameter);
        
        return (
          <div key={parameter} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={config.icon} 
                  size={16} 
                  color={config.color?.replace('text-', 'var(--color-') + ')' || 'currentColor'} 
                />
                <label className="font-heading font-medium text-sm text-foreground">
                  {config.label}
                </label>
              </div>
              <div className={`font-mono text-sm font-semibold ${config.color || 'text-foreground'}`}>
                {formatValue(parameter, value)}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min={config.min}
                max={config.max}
                step={config.step}
                value={value}
                onChange={(e) => handleSliderChange(parameter, parseFloat(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((value - config.min) / (config.max - config.min)) * 100}%, var(--color-muted) ${((value - config.min) / (config.max - config.min)) * 100}%, var(--color-muted) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>{formatValue(parameter, config.min)}</span>
                <span>{formatValue(parameter, config.max)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Quick Presets */}
      <div className="pt-4 border-t border-border/20">
        <div className="text-sm font-medium text-text-secondary mb-3">Préréglages rapides</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              Object.keys(scenario.parameters).forEach(param => {
                const config = getParameterConfig(param);
                const resetValue = param === 'savingsRate' ? 10 : 
                                 param === 'goalTimeline' ? 12 : 
                                 param === 'riskTolerance' ? 40 : 0;
                handleSliderChange(param, resetValue);
              });
            }}
            className="py-2 px-3 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            Réinitialiser
          </button>
          <button
            onClick={() => {
              handleSliderChange('incomeChange', 20);
              handleSliderChange('expenseChange', -15);
              handleSliderChange('savingsRate', 25);
            }}
            className="py-2 px-3 text-xs font-medium text-text-secondary hover:text-success hover:bg-success/5 rounded-lg transition-colors"
          >
            Optimiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioControls;