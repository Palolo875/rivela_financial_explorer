import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BehavioralAlerts = ({ 
  alerts = [],
  onDismissAlert,
  onViewDetails,
  className = "" 
}) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const mockAlerts = [
    {
      id: 1,
      type: 'spending_spike',
      severity: 'high',
      title: 'Pic de dépenses détecté',
      message: 'Vos dépenses ont augmenté de 35% cette semaine par rapport à votre moyenne.',
      details: `Analyse détaillée:\n• Restaurants: +120€ (+80%)\n• Shopping: +85€ (+45%)\n• Divertissement: +45€ (+30%)\n\nCette augmentation coïncide avec une période de stress émotionnel (humeur: 4/10).`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'emotional_spending',
      actionable: true,
      suggestions: [
        'Définir un budget hebdomadaire pour les sorties',
        'Utiliser la règle des 24h avant tout achat impulsif',
        'Identifier vos déclencheurs émotionnels'
      ]
    },
    {
      id: 2,
      type: 'goal_deviation',
      severity: 'medium',
      title: 'Objectif d\'épargne en retard',
      message: 'Votre objectif "Fonds d\'urgence" accuse un retard de 2 semaines.',
      details: `Progression actuelle: 64% (3.200€ / 5.000€)\nRythme requis: 280€/mois\nRythme actuel: 220€/mois\nÉcart: -60€/mois`,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'goal_tracking',
      actionable: true,
      suggestions: [
        'Réduire les dépenses variables de 60€/mois',
        'Rechercher des sources de revenus complémentaires',
        'Réviser la date limite de l\'objectif'
      ]
    },
    {
      id: 3,
      type: 'pattern_anomaly',
      severity: 'low',
      title: 'Nouveau schéma de dépenses',
      message: 'Augmentation inhabituelle des achats en ligne le weekend.',
      details: `Tendance observée sur les 3 dernières semaines:\n• Samedi: +45% d'achats en ligne\n• Dimanche: +30% d'achats en ligne\n• Corrélation avec l'humeur: -20%`,timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),category: 'behavioral_pattern',
      actionable: false,
      suggestions: [
        'Planifier des activités alternatives le weekend','Désactiver les notifications d\'applications shopping',
        'Créer une liste d\'achats hebdomadaire'
      ]
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  const getAlertConfig = (type, severity) => {
    const severityConfigs = {
      high: {
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        iconColor: 'var(--color-error)',
        textColor: 'text-error'
      },
      medium: {
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        iconColor: 'var(--color-warning)',
        textColor: 'text-warning'
      },
      low: {
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        iconColor: 'var(--color-primary)',
        textColor: 'text-primary'
      }
    };

    const typeIcons = {
      spending_spike: 'TrendingUp',
      goal_deviation: 'Target',
      pattern_anomaly: 'Eye',
      emotional_spending: 'Heart',
      budget_exceeded: 'AlertTriangle'
    };

    return {
      ...severityConfigs[severity],
      icon: typeIcons[type] || 'AlertCircle'
    };
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    return 'À l\'instant';
  };

  const toggleExpanded = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            Alertes Comportementales
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Détection automatique des anomalies
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            {displayAlerts.filter(a => a.severity === 'high').length} urgentes
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {displayAlerts.map((alert) => {
          const config = getAlertConfig(alert.type, alert.severity);
          const isExpanded = expandedAlert === alert.id;

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${config.bgColor} ${config.borderColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <Icon 
                      name={config.icon} 
                      size={20} 
                      color={config.iconColor}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-heading font-semibold text-foreground">
                        {alert.title}
                      </h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.textColor} ${config.bgColor}`}>
                        {alert.severity === 'high' ? 'Urgent' : 
                         alert.severity === 'medium' ? 'Modéré' : 'Info'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-primary mb-2">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>{formatTimeAgo(alert.timestamp)}</span>
                      <span>•</span>
                      <span className="capitalize">{alert.category.replace('_', ' ')}</span>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 space-y-4">
                        <div className="p-3 bg-surface rounded-lg">
                          <h5 className="font-medium text-foreground mb-2">Détails de l'analyse</h5>
                          <pre className="text-sm text-text-secondary whitespace-pre-wrap font-body">
                            {alert.details}
                          </pre>
                        </div>

                        {alert.suggestions && alert.suggestions.length > 0 && (
                          <div>
                            <h5 className="font-medium text-foreground mb-2">Suggestions d'actions</h5>
                            <ul className="space-y-2">
                              {alert.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Icon name="CheckCircle2" size={14} color="var(--color-success)" className="mt-0.5" />
                                  <span className="text-sm text-text-secondary">{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                    onClick={() => toggleExpanded(alert.id)}
                  />
                  
                  {alert.actionable && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      onClick={() => onViewDetails && onViewDetails(alert.id)}
                    >
                      Agir
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => onDismissAlert && onDismissAlert(alert.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-muted/50 to-muted/20 rounded-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-error">
              {displayAlerts.filter(a => a.severity === 'high').length}
            </div>
            <div className="text-xs text-text-secondary">Urgentes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">
              {displayAlerts.filter(a => a.severity === 'medium').length}
            </div>
            <div className="text-xs text-text-secondary">Modérées</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">
              {displayAlerts.filter(a => a.actionable).length}
            </div>
            <div className="text-xs text-text-secondary">Actionnables</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralAlerts;