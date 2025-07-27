import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalProgressCard = ({ 
  goals = [],
  onUpdateGoal,
  className = "" 
}) => {
  const mockGoals = [
    {
      id: 1,
      title: "Fonds d\'urgence",
      target: 5000,
      current: 3200,
      deadline: "2025-12-31",
      category: "emergency",
      priority: "high"
    },
    {
      id: 2,
      title: "Achat appartement",
      target: 25000,
      current: 12500,
      deadline: "2026-06-30",
      category: "housing",
      priority: "medium"
    },
    {
      id: 3,
      title: "Vacances été",
      target: 2500,
      current: 1800,
      deadline: "2025-07-01",
      category: "leisure",
      priority: "low"
    }
  ];

  const displayGoals = goals.length > 0 ? goals : mockGoals;

  const getGoalIcon = (category) => {
    const icons = {
      emergency: 'Shield',
      housing: 'Home',
      leisure: 'Plane',
      education: 'GraduationCap',
      investment: 'TrendingUp',
      default: 'Target'
    };
    return icons[category] || icons.default;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors[priority] || 'text-text-secondary';
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getRecommendedAction = (goal) => {
    const progress = calculateProgress(goal.current, goal.target);
    const daysRemaining = calculateDaysRemaining(goal.deadline);
    const monthlyNeeded = (goal.target - goal.current) / (daysRemaining / 30);

    if (progress >= 90) return "Objectif presque atteint !";
    if (daysRemaining < 30) return "Échéance proche, accélérez !";
    if (monthlyNeeded > 500) return `Épargner ${formatCurrency(monthlyNeeded)}/mois`;
    return "Sur la bonne voie";
  };

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            Progression des Objectifs
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Suivi de vos objectifs financiers
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onUpdateGoal && onUpdateGoal('add')}
        >
          Ajouter
        </Button>
      </div>

      <div className="space-y-4">
        {displayGoals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          const daysRemaining = calculateDaysRemaining(goal.deadline);
          
          return (
            <div key={goal.id} className="p-4 bg-surface rounded-xl border border-border/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getGoalIcon(goal.category)} 
                      size={20} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {goal.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-text-secondary">
                        {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority === 'high' ? 'Priorité haute' : 
                         goal.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-text-secondary">
                    {daysRemaining > 0 ? `${daysRemaining}j restants` : 'Échéance dépassée'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={14} color="var(--color-text-secondary)" />
                  <span className="text-sm text-text-secondary">
                    {getRecommendedAction(goal)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onUpdateGoal && onUpdateGoal(goal.id)}
                >
                  Modifier
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {displayGoals.filter(g => calculateProgress(g.current, g.target) >= 100).length}
            </div>
            <div className="text-xs text-text-secondary">Atteints</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {displayGoals.filter(g => calculateProgress(g.current, g.target) >= 50 && calculateProgress(g.current, g.target) < 100).length}
            </div>
            <div className="text-xs text-text-secondary">En cours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {formatCurrency(displayGoals.reduce((sum, g) => sum + g.current, 0))}
            </div>
            <div className="text-xs text-text-secondary">Total épargné</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressCard;