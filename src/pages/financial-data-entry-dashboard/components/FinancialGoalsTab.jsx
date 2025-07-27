import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FinancialGoalsTab = ({ goalsData, onUpdateGoals }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const goalTypeOptions = [
    { value: 'emergency_fund', label: 'Fonds d\'urgence' },
    { value: 'house_purchase', label: 'Achat immobilier' },
    { value: 'vacation', label: 'Vacances' },
    { value: 'retirement', label: 'Retraite' },
    { value: 'education', label: 'Éducation' },
    { value: 'car_purchase', label: 'Achat véhicule' },
    { value: 'investment', label: 'Investissement' },
    { value: 'debt_payoff', label: 'Remboursement dette' },
    { value: 'other', label: 'Autre' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'Haute' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Basse' }
  ];

  const timeframeOptions = [
    { value: '3_months', label: '3 mois' },
    { value: '6_months', label: '6 mois' },
    { value: '1_year', label: '1 an' },
    { value: '2_years', label: '2 ans' },
    { value: '5_years', label: '5 ans' },
    { value: '10_years', label: '10 ans' },
    { value: 'long_term', label: 'Long terme (10+ ans)' }
  ];

  const onSubmit = (data) => {
    const newGoal = {
      id: editingId || Date.now(),
      ...data,
      targetAmount: parseFloat(data.targetAmount),
      currentAmount: parseFloat(data.currentAmount || 0),
      monthlyContribution: parseFloat(data.monthlyContribution || 0),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      onUpdateGoals(goalsData.map(item => 
        item.id === editingId ? newGoal : item
      ));
      setEditingId(null);
    } else {
      onUpdateGoals([...goalsData, newGoal]);
      setShowAddForm(false);
    }
    
    reset();
  };

  const handleEdit = (goal) => {
    setEditingId(goal.id);
    setShowAddForm(true);
    reset(goal);
  };

  const handleDelete = (id) => {
    onUpdateGoals(goalsData.filter(item => item.id !== id));
  };

  const calculateTimeToGoal = (targetAmount, currentAmount, monthlyContribution) => {
    if (!monthlyContribution || monthlyContribution <= 0) return null;
    
    const remaining = targetAmount - currentAmount;
    if (remaining <= 0) return { months: 0, years: 0 };
    
    const months = Math.ceil(remaining / monthlyContribution);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    return { months: remainingMonths, years, totalMonths: months };
  };

  const getGoalIcon = (type) => {
    const icons = {
      emergency_fund: 'Shield',
      house_purchase: 'Home',
      vacation: 'Plane',
      retirement: 'Clock',
      education: 'GraduationCap',
      car_purchase: 'Car',
      investment: 'TrendingUp',
      debt_payoff: 'CreditCard',
      other: 'Target'
    };
    return icons[type] || 'Target';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors[priority] || 'text-text-secondary';
  };

  const getPriorityBgColor = (priority) => {
    const colors = {
      high: 'bg-error/10',
      medium: 'bg-warning/10',
      low: 'bg-success/10'
    };
    return colors[priority] || 'bg-muted';
  };

  const calculateProgress = (current, target) => {
    if (!target || target <= 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const totalGoalAmount = goalsData.reduce((total, goal) => total + goal.targetAmount, 0);
  const totalCurrentAmount = goalsData.reduce((total, goal) => total + goal.currentAmount, 0);
  const totalMonthlyContributions = goalsData.reduce((total, goal) => total + goal.monthlyContribution, 0);

  const targetAmount = watch('targetAmount', 0);
  const currentAmount = watch('currentAmount', 0);
  const monthlyContribution = watch('monthlyContribution', 0);

  const timeToGoal = calculateTimeToGoal(
    parseFloat(targetAmount) || 0,
    parseFloat(currentAmount) || 0,
    parseFloat(monthlyContribution) || 0
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={20} color="var(--color-primary)" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Objectifs totaux
              </h3>
            </div>
            <span className="text-2xl font-bold text-primary">
              {totalGoalAmount.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
            <p className="text-sm text-text-secondary mt-1">
              {goalsData.length} objectif{goalsData.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="PiggyBank" size={20} color="var(--color-success)" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Épargne actuelle
              </h3>
            </div>
            <span className="text-2xl font-bold text-success">
              {totalCurrentAmount.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
            <p className="text-sm text-text-secondary mt-1">
              {totalGoalAmount > 0 ? Math.round((totalCurrentAmount / totalGoalAmount) * 100) : 0}% atteint
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={20} color="var(--color-secondary)" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Contributions mensuelles
              </h3>
            </div>
            <span className="text-2xl font-bold text-secondary">
              {totalMonthlyContributions.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
            <p className="text-sm text-text-secondary mt-1">
              Par mois
            </p>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goalsData.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const timeToComplete = calculateTimeToGoal(goal.targetAmount, goal.currentAmount, goal.monthlyContribution);
          
          return (
            <div key={goal.id} className="glass rounded-xl p-4 border border-border/20 hover:glass-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getGoalIcon(goal.type)} 
                      size={20} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground">
                      {goal.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary capitalize">
                        {goalTypeOptions.find(opt => opt.value === goal.type)?.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBgColor(goal.priority)} ${getPriorityColor(goal.priority)}`}>
                        {priorityOptions.find(opt => opt.value === goal.priority)?.label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(goal)}
                  >
                    <Icon name="Edit2" size={16} color="var(--color-text-secondary)" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(goal.id)}
                  >
                    <Icon name="Trash2" size={16} color="var(--color-error)" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Progression</span>
                  <span className="text-sm font-medium text-foreground">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-600 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Goal Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary block">Objectif</span>
                  <span className="font-medium text-foreground">
                    {goal.targetAmount.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>
                
                <div>
                  <span className="text-text-secondary block">Épargné</span>
                  <span className="font-medium text-success">
                    {goal.currentAmount.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>
                
                <div>
                  <span className="text-text-secondary block">Mensuel</span>
                  <span className="font-medium text-secondary">
                    {goal.monthlyContribution.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>
                
                <div>
                  <span className="text-text-secondary block">Temps restant</span>
                  {timeToComplete && timeToComplete.totalMonths > 0 ? (
                    <span className="font-medium text-foreground">
                      {timeToComplete.years > 0 && `${timeToComplete.years}a `}
                      {timeToComplete.months}m
                    </span>
                  ) : progress >= 100 ? (
                    <span className="font-medium text-success">Atteint !</span>
                  ) : (
                    <span className="text-text-secondary">N/A</span>
                  )}
                </div>
              </div>

              {goal.description && (
                <p className="text-xs text-text-secondary mt-3">
                  {goal.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="glass rounded-xl p-6 border border-border/20 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {editingId ? 'Modifier l\'objectif financier' : 'Ajouter un objectif financier'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                reset();
              }}
            >
              <Icon name="X" size={20} color="var(--color-text-secondary)" />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom de l'objectif"
                type="text"
                placeholder="Ex: Fonds d'urgence, Vacances en Italie..."
                {...register('name', { required: 'Ce champ est requis' })}
                error={errors.name?.message}
                required
              />

              <Select
                label="Type d'objectif"
                options={goalTypeOptions}
                {...register('type', { required: 'Sélectionnez un type' })}
                error={errors.type?.message}
                required
              />

              <Input
                label="Montant cible"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('targetAmount', { 
                  required: 'Ce champ est requis',
                  min: { value: 0, message: 'Le montant doit être positif' }
                })}
                error={errors.targetAmount?.message}
                required
              />

              <Input
                label="Montant actuel"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('currentAmount')}
                error={errors.currentAmount?.message}
              />

              <Input
                label="Contribution mensuelle"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('monthlyContribution')}
                error={errors.monthlyContribution?.message}
              />

              <Select
                label="Priorité"
                options={priorityOptions}
                {...register('priority', { required: 'Sélectionnez une priorité' })}
                error={errors.priority?.message}
                required
              />

              <Select
                label="Échéance souhaitée"
                options={timeframeOptions}
                {...register('timeframe')}
                error={errors.timeframe?.message}
              />

              {/* Time to Goal Calculator Preview */}
              {timeToGoal && timeToGoal.totalMonths > 0 && (
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calculator" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">
                      Temps estimé pour atteindre l'objectif
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {timeToGoal.years > 0 && `${timeToGoal.years} an${timeToGoal.years > 1 ? 's' : ''} `}
                    {timeToGoal.months} mois
                  </div>
                  <div className="text-xs text-text-secondary">
                    Avec les contributions mensuelles actuelles
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Description (optionnel)"
              type="text"
              placeholder="Détails sur cet objectif..."
              {...register('description')}
            />

            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  reset();
                }}
              >
                Annuler
              </Button>
              <Button type="submit" variant="default">
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <Button
          variant="outline"
          onClick={() => setShowAddForm(true)}
          className="w-full border-dashed border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
        >
          <Icon name="Plus" size={20} color="var(--color-primary)" />
          <span className="ml-2">Ajouter un objectif financier</span>
        </Button>
      )}
    </div>
  );
};

export default FinancialGoalsTab;