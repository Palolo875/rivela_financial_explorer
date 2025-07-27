import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncomeSourcesTab = ({ incomeData, onUpdateIncome }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const frequencyOptions = [
    { value: 'monthly', label: 'Mensuel' },
    { value: 'annual', label: 'Annuel' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'biweekly', label: 'Bi-hebdomadaire' }
  ];

  const incomeTypeOptions = [
    { value: 'salary', label: 'Salaire' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'investment', label: 'Investissements' },
    { value: 'rental', label: 'Revenus locatifs' },
    { value: 'business', label: 'Entreprise' },
    { value: 'other', label: 'Autre' }
  ];

  const onSubmit = (data) => {
    const newIncome = {
      id: editingId || Date.now(),
      ...data,
      amount: parseFloat(data.amount),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      onUpdateIncome(incomeData.map(item => 
        item.id === editingId ? newIncome : item
      ));
      setEditingId(null);
    } else {
      onUpdateIncome([...incomeData, newIncome]);
      setShowAddForm(false);
    }
    
    reset();
  };

  const handleEdit = (income) => {
    setEditingId(income.id);
    setShowAddForm(true);
    reset(income);
  };

  const handleDelete = (id) => {
    onUpdateIncome(incomeData.filter(item => item.id !== id));
  };

  const calculateMonthlyAmount = (amount, frequency) => {
    const multipliers = {
      monthly: 1,
      annual: 1/12,
      weekly: 4.33,
      biweekly: 2.17
    };
    return amount * (multipliers[frequency] || 1);
  };

  const totalMonthlyIncome = incomeData.reduce((total, income) => 
    total + calculateMonthlyAmount(income.amount, income.frequency), 0
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Résumé des revenus
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            <span className="text-2xl font-bold text-success">
              {totalMonthlyIncome.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          Revenus mensuels totaux • {incomeData.length} source{incomeData.length !== 1 ? 's' : ''} de revenus
        </p>
      </div>

      {/* Income Sources List */}
      <div className="space-y-4">
        {incomeData.map((income) => (
          <div key={income.id} className="glass rounded-xl p-4 border border-border/20 hover:glass-hover transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={income.type === 'salary' ? 'Briefcase' : 
                            income.type === 'freelance' ? 'Users' :
                            income.type === 'investment' ? 'TrendingUp' :
                            income.type === 'rental' ? 'Home' :
                            income.type === 'business' ? 'Building' : 'DollarSign'} 
                      size={20} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-foreground">
                      {income.source}
                    </h4>
                    <p className="text-sm text-text-secondary capitalize">
                      {incomeTypeOptions.find(opt => opt.value === income.type)?.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium text-foreground">
                    {income.amount.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                  <span className="text-text-secondary">
                    {frequencyOptions.find(opt => opt.value === income.frequency)?.label}
                  </span>
                  <span className="text-primary font-medium">
                    ≈ {calculateMonthlyAmount(income.amount, income.frequency).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}/mois
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(income)}
                >
                  <Icon name="Edit2" size={16} color="var(--color-text-secondary)" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(income.id)}
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
              {editingId ? 'Modifier la source de revenus' : 'Ajouter une source de revenus'}
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
                label="Nom de la source"
                type="text"
                placeholder="Ex: Salaire principal, Freelance design..."
                {...register('source', { required: 'Ce champ est requis' })}
                error={errors.source?.message}
                required
              />

              <Select
                label="Type de revenus"
                options={incomeTypeOptions}
                {...register('type', { required: 'Sélectionnez un type' })}
                error={errors.type?.message}
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
          <span className="ml-2">Ajouter une source de revenus</span>
        </Button>
      )}
    </div>
  );
};

export default IncomeSourcesTab;