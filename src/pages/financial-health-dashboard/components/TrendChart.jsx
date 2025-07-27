import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = ({ 
  period = 'monthly',
  onPeriodChange,
  className = "" 
}) => {
  const [activeChart, setActiveChart] = useState('spending');

  const mockData = {
    monthly: [
      { month: 'Jan', revenus: 3200, depenses: 2400, epargne: 800, mood: 7 },
      { month: 'Fév', revenus: 3200, depenses: 2600, epargne: 600, mood: 6 },
      { month: 'Mar', revenus: 3400, depenses: 2300, epargne: 1100, mood: 8 },
      { month: 'Avr', revenus: 3200, depenses: 2800, epargne: 400, mood: 5 },
      { month: 'Mai', revenus: 3200, depenses: 2200, epargne: 1000, mood: 8 },
      { month: 'Juin', revenus: 3500, depenses: 2500, epargne: 1000, mood: 7 }
    ],
    quarterly: [
      { period: 'Q1 2024', revenus: 9800, depenses: 7300, epargne: 2500, mood: 7 },
      { period: 'Q2 2024', revenus: 9900, depenses: 7500, epargne: 2400, mood: 6.7 },
      { period: 'Q3 2024', revenus: 10200, depenses: 7200, epargne: 3000, mood: 7.5 },
      { period: 'Q4 2024', revenus: 10500, depenses: 7800, epargne: 2700, mood: 7.2 }
    ]
  };

  const chartTypes = [
    {
      id: 'spending',
      label: 'Dépenses vs Revenus',
      icon: 'TrendingUp',
      color: 'var(--color-primary)'
    },
    {
      id: 'savings',
      label: 'Évolution Épargne',
      icon: 'PiggyBank',
      color: 'var(--color-success)'
    },
    {
      id: 'mood',
      label: 'Humeur Financière',
      icon: 'Heart',
      color: 'var(--color-accent)'
    }
  ];

  const periods = [
    { id: 'monthly', label: 'Mensuel', icon: 'Calendar' },
    { id: 'quarterly', label: 'Trimestriel', icon: 'CalendarDays' },
    { id: 'annual', label: 'Annuel', icon: 'CalendarRange' }
  ];

  const data = mockData[period] || mockData.monthly;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-border/20">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'mood' ? `${entry.value}/10` : formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'spending':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={period === 'monthly' ? 'month' : 'period'} 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenus"
                stackId="1"
                stroke="var(--color-success)"
                fill="var(--color-success)"
                fillOpacity={0.3}
                name="Revenus"
              />
              <Area
                type="monotone"
                dataKey="depenses"
                stackId="2"
                stroke="var(--color-error)"
                fill="var(--color-error)"
                fillOpacity={0.3}
                name="Dépenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'savings':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={period === 'monthly' ? 'month' : 'period'} 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="epargne"
                stroke="var(--color-success)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                name="Épargne"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'mood':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={period === 'monthly' ? 'month' : 'period'} 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 10]}
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="var(--color-accent)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                name="Humeur"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            Analyse des Tendances
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Évolution de vos finances sur 6 mois
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="flex items-center space-x-2">
          {periods.map((periodOption) => (
            <Button
              key={periodOption.id}
              variant={period === periodOption.id ? "default" : "outline"}
              size="sm"
              iconName={periodOption.icon}
              onClick={() => onPeriodChange && onPeriodChange(periodOption.id)}
            >
              {periodOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTypes.map((chart) => (
          <Button
            key={chart.id}
            variant={activeChart === chart.id ? "default" : "outline"}
            size="sm"
            iconName={chart.icon}
            iconPosition="left"
            onClick={() => setActiveChart(chart.id)}
          >
            {chart.label}
          </Button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-surface rounded-xl p-4 border border-border/10">
        {renderChart()}
      </div>

      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Tendance positive</span>
          </div>
          <p className="text-xs text-text-secondary">
            Votre épargne a augmenté de 25% ce trimestre
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Attention</span>
          </div>
          <p className="text-xs text-text-secondary">
            Dépenses variables en hausse de 15%
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Objectif</span>
          </div>
          <p className="text-xs text-text-secondary">
            Maintenez ce rythme pour atteindre vos objectifs
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;