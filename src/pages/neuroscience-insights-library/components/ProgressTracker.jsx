import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  completedModules = 0, 
  totalModules = 24, 
  currentStreak = 0, 
  longestStreak = 0,
  weeklyGoal = 5,
  weeklyProgress = 3,
  achievements = []
}) => {
  const completionPercentage = (completedModules / totalModules) * 100;
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100;

  const getStreakIcon = (streak) => {
    if (streak >= 7) return 'Flame';
    if (streak >= 3) return 'Zap';
    return 'Target';
  };

  const getStreakColor = (streak) => {
    if (streak >= 7) return 'var(--color-error)';
    if (streak >= 3) return 'var(--color-warning)';
    return 'var(--color-primary)';
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Votre progression
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-xs text-text-secondary">
              Complété
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              {completedModules} sur {totalModules} modules
            </span>
            <span className="text-primary font-medium">
              {totalModules - completedModules} restants
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-600 ease-out relative overflow-hidden"
              style={{ width: `${completionPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Streak */}
        <div className="glass rounded-xl p-4 border border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-warning to-error rounded-xl flex items-center justify-center">
              <Icon 
                name={getStreakIcon(currentStreak)} 
                size={20} 
                color="white" 
                strokeWidth={2.5} 
              />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {currentStreak}
              </div>
              <div className="text-xs text-text-secondary">
                Série actuelle
              </div>
            </div>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="glass rounded-xl p-4 border border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-success to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Trophy" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {longestStreak}
              </div>
              <div className="text-xs text-text-secondary">
                Record personnel
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="glass rounded-xl p-4 border border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {weeklyProgress}/{weeklyGoal}
              </div>
              <div className="text-xs text-text-secondary">
                Cette semaine
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-xl p-4 border border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center">
              <Icon name="Award" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {achievements.length}
              </div>
              <div className="text-xs text-text-secondary">
                Récompenses
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="glass rounded-xl p-4 border border-border/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-heading font-semibold text-base text-foreground">
            Objectif hebdomadaire
          </h4>
          <span className="text-sm text-primary font-medium">
            {Math.round(weeklyPercentage)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${weeklyPercentage}%` }}
          />
        </div>
        <div className="text-xs text-text-secondary">
          {weeklyGoal - weeklyProgress} modules restants pour atteindre votre objectif
        </div>
      </div>

      {/* Recent Achievements */}
      {achievements.length > 0 && (
        <div className="glass rounded-xl p-4 border border-border/20">
          <h4 className="font-heading font-semibold text-base text-foreground mb-3">
            Récompenses récentes
          </h4>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${achievement.rarity === 'rare' ?'bg-gradient-to-br from-accent to-warning' :'bg-gradient-to-br from-primary to-secondary'
                  }
                `}>
                  <Icon 
                    name={achievement.icon} 
                    size={16} 
                    color="white" 
                    strokeWidth={2.5} 
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {achievement.description}
                  </div>
                </div>
                <div className="text-xs text-text-secondary">
                  {achievement.earnedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className="glass rounded-xl p-4 border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start space-x-3">
          <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
          <div>
            <h4 className="font-heading font-semibold text-base text-primary mb-1">
              Conseil du jour
            </h4>
            <p className="text-sm text-text-primary leading-relaxed">
              {currentStreak >= 3 
                ? `Excellente série de ${currentStreak} jours ! Continuez sur cette lancée pour développer une habitude d'apprentissage durable.` : "Commencez petit : même 5 minutes d'apprentissage par jour peuvent transformer votre relation à l'argent."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;