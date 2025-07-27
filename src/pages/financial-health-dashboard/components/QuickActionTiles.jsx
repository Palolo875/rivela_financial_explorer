import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionTiles = ({ 
  onQuickAction,
  recentActivity = [],
  className = "" 
}) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add_expense',
      title: 'Ajouter Dépense',
      description: 'Enregistrer une nouvelle dépense',
      icon: 'Plus',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      action: () => navigate('/financial-data-entry-dashboard')
    },
    {
      id: 'update_goal',
      title: 'Modifier Objectif',
      description: 'Ajuster vos objectifs financiers',
      icon: 'Target',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      action: () => navigate('/financial-data-entry-dashboard')
    },
    {
      id: 'run_scenario',
      title: 'Nouveau Scénario',
      description: 'Simuler un changement financier',
      icon: 'PlayCircle',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      action: () => navigate('/interactive-scenario-simulator')
    },
    {
      id: 'mood_check',
      title: 'Check Humeur',
      description: 'Enregistrer votre état émotionnel',
      icon: 'Heart',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10',
      action: () => onQuickAction && onQuickAction('mood_check')
    },
    {
      id: 'insights',
      title: 'Voir Insights',
      description: 'Découvrir de nouveaux conseils',
      icon: 'Lightbulb',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      action: () => navigate('/neuroscience-insights-library')
    },
    {
      id: 'export_data',
      title: 'Exporter Données',
      description: 'Télécharger vos analyses',
      icon: 'Download',
      color: 'var(--color-text-secondary)',
      bgColor: 'bg-muted',
      action: () => onQuickAction && onQuickAction('export_data')
    }
  ];

  const mockRecentActivity = [
    {
      id: 1,
      type: 'expense',
      description: 'Restaurant - Déjeuner',
      amount: -25.50,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'restaurants'
    },
    {
      id: 2,
      type: 'income',
      description: 'Salaire mensuel',
      amount: 3200,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'salary'
    },
    {
      id: 3,
      type: 'goal_progress',
      description: 'Fonds d\'urgence +200€',
      amount: 200,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'savings'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Shopping - Vêtements',
      amount: -120,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      category: 'shopping'
    }
  ];

  const displayActivity = recentActivity.length > 0 ? recentActivity : mockRecentActivity;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}j`;
    if (hours > 0) return `${hours}h`;
    return 'maintenant';
  };

  const getActivityIcon = (type) => {
    const icons = {
      expense: 'Minus',
      income: 'Plus',
      goal_progress: 'Target',
      transfer: 'ArrowRightLeft'
    };
    return icons[type] || 'Circle';
  };

  const getActivityColor = (type, amount) => {
    if (type === 'income' || (type === 'goal_progress' && amount > 0)) {
      return 'var(--color-success)';
    }
    if (type === 'expense' || amount < 0) {
      return 'var(--color-error)';
    }
    return 'var(--color-text-secondary)';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Actions Grid */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground">
              Actions Rapides
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Accès direct aux fonctionnalités principales
            </p>
          </div>
          <Icon name="Zap" size={20} color="var(--color-accent)" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`
                p-4 rounded-xl border border-border/20 transition-all duration-300
                hover:scale-105 hover:shadow-lg active:scale-95
                ${action.bgColor} hover:bg-opacity-20
              `}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: action.color + '20' }}
                >
                  <Icon 
                    name={action.icon} 
                    size={24} 
                    color={action.color}
                  />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-foreground">
                    {action.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground">
              Activité Récente
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Vos dernières transactions et actions
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="History"
            onClick={() => navigate('/financial-data-entry-dashboard')}
          >
            Voir tout
          </Button>
        </div>

        <div className="space-y-3">
          {displayActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border/10 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getActivityColor(activity.type, activity.amount) + '20' }}
                >
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={16} 
                    color={getActivityColor(activity.type, activity.amount)}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">
                    {activity.category} • {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p 
                  className="text-sm font-semibold"
                  style={{ color: getActivityColor(activity.type, activity.amount) }}
                >
                  {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-muted/50 to-muted/20 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-success">
                +{formatCurrency(displayActivity.filter(a => a.amount > 0).reduce((sum, a) => sum + a.amount, 0))}
              </div>
              <div className="text-xs text-text-secondary">Entrées</div>
            </div>
            <div>
              <div className="text-lg font-bold text-error">
                {formatCurrency(displayActivity.filter(a => a.amount < 0).reduce((sum, a) => sum + a.amount, 0))}
              </div>
              <div className="text-xs text-text-secondary">Sorties</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">
                {displayActivity.length}
              </div>
              <div className="text-xs text-text-secondary">Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionTiles;