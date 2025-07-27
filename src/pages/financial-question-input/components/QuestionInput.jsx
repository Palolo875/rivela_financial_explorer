import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionInput = ({ 
  question, 
  onQuestionChange, 
  onSubmit, 
  isAnalyzing, 
  characterLimit = 500 
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const count = question.length;
    setCharacterCount(count);
    setIsValid(count >= 10 && count <= characterLimit);
  }, [question, characterLimit]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= characterLimit) {
      onQuestionChange(value);
    }
  };

  const handleSubmit = () => {
    if (isValid && !isAnalyzing) {
      onSubmit();
    }
  };

  const getCharacterCountColor = () => {
    const percentage = (characterCount / characterLimit) * 100;
    if (percentage < 50) return 'text-text-secondary';
    if (percentage < 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Input Area */}
      <div className="relative glass rounded-2xl p-6 border border-border/20 shadow-glass">
        <div className="mb-4">
          <label className="block text-sm font-medium font-heading text-text-primary mb-2">
            Posez votre question financière
          </label>
          <p className="text-xs text-text-secondary leading-relaxed">
            Décrivez votre situation ou préoccupation financière. Plus vous êtes précis, plus l'analyse sera pertinente.
          </p>
        </div>

        <div className="relative">
          <textarea
            value={question}
            onChange={handleInputChange}
            placeholder="Exemple : Pourquoi est-ce que je dépense plus le week-end ? Comment puis-je économiser pour mes vacances d'été ?"
            className="w-full h-32 p-4 bg-input border border-border/30 rounded-xl resize-none
                     text-text-primary placeholder-text-secondary/60 font-body text-base
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40
                     transition-all duration-300 ease-out"
            style={{ minHeight: '128px' }}
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span className={`text-xs font-medium ${getCharacterCountColor()}`}>
              {characterCount}/{characterLimit}
            </span>
            {characterCount >= characterLimit && (
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            )}
          </div>
        </div>

        {/* Validation Message */}
        {question.length > 0 && question.length < 10 && (
          <div className="mt-2 flex items-center space-x-2 text-warning">
            <Icon name="AlertTriangle" size={14} />
            <span className="text-xs">Votre question doit contenir au moins 10 caractères</span>
          </div>
        )}

        {/* Desktop Submit Button */}
        <div className="hidden md:flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isAnalyzing}
            loading={isAnalyzing}
            iconName="Search"
            iconPosition="left"
            className="px-6"
          >
            {isAnalyzing ? 'Analyse en cours...' : 'Analyser ma question'}
          </Button>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isAnalyzing}
          loading={isAnalyzing}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg glass-hover"
          iconName="Search"
        >
          <span className="sr-only">Analyser ma question</span>
        </Button>
      </div>
    </div>
  );
};

export default QuestionInput;