import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ scenarios, onSaveScenario, onExportPDF, onShareScenario, className = "" }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveScenario(scenarios);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate PDF export
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExportPDF(scenarios);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = (method) => {
    onShareScenario(scenarios, method);
    setShowShareOptions(false);
  };

  const quickActions = [
    {
      id: 'reset',
      label: 'Réinitialiser',
      icon: 'RotateCcw',
      color: 'text-text-secondary',
      action: () => {
        // Reset all scenarios to default values
        // Resetting scenarios...
      }
    },
    {
      id: 'duplicate',
      label: 'Dupliquer',
      icon: 'Copy',
      color: 'text-primary',
      action: () => {
        // Duplicating scenario...
      }
    },
    {
      id: 'compare',
      label: 'Comparer',
      icon: 'GitCompare',
      color: 'text-secondary',
      action: () => {
        // Opening comparison view...
      }
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Actions */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Actions rapides
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            Sauvegarder
          </Button>

          <Button
            variant="outline"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Exporter PDF
          </Button>

          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setShowShareOptions(!showShareOptions)}
              iconName="Share2"
              iconPosition="left"
              fullWidth
            >
              Partager
            </Button>

            {showShareOptions && (
              <div className="absolute top-full left-0 right-0 mt-2 glass rounded-lg border border-border/20 z-10">
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => handleShare('email')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    <Icon name="Mail" size={16} />
                    <span>Par email</span>
                  </button>
                  <button
                    onClick={() => handleShare('link')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    <Icon name="Link" size={16} />
                    <span>Copier le lien</span>
                  </button>
                  <button
                    onClick={() => handleShare('social')}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  >
                    <Icon name="Share" size={16} />
                    <span>Réseaux sociaux</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Outils rapides
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/30 transition-colors group"
            >
              <Icon 
                name={action.icon} 
                size={24} 
                color={action.color.replace('text-', 'var(--color-') + ')'} 
                className="group-hover:scale-110 transition-transform"
              />
              <span className={`text-xs font-medium ${action.color} group-hover:text-primary`}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Summary */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} color="var(--color-success)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Résumé des scénarios
          </h3>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <div key={scenario.type} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: scenario.type === 'current' ? '#4F46E5' : 
                                   scenario.type === 'optimistic' ? '#10B981' : '#F59E0B' 
                  }}
                />
                <div>
                  <div className="font-medium text-sm text-foreground">{scenario.name}</div>
                  <div className="text-xs text-text-secondary">
                    Santé: {scenario.overallHealthIndex}/100
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-foreground">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(scenario.monthlySavings)}
                </div>
                <div className="text-xs text-text-secondary">par mois</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips and Insights */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Conseils personnalisés
          </h3>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
            <div className="text-sm font-medium text-primary mb-1">
              Optimisation suggérée
            </div>
            <div className="text-xs text-text-secondary leading-relaxed">
              En réduisant vos dépenses variables de 15%, vous pourriez augmenter votre épargne mensuelle de 280€.
            </div>
          </div>

          <div className="p-3 bg-success/5 rounded-lg border-l-4 border-success">
            <div className="text-sm font-medium text-success mb-1">
              Objectif réalisable
            </div>
            <div className="text-xs text-text-secondary leading-relaxed">
              Votre scénario optimiste semble réaliste. Vous pourriez atteindre vos objectifs 3 mois plus tôt.
            </div>
          </div>

          <div className="p-3 bg-warning/5 rounded-lg border-l-4 border-warning">
            <div className="text-sm font-medium text-warning mb-1">
              Point d'attention
            </div>
            <div className="text-xs text-text-secondary leading-relaxed">
              Vérifiez vos frais cachés récurrents. Ils représentent 12% de vos dépenses mensuelles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;