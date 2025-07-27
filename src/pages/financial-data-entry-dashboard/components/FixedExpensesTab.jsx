import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FixedExpensesTab = ({ expensesData, onUpdateExpenses }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const categoryOptions = [
    { value: 'housing', label: 'Logement' },
    { value: 'utilities', label: 'Services publics' },
    { value: 'insurance', label: 'Assurances' },
    { value: 'subscriptions', label: 'Abonnements' },
    { value: 'transport', label: 'Transport' },
    { value: 'phone', label: 'Téléphone/Internet' },
    { value: 'loan', label: 'Prêts' },
    { value: 'other', label: 'Autre' }
  ];

  const frequencyOptions = [
    { value: 'monthly', label: 'Mensuel' },
    { value: 'quarterly', label: 'Trimestriel' },
    { value: 'annual', label: 'Annuel' },
    { value: 'weekly', label: 'Hebdomadaire' }
  ];

  const onSubmit = (data) => {
    const newExpense = {
      id: editingId || Date.now(),
      ...data,
      amount: parseFloat(data.amount),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      onUpdateExpenses(expensesData.map(item => 
        item.id === editingId ? newExpense : item
      ));
      setEditingId(null);
    } else {
      onUpdateExpenses([...expensesData, newExpense]);
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
    onUpdateExpenses(expensesData.filter(item => item.id !== id));
  };

  const calculateMonthlyAmount = (amount, frequency) => {
    const multipliers = {
      monthly: 1,
      quarterly: 1/3,
      annual: 1/12,
      weekly: 4.33
    };
    return amount * (multipliers[frequency] || 1);
  };

  const totalMonthlyExpenses = expensesData.reduce((total, expense) => 
    total + calculateMonthlyAmount(expense.amount, expense.frequency), 0
  );

  const getCategoryIcon = (category) => {
    const icons = {
      housing: 'Home',
      utilities: 'Zap',
      insurance: 'Shield',
      subscriptions: 'Repeat',
      transport: 'Car',
      phone: 'Smartphone',
      loan: 'CreditCard',
      other: 'MoreHorizontal'
    };
    return icons[category] || 'DollarSign';
  };

  const expensesByCategory = expensesData.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Dépenses fixes mensuelles
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingDown" size={20} color="var(--color-error)" />
            <span className="text-2xl font-bold text-error">
              {totalMonthlyExpenses.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          Total des dépenses fixes • {expensesData.length} dépense{expensesData.length !== 1 ? 's' : ''} enregistrée{expensesData.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Expenses by Category */}
      <div className="space-y-4">
        {Object.entries(expensesByCategory).map(([category, expenses]) => {
          const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label || category;
          const categoryTotal = expenses.reduce((sum, expense) => 
            sum + calculateMonthlyAmount(expense.amount, expense.frequency), 0
          );

          return (
            <div key={category} className="glass rounded-xl p-4 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getCategoryIcon(category)} 
                      size={20} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground">
                      {categoryLabel}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {expenses.length} dépense{expenses.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-foreground">
                  {categoryTotal.toLocaleString('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  })}/mois
                </span>
              </div>

              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          {expense.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-text-secondary">
                            {expense.amount.toLocaleString('fr-FR', { 
                              style: 'currency', 
                              currency: 'EUR' 
                            })} • {frequencyOptions.find(opt => opt.value === expense.frequency)?.label}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(expense)}
                            className="w-8 h-8"
                          >
                            <Icon name="Edit2" size={14} color="var(--color-text-secondary)" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(expense.id)}
                            className="w-8 h-8"
                          >
                            <Icon name="Trash2" size={14} color="var(--color-error)" />
                          </Button>
                        </div>
                      </div>
                      {expense.description && (
                        <p className="text-xs text-text-secondary mt-1">
                          {expense.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="glass rounded-xl p-6 border border-border/20 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {editingId ? 'Modifier la dépense fixe' : 'Ajouter une dépense fixe'}
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
                placeholder="Ex: Loyer, Électricité, Netflix..."
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
                label="Montant"
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
            </div>

            <Input
              label="Description (optionnel)"
              type="text"
              placeholder="Détails supplémentaires..."
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
          <span className="ml-2">Ajouter une dépense fixe</span>
        </Button>
      )}
    </div>
  );
};

export default FixedExpensesTab;