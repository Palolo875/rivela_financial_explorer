import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VariableExpensesTab = ({ variableExpensesData, onUpdateVariableExpenses }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const categoryOptions = [
    { value: 'food', label: 'Alimentation' },
    { value: 'entertainment', label: 'Divertissement' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'travel', label: 'Voyage' },
    { value: 'gifts', label: 'Cadeaux' },
    { value: 'personal', label: 'Personnel' },
    { value: 'other', label: 'Autre' }
  ];

  const emotionalContextOptions = [
    { value: 'happy', label: 'Heureux' },
    { value: 'stressed', label: 'Stressé' },
    { value: 'excited', label: 'Excité' },
    { value: 'sad', label: 'Triste' },
    { value: 'anxious', label: 'Anxieux' },
    { value: 'celebratory', label: 'Festif' },
    { value: 'bored', label: 'Ennuyé' },
    { value: 'neutral', label: 'Neutre' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' },
    { value: 'occasional', label: 'Occasionnel' }
  ];

  const onSubmit = (data) => {
    const newExpense = {
      id: editingId || Date.now(),
      ...data,
      amount: parseFloat(data.amount),
      moodRating: parseInt(data.moodRating),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      onUpdateVariableExpenses(variableExpensesData.map(item => 
        item.id === editingId ? newExpense : item
      ));
      setEditingId(null);
    } else {
      onUpdateVariableExpenses([...variableExpensesData, newExpense]);
      setShowAddForm(false);
    }
    
    reset();
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setShowAddForm(true);
    reset(expense);
  };

  const handleDelete = (id) => {
    onUpdateVariableExpenses(variableExpensesData.filter(item => item.id !== id));
  };

  const calculateMonthlyEstimate = (amount, frequency) => {
    const multipliers = {
      daily: 30,
      weekly: 4.33,
      monthly: 1,
      occasional: 0.5
    };
    return amount * (multipliers[frequency] || 1);
  };

  const totalMonthlyEstimate = variableExpensesData.reduce((total, expense) => 
    total + calculateMonthlyEstimate(expense.amount, expense.frequency), 0
  );

  const getCategoryIcon = (category) => {
    const icons = {
      food: 'UtensilsCrossed',
      entertainment: 'Music',
      shopping: 'ShoppingBag',
      health: 'Heart',
      education: 'BookOpen',
      travel: 'Plane',
      gifts: 'Gift',
      personal: 'User',
      other: 'MoreHorizontal'
    };
    return icons[category] || 'DollarSign';
  };

  const getEmotionalColor = (context) => {
    const colors = {
      happy: 'text-success',
      stressed: 'text-error',
      excited: 'text-accent',
      sad: 'text-primary',
      anxious: 'text-warning',
      celebratory: 'text-secondary',
      bored: 'text-text-secondary',
      neutral: 'text-text-secondary'
    };
    return colors[context] || 'text-text-secondary';
  };

  const moodRating = watch('moodRating', 5);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Dépenses variables estimées
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} color="var(--color-warning)" />
            <span className="text-2xl font-bold text-warning">
              {totalMonthlyEstimate.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          Estimation mensuelle • {variableExpensesData.length} dépense{variableExpensesData.length !== 1 ? 's' : ''} variable{variableExpensesData.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        {variableExpensesData.map((expense) => (
          <div key={expense.id} className="glass rounded-xl p-4 border border-border/20 hover:glass-hover transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getCategoryIcon(expense.category)} 
                      size={20} 
                      color="var(--color-warning)" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground">
                      {expense.name}
                    </h4>
                    <p className="text-sm text-text-secondary capitalize">
                      {categoryOptions.find(opt => opt.value === expense.category)?.label}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm mb-2">
                  <span className="font-medium text-foreground">
                    {expense.amount.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                  <span className="text-text-secondary">
                    {frequencyOptions.find(opt => opt.value === expense.frequency)?.label}
                  </span>
                  <span className="text-warning font-medium">
                    ≈ {calculateMonthlyEstimate(expense.amount, expense.frequency).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}/mois
                  </span>
                </div>

                {/* Emotional Context */}
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} color="var(--color-text-secondary)" />
                    <span className={`capitalize ${getEmotionalColor(expense.emotionalContext)}`}>
                      {emotionalContextOptions.find(opt => opt.value === expense.emotionalContext)?.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Smile" size={14} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">
                      Humeur: {expense.moodRating}/10
                    </span>
                  </div>
                </div>

                {expense.description && (
                  <p className="text-xs text-text-secondary mt-2">
                    {expense.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(expense)}
                >
                  <Icon name="Edit2" size={16} color="var(--color-text-secondary)" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(expense.id)}
                >
                  <Icon name="Trash2" size={16} color="var(--color-error)" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="glass rounded-xl p-6 border border-border/20 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {editingId ? 'Modifier la dépense variable' : 'Ajouter une dépense variable'}
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
                label="Nom de la dépense"
                type="text"
                placeholder="Ex: Restaurant, Cinéma, Vêtements..."
                {...register('name', { required: 'Ce champ est requis' })}
                error={errors.name?.message}
                required
              />

              <Select
                label="Catégorie"
                options={categoryOptions}
                {...register('category', { required: 'Sélectionnez une catégorie' })}
                error={errors.category?.message}
                required
              />

              <Input
                label="Montant moyen"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('amount', { 
                  required: 'Ce champ est requis',
                  min: { value: 0, message: 'Le montant doit être positif' }
                })}
                error={errors.amount?.message}
                required
              />

              <Select
                label="Fréquence"
                options={frequencyOptions}
                {...register('frequency', { required: 'Sélectionnez une fréquence' })}
                error={errors.frequency?.message}
                required
              />

              <Select
                label="Contexte émotionnel"
                options={emotionalContextOptions}
                {...register('emotionalContext', { required: 'Sélectionnez un contexte' })}
                error={errors.emotionalContext?.message}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Humeur lors de l'achat (1-10)
                </label>
                <div className="space-y-2">
                  <Input
                    type="range"
                    min="1"
                    max="10"
                    {...register('moodRating', { required: 'Ce champ est requis' })}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>Très mauvaise</span>
                    <span className="font-medium text-primary">{moodRating}/10</span>
                    <span>Excellente</span>
                  </div>
                </div>
              </div>
            </div>

            <Input
              label="Description (optionnel)"
              type="text"
              placeholder="Contexte, raison de l'achat..."
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
          className="w-full border-dashed border-2 border-warning/30 hover:border-warning/50 hover:bg-warning/5"
        >
          <Icon name="Plus" size={20} color="var(--color-warning)" />
          <span className="ml-2">Ajouter une dépense variable</span>
        </Button>
      )}
    </div>
  );
};

export default VariableExpensesTab;