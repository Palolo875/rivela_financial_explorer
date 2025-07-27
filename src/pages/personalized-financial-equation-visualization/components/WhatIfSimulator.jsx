import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WhatIfSimulator = ({ 
  isOpen, 
  onClose, 
  currentEquation, 
  onScenarioChange 
}) => {
  const [scenarios, setScenarios] = useState([]);
  const [activeScenario, setActiveScenario] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock current equation data
  const mockCurrentEquation = currentEquation || {
    variables: [
      { id: 'income', name: 'Revenus', value: 3200, unit: '€' },
      { id: 'fixed_expenses', name: 'Charges Fixes', value: 1800, unit: '€' },
      { id: 'variable_expenses', name: 'Dépenses Variables', value: 950, unit: '€' },
      { id: 'savings', name: 'Épargne', value: 450, unit: '€' }
    ]
  };

  // Predefined scenario templates
  const scenarioTemplates = [
    {
      id: 'salary_increase',
      name: 'Augmentation de Salaire',
      description: 'Impact d\'une augmentation de 10%',
      icon: 'TrendingUp',
      changes: { income: 1.1 },
      color: 'success'
    },
    {
      id: 'expense_reduction',
      name: 'Réduction des Dépenses',
      description: 'Diminution de 15% des dépenses variables',
      icon: 'Scissors',
      changes: { variable_expenses: 0.85 },
      color: 'primary'
    },
    {
      id: 'emergency_fund',
      name: 'Fonds d\'Urgence',
      description: 'Besoin de €2000 d\'urgence',
      icon: 'AlertTriangle',
      changes: { variable_expenses: 1.2, savings: 0.5 },
      color: 'warning'
    },
    {
      id: 'investment_goal',
      name: 'Objectif Investissement',
      description: 'Épargne supplémentaire de €300/mois',
      icon: 'Target',
      changes: { savings: 1.67 },
      color: 'secondary'
    }
  ];

  const [customScenario, setCustomScenario] = useState({
    name: '',
    variables: mockCurrentEquation.variables.map(v => ({
      ...v,
      newValue: v.value,
      change: 0
    }))
  });

  useEffect(() => {
    if (isOpen) {
      // Initialize with current values
      setCustomScenario(prev => ({
        ...prev,
        variables: mockCurrentEquation.variables.map(v => ({
          ...v,
          newValue: v.value,
          change: 0
        }))
      }));
    }
  }, [isOpen]);

  const calculateScenarioImpact = (changes) => {
    const newValues = mockCurrentEquation.variables.map(variable => {
      const multiplier = changes[variable.id] || 1;
      return {
        ...variable,
        newValue: Math.round(variable.value * multiplier),
        change: Math.round(variable.value * multiplier - variable.value)
      };
    });

    const currentBalance = mockCurrentEquation.variables.find(v => v.id === 'income')?.value - 
                          mockCurrentEquation.variables.find(v => v.id === 'fixed_expenses')?.value - 
                          mockCurrentEquation.variables.find(v => v.id === 'variable_expenses')?.value;
    
    const newBalance = newValues.find(v => v.id === 'income')?.newValue - 
                      newValues.find(v => v.id === 'fixed_expenses')?.newValue - 
                      newValues.find(v => v.id === 'variable_expenses')?.newValue;

    return {
      variables: newValues,
      impact: {
        balanceChange: newBalance - currentBalance,
        percentageChange: currentBalance !== 0 ? ((newBalance - currentBalance) / Math.abs(currentBalance)) * 100 : 0
      }
    };
  };

  const applyScenarioTemplate = (template) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const result = calculateScenarioImpact(template.changes);
      const newScenario = {
        id: Date.now(),
        name: template.name,
        description: template.description,
        template: template.id,
        color: template.color,
        ...result
      };
      
      setScenarios(prev => [newScenario, ...prev.slice(0, 2)]);
      setActiveScenario(newScenario);
      setIsCalculating(false);
      
      if (onScenarioChange) {
        onScenarioChange(newScenario);
      }
    }, 800);
  };

  const updateCustomVariable = (variableId, newValue) => {
    setCustomScenario(prev => ({
      ...prev,
      variables: prev.variables.map(v => 
        v.id === variableId 
          ? { 
              ...v, 
              newValue: parseFloat(newValue) || 0,
              change: (parseFloat(newValue) || 0) - v.value
            }
          : v
      )
    }));
  };

  const applyCustomScenario = () => {
    if (!customScenario.name.trim()) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      const changes = {};
      customScenario.variables.forEach(v => {
        if (v.value !== 0) {
          changes[v.id] = v.newValue / v.value;
        }
      });

      const result = calculateScenarioImpact(changes);
      const newScenario = {
        id: Date.now(),
        name: customScenario.name,
        description: 'Scénario personnalisé',
        template: 'custom',
        color: 'accent',
        ...result
      };
      
      setScenarios(prev => [newScenario, ...prev.slice(0, 2)]);
      setActiveScenario(newScenario);
      setIsCalculating(false);
      
      // Reset custom scenario
      setCustomScenario({
        name: '',
        variables: mockCurrentEquation.variables.map(v => ({
          ...v,
          newValue: v.value,
          change: 0
        }))
      });
      
      if (onScenarioChange) {
        onScenarioChange(newScenario);
      }
    }, 800);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-1000 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Calculator" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-foreground">
                  Simulateur "Et Si..."
                </h2>
                <p className="text-sm text-text-secondary">
                  Explorez différents scénarios financiers
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={24} color="var(--color-text-secondary)" />
            </Button>
          </div>

          <div className="flex h-[calc(90vh-100px)]">
            {/* Left Panel - Scenario Templates */}
            <div className="w-1/3 border-r border-border/20 p-6 overflow-y-auto">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Scénarios Prédéfinis
              </h3>
              
              <div className="space-y-3">
                {scenarioTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => applyScenarioTemplate(template)}
                    disabled={isCalculating}
                    className="w-full glass rounded-xl p-4 text-left hover:bg-primary/5 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 bg-${template.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon 
                          name={template.icon} 
                          size={16} 
                          color={`var(--color-${template.color})`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground mb-1">
                          {template.name}
                        </h4>
                        <p className="text-xs text-text-secondary">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Scenario Builder */}
              <div className="mt-8">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                  Scénario Personnalisé
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="Nom du scénario"
                    placeholder="Ex: Nouveau projet..."
                    value={customScenario.name}
                    onChange={(e) => setCustomScenario(prev => ({ ...prev, name: e.target.value }))}
                  />
                  
                  {customScenario.variables.map((variable) => (
                    <div key={variable.id} className="glass rounded-lg p-3">
                      <label className="text-xs font-medium text-foreground mb-2 block">
                        {variable.name}
                      </label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={variable.newValue}
                          onChange={(e) => updateCustomVariable(variable.id, e.target.value)}
                          className="flex-1"
                        />
                        <span className="text-xs text-text-secondary">
                          {variable.unit}
                        </span>
                      </div>
                      {variable.change !== 0 && (
                        <div className={`text-xs mt-1 ${getChangeColor(variable.change)}`}>
                          {variable.change > 0 ? '+' : ''}{variable.change}{variable.unit}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={applyCustomScenario}
                    disabled={!customScenario.name.trim() || isCalculating}
                    loading={isCalculating}
                  >
                    Calculer le Scénario
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Results */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Résultats de Simulation
                </h3>
                {scenarios.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScenarios([])}
                  >
                    Effacer Tout
                  </Button>
                )}
              </div>

              {isCalculating && (
                <div className="flex items-center justify-center py-12">
                  <div className="glass rounded-xl p-6 flex items-center space-x-3">
                    <div className="animate-spin">
                      <Icon name="RefreshCw" size={24} color="var(--color-primary)" />
                    </div>
                    <span className="font-medium text-foreground">
                      Calcul en cours...
                    </span>
                  </div>
                </div>
              )}

              {scenarios.length === 0 && !isCalculating && (
                <div className="text-center py-12">
                  <Icon name="Calculator" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                    Aucun scénario testé
                  </h4>
                  <p className="text-text-secondary">
                    Sélectionnez un scénario prédéfini ou créez le vôtre.
                  </p>
                </div>
              )}

              {/* Scenario Results */}
              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`glass rounded-xl p-4 ${
                      activeScenario?.id === scenario.id ? 'ring-2 ring-primary/30' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${scenario.color}/10 rounded-lg flex items-center justify-center`}>
                          <Icon 
                            name={scenario.template === 'custom' ? 'Settings' : 'TrendingUp'} 
                            size={16} 
                            color={`var(--color-${scenario.color})`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-foreground">
                            {scenario.name}
                          </h4>
                          <p className="text-xs text-text-secondary">
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Impact Summary */}
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getChangeColor(scenario.impact.balanceChange)}`}>
                          {scenario.impact.balanceChange > 0 ? '+' : ''}{scenario.impact.balanceChange}€
                        </div>
                        <div className="text-xs text-text-secondary">
                          {scenario.impact.percentageChange > 0 ? '+' : ''}{scenario.impact.percentageChange.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Variable Changes */}
                    <div className="grid grid-cols-2 gap-3">
                      {scenario.variables.map((variable) => (
                        <div key={variable.id} className="glass rounded-lg p-3">
                          <div className="text-xs text-text-secondary mb-1">
                            {variable.name}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-foreground">
                              {variable.newValue}{variable.unit}
                            </span>
                            {variable.change !== 0 && (
                              <div className={`flex items-center space-x-1 ${getChangeColor(variable.change)}`}>
                                <Icon 
                                  name={getChangeIcon(variable.change)} 
                                  size={12} 
                                />
                                <span className="text-xs">
                                  {Math.abs(variable.change)}{variable.unit}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhatIfSimulator;