import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ 
  onSearch, 
  onFilter, 
  searchQuery = '', 
  activeFilters = {},
  totalResults = 0 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'Déclencheurs Émotionnels', label: 'Déclencheurs Émotionnels' },
    { value: 'Fatigue Décisionnelle', label: 'Fatigue Décisionnelle' },
    { value: 'Psychologie des Récompenses', label: 'Psychologie des Récompenses' },
    { value: 'Biais Cognitifs', label: 'Biais Cognitifs' },
    { value: 'Habitudes Financières', label: 'Habitudes Financières' },
    { value: 'Stress et Argent', label: 'Stress et Argent' }
  ];

  const difficultyOptions = [
    { value: '', label: 'Tous les niveaux' },
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'newest', label: 'Plus récent' },
    { value: 'oldest', label: 'Plus ancien' },
    { value: 'popular', label: 'Populaire' },
    { value: 'reading-time', label: 'Temps de lecture' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      sort: 'relevance',
      bookmarked: false,
      completed: false
    };
    onFilter(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value !== '' && value !== false && value !== 'relevance'
    ).length;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Rechercher des insights neuroscientifiques..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
          <Icon 
            name="Search" 
            size={20} 
            color="var(--color-text-secondary)"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          {localSearchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setLocalSearchQuery('');
                onSearch('');
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </form>

      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            Filtres
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              className="text-text-secondary"
            >
              Effacer
            </Button>
          )}
        </div>

        <div className="text-sm text-text-secondary">
          {totalResults} insight{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="glass rounded-xl p-4 border border-border/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <Select
              label="Catégorie"
              options={categoryOptions}
              value={activeFilters.category || ''}
              onChange={(value) => handleFilterChange('category', value)}
            />

            {/* Difficulty Filter */}
            <Select
              label="Niveau"
              options={difficultyOptions}
              value={activeFilters.difficulty || ''}
              onChange={(value) => handleFilterChange('difficulty', value)}
            />

            {/* Sort Filter */}
            <Select
              label="Trier par"
              options={sortOptions}
              value={activeFilters.sort || 'relevance'}
              onChange={(value) => handleFilterChange('sort', value)}
            />

            {/* Quick Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Filtres rapides
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.bookmarked || false}
                    onChange={(e) => handleFilterChange('bookmarked', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">Favoris</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.completed || false}
                    onChange={(e) => handleFilterChange('completed', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">Complétés</span>
                </label>
              </div>
            </div>
          </div>

          {/* Popular Search Tags */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Recherches populaires
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Dépenses impulsives',
                'Stress financier',
                'Habitudes d\'épargne',
                'Biais de confirmation',
                'Récompenses immédiates',
                'Fatigue décisionnelle'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setLocalSearchQuery(tag);
                    onSearch(tag);
                  }}
                  className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;