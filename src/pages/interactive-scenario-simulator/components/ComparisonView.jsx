import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComparisonView = ({ scenarios, className = "" }) => {
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

  // Prepare comparison data for charts
  const comparisonData = scenarios.map(scenario => ({
    name: scenario.name,
    type: scenario.type,
    savings: scenario.monthlySavings,
    healthIndex: scenario.overallHealthIndex,
    goalAchievement: scenario.goalAchievement,
    timeToGoal: scenario.timeToGoal,
    improvement: scenario.improvement
  }));

  // Radar chart data for comprehensive comparison
  const radarData = [
    {
      metric: 'Épargne',
      current: scenarios.find(s => s.type === 'current')?.monthlySavings / 50 || 0,
      optimistic: scenarios.find(s => s.type === 'optimistic')?.monthlySavings / 50 || 0,
      conservative: scenarios.find(s => s.type === 'conservative')?.monthlySavings / 50 || 0
    },
    {
      metric: 'Santé financière',
      current: scenarios.find(s => s.type === 'current')?.overallHealthIndex || 0,
      optimistic: scenarios.find(s => s.type === 'optimistic')?.overallHealthIndex || 0,
      conservative: scenarios.find(s => s.type === 'conservative')?.overallHealthIndex || 0
    },
    {
      metric: 'Objectifs',
      current: scenarios.find(s => s.type === 'current')?.goalAchievement || 0,
      optimistic: scenarios.find(s => s.type === 'optimistic')?.goalAchievement || 0,
      conservative: scenarios.find(s => s.type === 'conservative')?.goalAchievement || 0
    },
    {
      metric: 'Stabilité',
      current: 100 - (scenarios.find(s => s.type === 'current')?.riskLevel || 0),
      optimistic: 100 - (scenarios.find(s => s.type === 'optimistic')?.riskLevel || 0),
      conservative: 100 - (scenarios.find(s => s.type === 'conservative')?.riskLevel || 0)
    }
  ];

  const getScenarioColor = (scenarioType) => {
    const colors = {
      current: '#4F46E5',
      optimistic: '#10B981',
      conservative: '#F59E0B'
    };
    return colors[scenarioType] || colors.current;
  };

  const getBestScenario = (metric) => {
    const values = scenarios.map(s => ({
      type: s.type,
      value: metric === 'savings' ? s.monthlySavings :
             metric === 'health' ? s.overallHealthIndex :
             metric === 'goals' ? s.goalAchievement :
             metric === 'time' ? -s.timeToGoal : // Negative because lower is better
             s.improvement
    }));
    
    return values.reduce((best, current) => 
      current.value > best.value ? current : best
    );
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Comparison Header */}
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Comparaison des scénarios
        </h2>
        <p className="text-text-secondary">
          Analysez les différences entre vos trois scénarios financiers
        </p>
      </div>

      {/* Quick Comparison Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => {
          const isOptimal = scenario.type === getBestScenario('health').type;
          
          return (
            <div 
              key={scenario.type}
              className={`
                glass rounded-xl p-6 transition-all duration-300
                ${isOptimal ? 'ring-2 ring-success/30 bg-success/5' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getScenarioColor(scenario.type) }}
                  />
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {scenario.name}
                  </h3>
                </div>
                {isOptimal && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Crown" size={16} />
                    <span className="text-xs font-medium">Optimal</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Épargne mensuelle</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(scenario.monthlySavings)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Santé financière</span>
                  <span className="font-semibold text-foreground">
                    {scenario.overallHealthIndex}/100
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Objectif atteint</span>
                  <span className="font-semibold text-foreground">
                    {scenario.goalAchievement}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Délai objectif</span>
                  <span className="font-semibold text-foreground">
                    {scenario.timeToGoal} mois
                  </span>
                </div>

                <div className="pt-2 border-t border-border/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Amélioration</span>
                    <span className={`font-semibold ${scenario.improvement > 0 ? 'text-success' : 'text-error'}`}>
                      {scenario.improvement > 0 ? '+' : ''}{formatPercentage(scenario.improvement)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Comparison Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart Comparison */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Comparaison des métriques clés
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="savings" 
                  name="Épargne mensuelle (€)"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="healthIndex" 
                  name="Santé financière (/100)"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Icon name="Radar" size={20} color="var(--color-secondary)" />
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Analyse multidimensionnelle
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
                />
                <Radar
                  name="Actuel"
                  dataKey="current"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Optimiste"
                  dataKey="optimistic"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Conservateur"
                  dataKey="conservative"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Win/Lose Indicators */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Trophy" size={20} color="var(--color-accent)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Analyse des performances
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
            <Icon name="TrendingUp" size={24} color="var(--color-success)" className="mx-auto mb-2" />
            <div className="text-sm font-medium text-success mb-1">Meilleure épargne</div>
            <div className="text-lg font-bold text-foreground">
              {getBestScenario('savings').type === 'current' ? 'Actuel' :
               getBestScenario('savings').type === 'optimistic' ? 'Optimiste' : 'Conservateur'}
            </div>
            <div className="text-xs text-text-secondary">
              {formatCurrency(Math.max(...scenarios.map(s => s.monthlySavings)))}
            </div>
          </div>

          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Icon name="Heart" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <div className="text-sm font-medium text-primary mb-1">Meilleure santé</div>
            <div className="text-lg font-bold text-foreground">
              {getBestScenario('health').type === 'current' ? 'Actuel' :
               getBestScenario('health').type === 'optimistic' ? 'Optimiste' : 'Conservateur'}
            </div>
            <div className="text-xs text-text-secondary">
              {Math.max(...scenarios.map(s => s.overallHealthIndex))}/100
            </div>
          </div>

          <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <Icon name="Target" size={24} color="var(--color-secondary)" className="mx-auto mb-2" />
            <div className="text-sm font-medium text-secondary mb-1">Meilleurs objectifs</div>
            <div className="text-lg font-bold text-foreground">
              {getBestScenario('goals').type === 'current' ? 'Actuel' :
               getBestScenario('goals').type === 'optimistic' ? 'Optimiste' : 'Conservateur'}
            </div>
            <div className="text-xs text-text-secondary">
              {Math.max(...scenarios.map(s => s.goalAchievement))}%
            </div>
          </div>

          <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
            <Icon name="Clock" size={24} color="var(--color-accent)" className="mx-auto mb-2" />
            <div className="text-sm font-medium text-accent mb-1">Plus rapide</div>
            <div className="text-lg font-bold text-foreground">
              {getBestScenario('time').type === 'current' ? 'Actuel' :
               getBestScenario('time').type === 'optimistic' ? 'Optimiste' : 'Conservateur'}
            </div>
            <div className="text-xs text-text-secondary">
              {Math.min(...scenarios.map(s => s.timeToGoal))} mois
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;