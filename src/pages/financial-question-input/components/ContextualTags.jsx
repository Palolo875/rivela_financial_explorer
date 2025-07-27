import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContextualTags = ({ selectedTags, onTagsChange, className = "" }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const tagCategories = [
    {
      id: 'emotions',
      name: 'Émotions',
      icon: 'Heart',
      color: 'bg-red-500/10 text-red-600 border-red-500/20'
    },
    {
      id: 'situations',
      name: 'Situations',
      icon: 'MapPin',
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    },
    {
      id: 'goals',
      name: 'Objectifs',
      icon: 'Target',
      color: 'bg-green-500/10 text-green-600 border-green-500/20'
    },
    {
      id: 'concerns',
      name: 'Préoccupations',
      icon: 'AlertTriangle',
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    }
  ];

  const availableTags = [
    // Emotions
    { id: 'stressed', label: 'Stressé(e)', category: 'emotions', icon: 'Frown' },
    { id: 'anxious', label: 'Anxieux/se', category: 'emotions', icon: 'AlertCircle' },
    { id: 'hopeful', label: 'Plein(e) d\'espoir', category: 'emotions', icon: 'Smile' },
    { id: 'frustrated', label: 'Frustré(e)', category: 'emotions', icon: 'X' },
    { id: 'motivated', label: 'Motivé(e)', category: 'emotions', icon: 'Zap' },
    { id: 'overwhelmed', label: 'Débordé(e)', category: 'emotions', icon: 'Cloud' },
    
    // Situations
    { id: 'new_job', label: 'Nouveau travail', category: 'situations', icon: 'Briefcase' },
    { id: 'relationship_change', label: 'Changement relationnel', category: 'situations', icon: 'Users' },
    { id: 'moving', label: 'Déménagement', category: 'situations', icon: 'Home' },
    { id: 'health_issues', label: 'Problèmes de santé', category: 'situations', icon: 'Heart' },
    { id: 'family_event', label: 'Événement familial', category: 'situations', icon: 'Baby' },
    { id: 'economic_uncertainty', label: 'Incertitude économique', category: 'situations', icon: 'TrendingDown' },
    
    // Goals
    { id: 'save_vacation', label: 'Épargner pour vacances', category: 'goals', icon: 'Plane' },
    { id: 'buy_house', label: 'Acheter une maison', category: 'goals', icon: 'Home' },
    { id: 'emergency_fund', label: 'Fonds d\'urgence', category: 'goals', icon: 'Shield' },
    { id: 'retirement', label: 'Retraite', category: 'goals', icon: 'Clock' },
    { id: 'education', label: 'Formation/Études', category: 'goals', icon: 'GraduationCap' },
    { id: 'debt_free', label: 'Liberté financière', category: 'goals', icon: 'Unlock' },
    
    // Concerns
    { id: 'overspending', label: 'Dépenses excessives', category: 'concerns', icon: 'CreditCard' },
    { id: 'debt_burden', label: 'Endettement', category: 'concerns', icon: 'Minus' },
    { id: 'income_instability', label: 'Revenus instables', category: 'concerns', icon: 'BarChart' },
    { id: 'inflation', label: 'Inflation', category: 'concerns', icon: 'TrendingUp' },
    { id: 'job_security', label: 'Sécurité d\'emploi', category: 'concerns', icon: 'Lock' },
    { id: 'unexpected_expenses', label: 'Dépenses imprévues', category: 'concerns', icon: 'AlertTriangle' }
  ];

  const getFilteredTags = () => {
    if (activeCategory === 'all') return availableTags;
    return availableTags.filter(tag => tag.category === activeCategory);
  };

  const handleTagToggle = (tagId) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  const getCategoryColor = (categoryId) => {
    const category = tagCategories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-muted text-text-secondary border-border';
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Tag" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold font-heading text-text-primary">
              Contexte émotionnel
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Sélectionnez les tags qui décrivent votre situation actuelle pour une analyse plus précise.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${activeCategory === 'all' ?'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10'}`}
          >
            Tous
          </button>
          {tagCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-200 border
                        ${activeCategory === category.id 
                          ? category.color 
                          : 'bg-muted text-text-secondary border-border hover:bg-primary/5'}`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {getFilteredTags().map((tag) => {
            const isSelected = selectedTags.includes(tag.id);
            const categoryColor = getCategoryColor(tag.category);
            
            return (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium
                          transition-all duration-200 border text-left
                          ${isSelected 
                            ? `${categoryColor} shadow-sm` 
                            : 'bg-muted/50 text-text-secondary border-border hover:bg-primary/5 hover:border-primary/20'}`}
              >
                <Icon 
                  name={tag.icon} 
                  size={16} 
                  color={isSelected ? 'currentColor' : 'var(--color-text-secondary)'}
                />
                <span className="flex-1">{tag.label}</span>
                {isSelected && (
                  <Icon name="Check" size={14} color="currentColor" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Tags Summary */}
        {selectedTags.length > 0 && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle2" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-primary">
                {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''} sélectionné{selectedTags.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagId) => {
                const tag = availableTags.find(t => t.id === tagId);
                if (!tag) return null;
                
                return (
                  <span
                    key={tagId}
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs
                              font-medium border ${getCategoryColor(tag.category)}`}
                  >
                    <Icon name={tag.icon} size={12} />
                    <span>{tag.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContextualTags;