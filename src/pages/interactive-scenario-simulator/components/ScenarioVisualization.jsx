import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ScenarioVisualization = ({ scenario, projectionData, className = "" }) => {
  const getScenarioColor = (scenarioType) => {
    const colors = {
      current: '#4F46E5',
      optimistic: '#10B981',
      conservative: '#F59E0B'
    };
    return colors[scenarioType] || colors.current;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Financial Health Index visualization
  const healthIndexData = [
    { name: 'Épargne', value: scenario.healthIndex.savings, color: '#10B981' },
    { name: 'Dettes', value: scenario.healthIndex.debt, color: '#EF4444' },
    { name: 'Stabilité', value: scenario.healthIndex.stability, color: '#4F46E5' },
    { name: 'Objectifs', value: scenario.healthIndex.goals, color: '#F59E0B' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Scenario Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getScenarioColor(scenario.type) }}
          />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {scenario.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">
            {formatPercentage(scenario.improvement)}
          </span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Wallet" size={16} color="var(--color-primary)" />
            <span className="text-xs font-medium text-text-secondary">Épargne mensuelle</span>
          </div>
          <div className="text-lg font-bold text-foreground">
            {formatCurrency(scenario.monthlySavings)}
          </div>
          <div className="text-xs text-success mt-1">
            +{formatCurrency(scenario.monthlySavings - 850)} vs actuel
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-secondary)" />
            <span className="text-xs font-medium text-text-secondary">Objectif atteint</span>
          </div>
          <div className="text-lg font-bold text-foreground">
            {scenario.goalAchievement}%
          </div>
          <div className="text-xs text-secondary mt-1">
            dans {scenario.timeToGoal} mois
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={16} color="var(--color-accent)" />
            <span className="text-xs font-medium text-text-secondary">Santé financière</span>
          </div>
          <div className="text-lg font-bold text-foreground">
            {scenario.overallHealthIndex}/100
          </div>
          <div className={`text-xs mt-1 ${scenario.overallHealthIndex >= 70 ? 'text-success' : scenario.overallHealthIndex >= 50 ? 'text-warning' : 'text-error'}`}>
            {scenario.overallHealthIndex >= 70 ? 'Excellente' : scenario.overallHealthIndex >= 50 ? 'Bonne' : 'À améliorer'}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-xs font-medium text-text-secondary">Risque</span>
          </div>
          <div className="text-lg font-bold text-foreground">
            {scenario.riskLevel}
          </div>
          <div className="text-xs text-warning mt-1">
            Tolérance: {scenario.riskTolerance}%
          </div>
        </div>
      </div>

      {/* 6-Month Projection Chart */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          <h4 className="font-heading font-semibold text-base text-foreground">
            Projection sur 6 mois
          </h4>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [formatCurrency(value), 'Épargne']}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke={getScenarioColor(scenario.type)}
                strokeWidth={3}
                dot={{ fill: getScenarioColor(scenario.type), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getScenarioColor(scenario.type), strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Health Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="PieChart" size={20} color="var(--color-secondary)" />
            <h4 className="font-heading font-semibold text-base text-foreground">
              Répartition santé financière
            </h4>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthIndexData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthIndexData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`${value}/100`, 'Score']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {healthIndexData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-text-secondary">{item.name}</span>
                <span className="text-xs font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
            <h4 className="font-heading font-semibold text-base text-foreground">
              Alertes et recommandations
            </h4>
          </div>
          <div className="space-y-3">
            {scenario.alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.type === 'warning' ? 'bg-warning/5 border-warning' :
                alert.type === 'success'? 'bg-success/5 border-success' : 'bg-primary/5 border-primary'
              }`}>
                <div className="flex items-start space-x-2">
                  <Icon 
                    name={alert.type === 'warning' ? 'AlertTriangle' : alert.type === 'success' ? 'CheckCircle2' : 'Info'} 
                    size={16} 
                    color={
                      alert.type === 'warning' ? 'var(--color-warning)' :
                      alert.type === 'success' ? 'var(--color-success)' :
                      'var(--color-primary)'
                    }
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      {alert.title}
                    </div>
                    <div className="text-xs text-text-secondary leading-relaxed">
                      {alert.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioVisualization;