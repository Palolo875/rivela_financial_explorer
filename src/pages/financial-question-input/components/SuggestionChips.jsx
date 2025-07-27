import React from 'react';
import Icon from '../../../components/AppIcon';

const SuggestionChips = ({ onSuggestionSelect, className = "" }) => {
  const suggestions = [
    {
      id: 1,
      text: "Pourquoi est-ce que je dépense plus le week-end ?",
      category: "Comportement",
      icon: "Calendar"
    },
    {
      id: 2,
      text: "Comment puis-je économiser pour mes vacances ?",
      category: "Objectifs",
      icon: "Target"
    },
    {
      id: 3,
      text: "Mes abonnements me coûtent-ils trop cher ?",
      category: "Dépenses",
      icon: "CreditCard"
    },
    {
      id: 4,
      text: "Comment optimiser mon budget alimentaire ?",
      category: "Budget",
      icon: "ShoppingCart"
    },
    {
      id: 5,
      text: "Dois-je rembourser mes dettes ou épargner ?",
      category: "Stratégie",
      icon: "Scale"
    },
    {
      id: 6,
      text: "Pourquoi n\'arrive-je pas à épargner ?",
      category: "Épargne",
      icon: "PiggyBank"
    },
    {
      id: 7,
      text: "Comment gérer mes achats impulsifs ?",
      category: "Comportement",
      icon: "Zap"
    },
    {
      id: 8,
      text: "Mon salaire suffit-il pour mes projets ?",
      category: "Planification",
      icon: "TrendingUp"
    }
  ];

  const categories = [
    { name: "Comportement", color: "bg-primary/10 text-primary border-primary/20" },
    { name: "Objectifs", color: "bg-secondary/10 text-secondary border-secondary/20" },
    { name: "Dépenses", color: "bg-warning/10 text-warning border-warning/20" },
    { name: "Budget", color: "bg-success/10 text-success border-success/20" },
    { name: "Stratégie", color: "bg-accent/10 text-accent border-accent/20" },
    { name: "Épargne", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
    { name: "Planification", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" }
  ];

  const getCategoryColor = (category) => {
    const categoryConfig = categories.find(cat => cat.name === category);
    return categoryConfig ? categoryConfig.color : "bg-muted text-text-secondary border-border";
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold font-heading text-text-primary mb-2">
          Questions populaires
        </h3>
        <p className="text-sm text-text-secondary">
          Cliquez sur une suggestion pour l'utiliser comme point de départ
        </p>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionSelect(suggestion.text)}
            className="group p-4 glass border border-border/20 rounded-xl text-left
                     hover:shadow-glass-hover hover:border-primary/30 
                     transition-all duration-300 ease-out"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Icon 
                  name={suggestion.icon} 
                  size={18} 
                  color="var(--color-primary)" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary group-hover:text-primary
                           transition-colors duration-200 leading-relaxed">
                  {suggestion.text}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                                  border ${getCategoryColor(suggestion.category)}`}>
                    {suggestion.category}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => onSuggestionSelect(suggestion.text)}
              className="flex-shrink-0 w-72 p-4 glass border border-border/20 rounded-xl text-left
                       hover:shadow-glass-hover hover:border-primary/30 
                       transition-all duration-300 ease-out"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon 
                    name={suggestion.icon} 
                    size={18} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary leading-relaxed">
                    {suggestion.text}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                                    border ${getCategoryColor(suggestion.category)}`}>
                      {suggestion.category}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionChips;