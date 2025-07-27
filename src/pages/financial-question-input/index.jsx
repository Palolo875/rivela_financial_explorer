import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import QuestionInput from './components/QuestionInput';
import SuggestionChips from './components/SuggestionChips';
import MoodSlider from './components/MoodSlider';
import ContextualTags from './components/ContextualTags';
import QuestionHistory from './components/QuestionHistory';
import { analyzeFinancialQuestion } from '../../services/aiService';

const FinancialQuestionInput = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentMood, setCurrentMood] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('rivela_question_history');
    if (savedHistory) {
      try {
        setQuestionHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading question history:', error);
      }
    }

    // Show welcome notification for first-time users
    const hasVisited = localStorage.getItem('rivela_has_visited');
    if (!hasVisited) {
      setNotifications([{
        id: 'welcome',
        type: 'insight',
        title: 'Bienvenue dans Rivela !',
        message: 'Commencez par poser une question sur votre situation financière. Plus vous êtes précis, plus l\'analyse sera pertinente.',
        persistent: true,
        action: {
          label: 'Commencer',
          handler: () => {
            localStorage.setItem('rivela_has_visited', 'true');
            setNotifications([]);
          }
        }
      }]);
    }
  }, []);

  // Save question history to localStorage
  const saveQuestionHistory = (history) => {
    localStorage.setItem('rivela_question_history', JSON.stringify(history));
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || currentQuestion.length < 10) {
      setNotifications([{
        id: 'validation_error',
        type: 'warning',
        title: 'Question trop courte',
        message: 'Votre question doit contenir au moins 10 caractères pour une analyse pertinente.'
      }]);
      return;
    }

    setIsAnalyzing(true);

    try {
      // Use real AI analysis instead of mock data
      const analysis = await analyzeFinancialQuestion(currentQuestion, currentMood, selectedTags);
      
      // Create new question entry with real AI insights
      const newQuestion = {
        id: Date.now(),
        text: currentQuestion,
        mood: currentMood,
        tags: selectedTags,
        timestamp: new Date().toISOString(),
        category: analysis.category,
        analysisCount: 1,
        insight: analysis.analysis,
        confidence: analysis.confidence,
        aiInsights: analysis.insights
      };

      // Add to history
      const updatedHistory = [newQuestion, ...questionHistory];
      setQuestionHistory(updatedHistory);
      saveQuestionHistory(updatedHistory);

      setIsAnalyzing(false);
      
      // Show success notification with real analysis
      setNotifications([{
        id: 'analysis_complete',
        type: 'success',
        title: 'Analyse IA terminée !',
        message: `Catégorie identifiée: ${analysis.category}. Confiance: ${Math.round(analysis.confidence * 100)}%`,
        details: analysis.analysis.substring(0, 150) + '...',
        action: {
          label: 'Continuer',
          handler: () => navigate('/financial-data-entry-dashboard')
        }
      }]);

      // Reset form
      setCurrentQuestion('');
      setCurrentMood(5);
      setSelectedTags([]);

    } catch (error) {
      setIsAnalyzing(false);
      setNotifications([{
        id: 'analysis_error',
        type: 'error',
        title: 'Erreur d\'analyse',
        message: error.message || 'Une erreur est survenue lors de l\'analyse. Veuillez réessayer.',
        action: {
          label: 'Réessayer',
          handler: () => handleQuestionSubmit()
        }
      }]);
    }
  };

  const handleSuggestionSelect = (suggestionText) => {
    setCurrentQuestion(suggestionText);
    
    // Auto-scroll to input on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.querySelector('textarea')?.focus();
      }, 100);
    }
  };

  const handleHistoryQuestionSelect = (questionText, mood = 5, tags = []) => {
    setCurrentQuestion(questionText);
    setCurrentMood(mood);
    setSelectedTags(tags);
    setShowHistory(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedHistory = questionHistory.filter(q => q.id !== questionId);
    setQuestionHistory(updatedHistory);
    saveQuestionHistory(updatedHistory);
    
    setNotifications([{
      id: 'question_deleted',
      type: 'success',
      title: 'Question supprimée',
      message: 'La question a été supprimée de votre historique.'
    }]);
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <>
      <Helmet>
        <title>Questions Financières - Rivela Financial Explorer</title>
        <meta name="description" content="Posez vos questions financières personnalisées et obtenez des insights basés sur la neuroscience pour mieux comprendre vos habitudes d'argent." />
        <meta name="keywords" content="questions financières, analyse financière, insights neuroscience, habitudes argent, Rivela" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main className="pt-16">
          {/* Progress Indicator */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border/20">
            <div className="container mx-auto px-4 py-4">
              <ProgressIndicator 
                currentStep={1} 
                totalSteps={6} 
                variant="minimal"
              />
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
                Explorez vos questions financières
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Posez une question sur votre situation financière et découvrez des insights personnalisés 
                basés sur la neuroscience comportementale.
              </p>
            </div>

            {/* Mood Slider */}
            <MoodSlider 
              mood={currentMood}
              onMoodChange={setCurrentMood}
            />

            {/* Main Question Input */}
            <QuestionInput
              question={currentQuestion}
              onQuestionChange={setCurrentQuestion}
              onSubmit={handleQuestionSubmit}
              isAnalyzing={isAnalyzing}
            />

            {/* Contextual Tags */}
            <ContextualTags
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />

            {/* Suggestion Chips */}
            <SuggestionChips
              onSuggestionSelect={handleSuggestionSelect}
            />

            {/* History Toggle */}
            {questionHistory.length > 0 && (
              <div className="text-center">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-xl
                           border border-border/20 text-text-primary hover:shadow-glass-hover
                           transition-all duration-300"
                >
                  <span className="font-medium">
                    {showHistory ? 'Masquer l\'historique' : 'Voir l\'historique'}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {questionHistory.length}
                  </span>
                </button>
              </div>
            )}

            {/* Question History */}
            {showHistory && (
              <QuestionHistory
                questions={questionHistory}
                onQuestionSelect={handleHistoryQuestionSelect}
                onDeleteQuestion={handleDeleteQuestion}
              />
            )}

            {/* Quick Navigation */}
            <div className="text-center pt-8">
              <div className="inline-flex items-center space-x-4 p-4 glass rounded-xl border border-border/20">
                <span className="text-sm text-text-secondary">Prêt pour l'étape suivante ?</span>
                <button
                  onClick={() => navigate('/financial-data-entry-dashboard')}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Saisir mes données
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Notifications */}
        <NotificationBanner
          notifications={notifications}
          onDismiss={handleNotificationDismiss}
          position="top"
          maxVisible={2}
          autoHideDelay={6000}
        />
      </div>
    </>
  );
};

export default FinancialQuestionInput;