import React from 'react';
import Icon from '../../../components/AppIcon';

const ScenarioTabs = ({ activeScenario, onScenarioChange, scenarios }) => {
  const getTabConfig = (scenarioType) => {
    const configs = {
      current: {
        icon: 'BarChart3',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20'
      },
      optimistic: {
        icon: 'TrendingUp',
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20'
      },
      conservative: {
        icon: 'Shield',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20'
      }
    };
    return configs[scenarioType] || configs.current;
  };

  return (
    <div className="w-full">
      {/* Mobile Tab Navigation */}
      <div className="md:hidden">
        <div className="flex space-x-1 p-1 glass rounded-xl">
          {scenarios.map((scenario) => {
            const config = getTabConfig(scenario.type);
            const isActive = activeScenario === scenario.type;
            
            return (
              <button
                key={scenario.type}
                onClick={() => onScenarioChange(scenario.type)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
                  font-heading font-medium text-sm transition-all duration-300
                  ${isActive 
                    ? `${config.bgColor} ${config.color} glass-hover` 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/50'
                  }
                `}
              >
                <Icon 
                  name={config.icon} 
                  size={16} 
                  color={isActive ? config.color.replace('text-', 'var(--color-') + ')' : 'currentColor'} 
                />
                <span className="truncate">{scenario.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden md:block">
        <div className="flex space-x-2">
          {scenarios.map((scenario) => {
            const config = getTabConfig(scenario.type);
            const isActive = activeScenario === scenario.type;
            
            return (
              <button
                key={scenario.type}
                onClick={() => onScenarioChange(scenario.type)}
                className={`
                  flex items-center space-x-3 py-4 px-6 rounded-xl
                  font-heading font-medium transition-all duration-300
                  border-2 ${isActive ? config.borderColor : 'border-transparent'}
                  ${isActive 
                    ? `${config.bgColor} ${config.color} glass-hover` 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/30'
                  }
                `}
              >
                <Icon 
                  name={config.icon} 
                  size={20} 
                  color={isActive ? config.color.replace('text-', 'var(--color-') + ')' : 'currentColor'} 
                />
                <div className="text-left">
                  <div className="text-base">{scenario.name}</div>
                  <div className="text-xs opacity-70 mt-0.5">{scenario.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScenarioTabs;