import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionalSpendingChart = ({ 
  data = [],
  period = 'monthly',
  className = "" 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockData = [
    { date: '2025-01-01', mood: 8, spending: 45, category: 'alimentation', description: 'Courses hebdomadaires' },
    { date: '2025-01-02', mood: 6, spending: 120, category: 'shopping', description: 'Achat impulsif vêtements' },
    { date: '2025-01-03', mood: 4, spending: 85, category: 'restaurants', description: 'Dîner réconfort' },
    { date: '2025-01-04', mood: 7, spending: 25, category: 'transport', description: 'Taxi retour' },
    { date: '2025-01-05', mood: 3, spending: 200, category: 'shopping', description: 'Shopping thérapie' },
    { date: '2025-01-06', mood: 9, spending: 15, category: 'cafés', description: 'Café avec ami' },
    { date: '2025-01-07', mood: 5, spending: 150, category: 'divertissement', description: 'Sortie cinéma + dîner' },
    { date: '2025-01-08', mood: 8, spending: 35, category: 'alimentation', description: 'Marché bio' },
    { date: '2025-01-09', mood: 2, spending: 300, category: 'shopping', description: 'Achat compulsif électronique' },
    { date: '2025-01-10', mood: 7, spending: 60, category: 'restaurants', description: 'Déjeuner travail' },
    { date: '2025-01-11', mood: 6, spending: 40, category: 'transport', description: 'Uber' },
    { date: '2025-01-12', mood: 9, spending: 20, category: 'cafés', description: 'Café matinal' },
    { date: '2025-01-13', mood: 4, spending: 180, category: 'divertissement', description: 'Concert + boissons' },
    { date: '2025-01-14', mood: 8, spending: 55, category: 'alimentation', description: 'Courses spéciales' },
    { date: '2025-01-15', mood: 1, spending: 450, category: 'shopping', description: 'Crise shopping stress' }
  ];

  const displayData = data.length > 0 ? data : mockData;

  const categories = [
    { id: 'all', label: 'Toutes', color: 'var(--color-primary)' },
    { id: 'shopping', label: 'Shopping', color: 'var(--color-error)' },
    { id: 'restaurants', label: 'Restaurants', color: 'var(--color-warning)' },
    { id: 'divertissement', label: 'Divertissement', color: 'var(--color-secondary)' },
    { id: 'alimentation', label: 'Alimentation', color: 'var(--color-success)' },
    { id: 'transport', label: 'Transport', color: 'var(--color-accent)' },
    { id: 'cafés', label: 'Cafés', color: 'var(--color-muted-foreground)' }
  ];

  const filteredData = selectedCategory === 'all' 
    ? displayData 
    : displayData.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category) => {
    const categoryConfig = categories.find(c => c.id === category);
    return categoryConfig ? categoryConfig.color : 'var(--color-primary)';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass p-3 rounded-lg border border-border/20 max-w-xs">
          <div className="font-medium text-foreground mb-2">
            {new Date(data.date).toLocaleDateString('fr-FR')}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Humeur:</span>
              <span className="font-medium">{data.mood}/10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Dépense:</span>
              <span className="font-medium">{formatCurrency(data.spending)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Catégorie:</span>
              <span className="font-medium capitalize">{data.category}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-border/20">
              <p className="text-xs text-text-secondary">{data.description}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate correlation
  const calculateCorrelation = () => {
    if (filteredData.length < 2) return 0;
    
    const n = filteredData.length;
    const sumMood = filteredData.reduce((sum, item) => sum + item.mood, 0);
    const sumSpending = filteredData.reduce((sum, item) => sum + item.spending, 0);
    const sumMoodSpending = filteredData.reduce((sum, item) => sum + (item.mood * item.spending), 0);
    const sumMoodSquared = filteredData.reduce((sum, item) => sum + (item.mood * item.mood), 0);
    const sumSpendingSquared = filteredData.reduce((sum, item) => sum + (item.spending * item.spending), 0);
    
    const numerator = (n * sumMoodSpending) - (sumMood * sumSpending);
    const denominator = Math.sqrt(((n * sumMoodSquared) - (sumMood * sumMood)) * ((n * sumSpendingSquared) - (sumSpending * sumSpending)));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  const correlation = calculateCorrelation();
  const correlationStrength = Math.abs(correlation);
  const correlationType = correlation < -0.3 ? 'negative' : correlation > 0.3 ? 'positive' : 'neutral';

  const getCorrelationInsight = () => {
    if (correlationType === 'negative') {
      return {
        icon: 'TrendingDown',
        color: 'var(--color-error)',
        text: 'Dépenses élevées quand l\'humeur est basse',
        description: 'Tendance au shopping émotionnel compensatoire'
      };
    } else if (correlationType === 'positive') {
      return {
        icon: 'TrendingUp',
        color: 'var(--color-success)',
        text: 'Dépenses élevées quand l\'humeur est haute',
        description: 'Dépenses de célébration ou de plaisir'
      };
    } else {
      return {
        icon: 'Minus',
        color: 'var(--color-text-secondary)',
        text: 'Pas de corrélation significative',
        description: 'Vos dépenses ne semblent pas liées à votre humeur'
      };
    }
  };

  const insight = getCorrelationInsight();

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            Corrélation Humeur-Dépenses
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Analyse de vos patterns émotionnels
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name={insight.icon} size={16} color={insight.color} />
          <span className="text-sm font-medium" style={{ color: insight.color }}>
            {(correlation * 100).toFixed(0)}% corrélation
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="text-xs"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Scatter Chart */}
      <div className="bg-surface rounded-xl p-4 border border-border/10 mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number"
              dataKey="mood"
              domain={[0, 10]}
              name="Humeur"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'Humeur (1-10)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number"
              dataKey="spending"
              name="Dépenses"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={formatCurrency}
              label={{ value: 'Dépenses (€)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Dépenses" dataKey="spending" fill="var(--color-primary)">
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Insight */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl mb-6">
        <div className="flex items-start space-x-3">
          <Icon name={insight.icon} size={20} color={insight.color} />
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-1">
              {insight.text}
            </h4>
            <p className="text-sm text-text-secondary">
              {insight.description}
            </p>
            <div className="mt-2 text-xs text-text-secondary">
              Force de corrélation: {correlationStrength > 0.7 ? 'Forte' : correlationStrength > 0.3 ? 'Modérée' : 'Faible'}
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-surface rounded-xl border border-border/10">
          <h5 className="font-heading font-semibold text-foreground mb-3">
            Dépenses par humeur
          </h5>
          <div className="space-y-2">
            {[
              { range: '1-3', label: 'Humeur basse', avg: filteredData.filter(d => d.mood <= 3).reduce((sum, d) => sum + d.spending, 0) / filteredData.filter(d => d.mood <= 3).length || 0 },
              { range: '4-6', label: 'Humeur moyenne', avg: filteredData.filter(d => d.mood >= 4 && d.mood <= 6).reduce((sum, d) => sum + d.spending, 0) / filteredData.filter(d => d.mood >= 4 && d.mood <= 6).length || 0 },
              { range: '7-10', label: 'Humeur haute', avg: filteredData.filter(d => d.mood >= 7).reduce((sum, d) => sum + d.spending, 0) / filteredData.filter(d => d.mood >= 7).length || 0 }
            ].map((item) => (
              <div key={item.range} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(item.avg)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-border/10">
          <h5 className="font-heading font-semibold text-foreground mb-3">
            Catégories à risque
          </h5>
          <div className="space-y-2">
            {categories
              .filter(c => c.id !== 'all')
              .map(category => {
                const categoryData = displayData.filter(d => d.category === category.id);
                const lowMoodSpending = categoryData.filter(d => d.mood <= 4).reduce((sum, d) => sum + d.spending, 0);
                const totalSpending = categoryData.reduce((sum, d) => sum + d.spending, 0);
                const riskPercentage = totalSpending > 0 ? (lowMoodSpending / totalSpending) * 100 : 0;
                
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-text-secondary capitalize">{category.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${riskPercentage > 50 ? 'text-error' : riskPercentage > 25 ? 'text-warning' : 'text-success'}`}>
                      {riskPercentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalSpendingChart;