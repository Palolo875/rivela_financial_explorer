import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DebtsTab = ({ debtsData, onUpdateDebts }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const debtTypeOptions = [
    { value: 'credit_card', label: 'Carte de crédit' },
    { value: 'personal_loan', label: 'Prêt personnel' },
    { value: 'mortgage', label: 'Prêt immobilier' },
    { value: 'auto_loan', label: 'Prêt auto' },
    { value: 'student_loan', label: 'Prêt étudiant' },
    { value: 'line_of_credit', label: 'Ligne de crédit' },
    { value: 'other', label: 'Autre' }
  ];

  const onSubmit = (data) => {
    const newDebt = {
      id: editingId || Date.now(),
      ...data,
      balance: parseFloat(data.balance),
      interestRate: parseFloat(data.interestRate),
      minimumPayment: parseFloat(data.minimumPayment),
      createdAt: new Date().toISOString()
    };

    if (editingId) {
      onUpdateDebts(debtsData.map(item => 
        item.id === editingId ? newDebt : item
      ));
      setEditingId(null);
    } else {
      onUpdateDebts([...debtsData, newDebt]);
      setShowAddForm(false);
    }
    
    reset();
  };

  const handleEdit = (debt) => {
    setEditingId(debt.id);
    setShowAddForm(true);
    reset(debt);
  };

  const handleDelete = (id) => {
    onUpdateDebts(debtsData.filter(item => item.id !== id));
  };

  const calculatePayoffTime = (balance, minimumPayment, interestRate) => {
    if (!balance || !minimumPayment || !interestRate) return null;
    
    const monthlyRate = interestRate / 100 / 12;
    const months = Math.log(1 + (balance * monthlyRate) / minimumPayment) / Math.log(1 + monthlyRate);
    
    if (isNaN(months) || months <= 0) return null;
    
    const years = Math.floor(months / 12);
    const remainingMonths = Math.ceil(months % 12);
    
    return { years, months: remainingMonths, totalMonths: Math.ceil(months) };
  };

  const totalDebt = debtsData.reduce((total, debt) => total + debt.balance, 0);
  const totalMinimumPayments = debtsData.reduce((total, debt) => total + debt.minimumPayment, 0);

  const getDebtIcon = (type) => {
    const icons = {
      credit_card: 'CreditCard',
      personal_loan: 'DollarSign',
      mortgage: 'Home',
      auto_loan: 'Car',
      student_loan: 'GraduationCap',
      line_of_credit: 'TrendingUp',
      other: 'MoreHorizontal'
    };
    return icons[type] || 'DollarSign';
  };

  const getDebtPriorityColor = (interestRate) => {
    if (interestRate >= 15) return 'text-error';
    if (interestRate >= 8) return 'text-warning';
    return 'text-success';
  };

  const balance = watch('balance', 0);
  const minimumPayment = watch('minimumPayment', 0);
  const interestRate = watch('interestRate', 0);

  const payoffCalculation = calculatePayoffTime(
    parseFloat(balance) || 0,
    parseFloat(minimumPayment) || 0,
    parseFloat(interestRate) || 0
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Total des dettes
              </h3>
            </div>
            <span className="text-2xl font-bold text-error">
              {totalDebt.toLocaleString('fr-FR', { 
                style: 'currency', 
                currency: 'EUR' 
              })}
            </span>
            <p className="text-sm text-text-secondary mt-1">
              {debtsData.length} dette{debtsData.length !== 1 ? 's' : ''} active{debtsData.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={20} color="var(--color-warning)" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Paiements minimums
              </h3>
            </div>
            <span className="text-2xl font-bold text-warning">
              {totalMinimumPayments.toLocaleString('fr-FR', { 
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

      {/* Debts List */}
      <div className="space-y-4">
        {debtsData.map((debt) => {
          const payoffTime = calculatePayoffTime(debt.balance, debt.minimumPayment, debt.interestRate);
          
          return (
            <div key={debt.id} className="glass rounded-xl p-4 border border-border/20 hover:glass-hover transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={getDebtIcon(debt.type)} 
                        size={20} 
                        color="var(--color-error)" 
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-medium text-foreground">
                        {debt.name}
                      </h4>
                      <p className="text-sm text-text-secondary capitalize">
                        {debtTypeOptions.find(opt => opt.value === debt.type)?.label}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary block">Solde</span>
                      <span className="font-medium text-error">
                        {debt.balance.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        })}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary block">Taux d'intérêt</span>
                      <span className={`font-medium ${getDebtPriorityColor(debt.interestRate)}`}>
                        {debt.interestRate}%
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary block">Paiement minimum</span>
                      <span className="font-medium text-foreground">
                        {debt.minimumPayment.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        })}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-text-secondary block">Remboursement</span>
                      {payoffTime ? (
                        <span className="font-medium text-foreground">
                          {payoffTime.years > 0 && `${payoffTime.years}a `}
                          {payoffTime.months}m
                        </span>
                      ) : (
                        <span className="text-text-secondary">N/A</span>
                      )}
                    </div>
                  </div>

                  {debt.description && (
                    <p className="text-xs text-text-secondary mt-2">
                      {debt.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(debt)}
                  >
                    <Icon name="Edit2" size={16} color="var(--color-text-secondary)" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(debt.id)}
                  >
                    <Icon name="Trash2" size={16} color="var(--color-error)" />
                  </Button>
                </div>
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
              {editingId ? 'Modifier la dette' : 'Ajouter une dette'}
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
                label="Nom de la dette"
                type="text"
                placeholder="Ex: Carte Visa, Prêt auto..."
                {...register('name', { required: 'Ce champ est requis' })}
                error={errors.name?.message}
                required
              />

              <Select
                label="Type de dette"
                options={debtTypeOptions}
                {...register('type', { required: 'Sélectionnez un type' })}
                error={errors.type?.message}
                required
              />

              <Input
                label="Solde actuel"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('balance', { 
                  required: 'Ce champ est requis',
                  min: { value: 0, message: 'Le solde doit être positif' }
                })}
                error={errors.balance?.message}
                required
              />

              <Input
                label="Taux d'intérêt annuel (%)"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                max="100"
                {...register('interestRate', { 
                  required: 'Ce champ est requis',
                  min: { value: 0, message: 'Le taux doit être positif' },
                  max: { value: 100, message: 'Le taux ne peut pas dépasser 100%' }
                })}
                error={errors.interestRate?.message}
                required
              />

              <Input
                label="Paiement minimum mensuel"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                {...register('minimumPayment', { 
                  required: 'Ce champ est requis',
                  min: { value: 0, message: 'Le paiement doit être positif' }
                })}
                error={errors.minimumPayment?.message}
                required
              />

              {/* Payoff Calculator Preview */}
              {payoffCalculation && (
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Calculator" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">
                      Temps de remboursement estimé
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {payoffCalculation.years > 0 && `${payoffCalculation.years} an${payoffCalculation.years > 1 ? 's' : ''} `}
                    {payoffCalculation.months} mois
                  </div>
                  <div className="text-xs text-text-secondary">
                    Avec paiements minimums uniquement
                  </div>
                </div>
              )}
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
          className="w-full border-dashed border-2 border-error/30 hover:border-error/50 hover:bg-error/5"
        >
          <Icon name="Plus" size={20} color="var(--color-error)" />
          <span className="ml-2">Ajouter une dette</span>
        </Button>
      )}
    </div>
  );
};

export default DebtsTab;