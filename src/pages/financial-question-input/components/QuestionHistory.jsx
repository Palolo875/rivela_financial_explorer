import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionHistory = ({ 
  questions, 
  onQuestionSelect, 
  onDeleteQuestion, 
  className = "" 
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); // recent, mood, category

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Il y a quelques minutes';
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)} heure${Math.floor(diffInHours) > 1 ? 's' : ''}`;
    } else if (diffInHours < 168) {
      return `Il y a ${Math.floor(diffInHours / 24)} jour${Math.floor(diffInHours / 24) > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };

  const getMoodEmoji = (mood) => {
    const moodMap = {
      1: '😰', 2: '😟', 3: '😕', 4: '😐', 5: '😑',
      6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩'
    };
    return moodMap[mood] || '😑';
  };

  const getMoodColor = (mood) => {
    if (mood <= 3) return 'text-red-500';
    if (mood <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSortedQuestions = () => {
    const sorted = [...questions];
    switch (sortBy) {
      case 'mood':
        return sorted.sort((a, b) => a.mood - b.mood);
      case 'category':
        return sorted.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
      default:
        return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  };

  const toggleExpanded = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const handleReanalyze = (question) => {
    onQuestionSelect(question.text, question.mood, question.tags);
  };

  if (questions.length === 0) {
    return (
      <div className={`w-full max-w-4xl mx-auto ${className}`}>
        <div className="glass rounded-xl p-8 border border-border/20 text-center">
          <Icon name="MessageCircle" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold font-heading text-text-primary mb-2">
            Aucune question posée
          </h3>
          <p className="text-text-secondary">
            Vos questions précédentes apparaîtront ici pour un accès rapide et une réanalyse.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="History" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold font-heading text-text-primary">
              Historique des questions
            </h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {questions.length}
            </span>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-input border border-border/30 rounded-lg px-3 py-1 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="recent">Plus récent</option>
              <option value="mood">Humeur</option>
              <option value="category">Catégorie</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {getSortedQuestions().map((question) => {
          const isExpanded = expandedQuestion === question.id;
          
          return (
            <div
              key={question.id}
              className="glass rounded-xl border border-border/20 overflow-hidden
                       hover:shadow-glass-hover transition-all duration-300"
            >
              {/* Question Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{getMoodEmoji(question.mood)}</div>
                    <div className="flex-1">
                      <div className="text-sm text-text-secondary mb-1">
                        {formatDate(question.timestamp)}
                      </div>
                      <div className={`text-xs font-medium ${getMoodColor(question.mood)}`}>
                        Humeur: {question.mood}/10
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpanded(question.id)}
                      className="w-8 h-8"
                    >
                      <Icon 
                        name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteQuestion(question.id)}
                      className="w-8 h-8 text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="mb-3">
                  <p className="text-text-primary leading-relaxed">
                    {question.text}
                  </p>
                </div>

                {/* Tags Preview */}
                {question.tags && question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {question.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs font-medium rounded-md">
                        +{question.tags.length - 3} autres
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReanalyze(question)}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Réanalyser
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onQuestionSelect(question.text)}
                    iconName="Copy"
                    iconPosition="left"
                  >
                    Réutiliser
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border/20 p-4 bg-muted/20">
                  {/* Full Tags List */}
                  {question.tags && question.tags.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        Tags contextuels:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insight Preview */}
                  {question.insight && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        Aperçu de l'analyse:
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {question.insight}
                      </p>
                    </div>
                  )}

                  {/* Analysis Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-input rounded-lg">
                      <div className="text-lg font-semibold text-primary">
                        {question.analysisCount || 1}
                      </div>
                      <div className="text-xs text-text-secondary">Analyses</div>
                    </div>
                    <div className="p-3 bg-input rounded-lg">
                      <div className="text-lg font-semibold text-secondary">
                        {question.tags?.length || 0}
                      </div>
                      <div className="text-xs text-text-secondary">Tags</div>
                    </div>
                    <div className="p-3 bg-input rounded-lg">
                      <div className={`text-lg font-semibold ${getMoodColor(question.mood)}`}>
                        {question.mood}/10
                      </div>
                      <div className="text-xs text-text-secondary">Humeur</div>
                    </div>
                    <div className="p-3 bg-input rounded-lg">
                      <div className="text-lg font-semibold text-accent">
                        {question.category || 'Général'}
                      </div>
                      <div className="text-xs text-text-secondary">Catégorie</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionHistory;