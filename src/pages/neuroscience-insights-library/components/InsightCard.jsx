import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InsightCard = ({ 
  insight, 
  onBookmark, 
  onShare, 
  isBookmarked = false,
  isRecommended = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < insight.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Débutant': return 'text-success bg-success/10';
      case 'Intermédiaire': return 'text-warning bg-warning/10';
      case 'Avancé': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Déclencheurs Émotionnels': 'Heart',
      'Fatigue Décisionnelle': 'Brain',
      'Psychologie des Récompenses': 'Trophy',
      'Biais Cognitifs': 'Eye',
      'Habitudes Financières': 'Repeat',
      'Stress et Argent': 'Zap'
    };
    return icons[category] || 'BookOpen';
  };

  return (
    <div className={`
      glass rounded-xl border border-border/20 overflow-hidden
      transition-all duration-300 hover:glass-hover
      ${isRecommended ? 'ring-2 ring-primary/20' : ''}
      ${isExpanded ? 'col-span-full' : ''}
    `}>
      {/* Card Header */}
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            src={insight.image}
            alt={insight.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${getDifficultyColor(insight.difficulty)}
          `}>
            {insight.difficulty}
          </span>
          {isRecommended && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
              Recommandé
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(insight.id)}
            className="w-8 h-8 glass hover:glass-hover"
          >
            <Icon 
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={16} 
              color={isBookmarked ? "var(--color-accent)" : "var(--color-text-secondary)"}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(insight)}
            className="w-8 h-8 glass hover:glass-hover"
          >
            <Icon name="Share2" size={16} color="var(--color-text-secondary)" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category and reading time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getCategoryIcon(insight.category)} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="text-sm font-medium text-primary">
              {insight.category}
            </span>
          </div>
          <span className="text-xs text-text-secondary">
            {insight.readingTime} min
          </span>
        </div>

        {/* Title and description */}
        <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
          {insight.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {insight.description}
        </p>

        {/* Credibility badges */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} color="var(--color-success)" />
            <span className="text-xs text-success font-medium">
              Vérifié
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">
              {insight.publicationDate}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} color="var(--color-text-secondary)" />
            <span className="text-xs text-text-secondary">
              {insight.citations} citations
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        {insight.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-secondary">Progression</span>
              <span className="text-xs font-medium text-primary">
                {insight.progress}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${insight.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Expand button */}
        <Button
          variant="outline"
          onClick={handleExpand}
          className="w-full"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Réduire' : 'En savoir plus'}
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border/20 p-4 space-y-6">
          {/* Detailed explanation */}
          <div>
            <h4 className="font-heading font-semibold text-base text-foreground mb-3">
              Explication détaillée
            </h4>
            <div className="prose prose-sm max-w-none text-text-primary">
              {insight.detailedExplanation.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Practical applications */}
          <div>
            <h4 className="font-heading font-semibold text-base text-foreground mb-3">
              Applications pratiques
            </h4>
            <div className="space-y-3">
              {insight.practicalApplications.map((application, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 glass rounded-lg">
                  <Icon name="CheckCircle2" size={16} color="var(--color-success)" className="mt-0.5" />
                  <span className="text-sm text-text-primary leading-relaxed">
                    {application}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal relevance */}
          {insight.personalRelevance && (
            <div className="glass rounded-lg p-4 border border-primary/20">
              <div className="flex items-start space-x-3">
                <Icon name="User" size={20} color="var(--color-primary)" />
                <div>
                  <h4 className="font-heading font-semibold text-base text-primary mb-2">
                    Pertinence personnelle
                  </h4>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {insight.personalRelevance}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mini quiz */}
          {insight.quiz && insight.quiz.length > 0 && (
            <div>
              <h4 className="font-heading font-semibold text-base text-foreground mb-3">
                Quiz de réflexion
              </h4>
              <div className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-text-secondary">
                    Question {currentQuestionIndex + 1} sur {insight.quiz.length}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="w-8 h-8"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === insight.quiz.length - 1}
                      className="w-8 h-8"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {insight.quiz[currentQuestionIndex].question}
                  </p>
                  <div className="space-y-2">
                    {insight.quiz[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 rounded-lg border border-border/20 hover:bg-primary/5 transition-colors duration-200"
                      >
                        <span className="text-sm text-text-primary">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sources */}
          <div>
            <h4 className="font-heading font-semibold text-base text-foreground mb-3">
              Sources scientifiques
            </h4>
            <div className="space-y-2">
              {insight.sources.map((source, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 glass rounded-lg">
                  <Icon name="ExternalLink" size={14} color="var(--color-text-secondary)" className="mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {source.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {source.authors} • {source.journal} • {source.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightCard;