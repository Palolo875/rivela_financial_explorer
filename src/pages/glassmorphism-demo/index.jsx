import React, { useState } from 'react';
import DashboardCard, { MetricCard, ChartCard, InsightCard } from '../../components/ui/DashboardCard';
import Button, { GlassButton, GradientButton, FloatingActionButton, CelebrationButton } from '../../components/ui/Button';
import Input, { SearchInput, PasswordInput, NumberInput } from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const GlassmorphismDemo = () => {
  const [searchValue, setSearchValue] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');

  // Données d'exemple pour les graphiques
  const chartData = [
    { name: 'Jan', value: 4000, color: 'var(--color-chart-1)' },
    { name: 'Fév', value: 3000, color: 'var(--color-chart-2)' },
    { name: 'Mar', value: 5000, color: 'var(--color-chart-3)' },
    { name: 'Avr', value: 4500, color: 'var(--color-chart-4)' },
    { name: 'Mai', value: 6000, color: 'var(--color-chart-5)' },
    { name: 'Jun', value: 5500, color: 'var(--color-chart-6)' },
  ];

  const handleCelebration = () => {
    console.log('🎉 Célébration déclenchée!');
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header avec dégradé */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold font-heading text-gradient-primary">
          Rivela Design System
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Démonstration du système glassmorphism pastel soft inspiré par les spécifications détaillées
        </p>
      </div>

      {/* Section Metrics Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Cartes Métriques Glassmorphism
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            value="€2,450"
            label="Épargne mensuelle"
            trend="up"
            trendValue="+12%"
            icon="TrendingUp"
          />
          
          <MetricCard
            value="€1,200"
            label="Dépenses variables"
            trend="down"
            trendValue="-8%"
            icon="ShoppingCart"
          />
          
          <MetricCard
            value="75%"
            label="Objectifs atteints"
            trend="up"
            trendValue="+5%"
            icon="Target"
          />
          
          <MetricCard
            value="€15,600"
            label="Budget total"
            trend="stable"
            trendValue="0%"
            icon="Wallet"
          />
        </div>
      </section>

      {/* Section Chart Card */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Visualisations de Données
        </h2>
        
        <ChartCard
          title="Évolution Financière"
          subtitle="Suivi mensuel de vos finances personnelles"
        >
          <div className="space-y-4">
            {/* Graphique simplifié avec barres */}
            <div className="flex items-end justify-between h-40 space-x-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div 
                    className="w-full rounded-t-lg transition-all duration-1000 ease-out data-point"
                    style={{
                      height: `${(item.value / 6000) * 100}%`,
                      background: `linear-gradient(to top, ${item.color}, ${item.color}80)`
                    }}
                  />
                  <span className="text-xs text-text-secondary font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Légende */}
            <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-glass-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-accent"></div>
                <span className="text-sm text-text-secondary">Revenus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-success"></div>
                <span className="text-sm text-text-secondary">Épargne</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-warning"></div>
                <span className="text-sm text-text-secondary">Dépenses</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </section>

      {/* Section Insight Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Cartes d'Insights Personnalisés
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InsightCard
            title="Conseil personnalisé"
            insight="Excellente progression ! Votre épargne a augmenté de 12% ce mois-ci. Continuez sur cette voie pour atteindre vos objectifs financiers."
            type="success"
            icon="TrendingUp"
          />
          
          <InsightCard
            title="Opportunité d'optimisation"
            insight="Vos dépenses variables ont baissé. C'est le moment idéal pour rediriger ces économies vers votre épargne de précaution."
            type="primary"
            icon="Lightbulb"
          />
          
          <InsightCard
            title="Alerte budgétaire"
            insight="Attention, vous approchez de votre limite de dépenses pour les loisirs ce mois-ci. Pensez à ajuster votre budget."
            type="warning"
            icon="AlertTriangle"
          />
          
          <InsightCard
            title="Objectif en vue"
            insight="Plus que 3 mois pour atteindre votre objectif d'épargne pour les vacances ! Vous êtes sur la bonne voie."
            type="info"
            icon="Target"
          />
        </div>
      </section>

      {/* Section Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Système de Boutons Glassmorphism
        </h2>
        
        <div className="space-y-8">
          {/* Boutons principaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Variants Principaux</h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton iconName="Search">Rechercher</GlassButton>
              <GradientButton iconName="Plus">Ajouter</GradientButton>
              <Button variant="primary" iconName="Save">Enregistrer</Button>
              <Button variant="secondary" iconName="Download">Télécharger</Button>
              <Button variant="success" iconName="Check">Valider</Button>
              <Button variant="warning" iconName="AlertTriangle">Attention</Button>
              <Button variant="danger" iconName="Trash2">Supprimer</Button>
            </div>
          </div>
          
          {/* Boutons avec animations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Animations & Micro-interactions</h3>
            <div className="flex flex-wrap gap-4">
              <CelebrationButton onClick={handleCelebration} iconName="Sparkles">
                Célébrer
              </CelebrationButton>
              <Button variant="floating" iconName="Zap" animate={true}>
                Animation
              </Button>
              <Button variant="outline" iconName="Heart" className="hover:animate-breathe">
                Respiration
              </Button>
            </div>
          </div>
          
          {/* Boutons de tailles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Tailles</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs" variant="glass">Extra Small</Button>
              <Button size="sm" variant="glass">Small</Button>
              <Button size="default" variant="glass">Default</Button>
              <Button size="lg" variant="glass">Large</Button>
              <Button size="xl" variant="glass">Extra Large</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Inputs */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Système d'Inputs Glassmorphism
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SearchInput
              label="Recherche intelligente"
              placeholder="Tapez votre recherche..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              description="Recherchez dans toutes vos données financières"
            />
            
            <PasswordInput
              label="Mot de passe sécurisé"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              description="Votre mot de passe doit contenir au moins 8 caractères"
            />
            
            <NumberInput
              label="Montant en euros"
              placeholder="0,00"
              currency={true}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              description="Saisissez le montant de votre transaction"
            />
          </div>
          
          <div className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              icon="Mail"
              variant="glass-intense"
              description="Nous ne partagerons jamais votre email"
            />
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-primary">Préférences</label>
              <div className="space-y-3">
                <Input
                  type="checkbox"
                  label="Recevoir les notifications push"
                  variant="glass"
                />
                <Input
                  type="checkbox"
                  label="Newsletter hebdomadaire"
                  variant="glass"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-primary">Fréquence de sauvegarde</label>
              <div className="space-y-2">
                <Input
                  type="radio"
                  name="frequency"
                  label="Quotidienne"
                  variant="glass"
                />
                <Input
                  type="radio"
                  name="frequency"
                  label="Hebdomadaire"
                  variant="glass"
                />
                <Input
                  type="radio"
                  name="frequency"
                  label="Mensuelle"
                  variant="glass"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Cards Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">
          Variants de Cartes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Carte Glass Standard"
            subtitle="Transparence légère"
            variant="glass"
            icon="Layers"
          >
            <p className="text-text-secondary">
              Cette carte utilise l'effet glassmorphism standard avec une transparence de 85% et un flou de 10px.
            </p>
          </DashboardCard>
          
          <DashboardCard
            title="Carte Glass Intense"
            subtitle="Plus de profondeur"
            variant="glass-intense"
            icon="Zap"
          >
            <p className="text-text-secondary">
              Version plus intense avec transparence réduite et flou augmenté pour plus de profondeur visuelle.
            </p>
          </DashboardCard>
          
          <DashboardCard
            title="Carte Gradient"
            subtitle="Arrière-plan coloré"
            variant="gradient"
            icon="Palette"
          >
            <p className="text-text-secondary">
              Utilise un dégradé de fond subtil pour créer une ambiance chaleureuse et moderne.
            </p>
          </DashboardCard>
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton
        iconName="Plus"
        onClick={() => console.log('Action rapide!')}
        animate={true}
      />
    </div>
  );
};

export default GlassmorphismDemo;