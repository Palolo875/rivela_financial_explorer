import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioSynthesis = ({
  equationData,
  insights = [],
  isVisible = true,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.7);
  const [isSupported, setIsSupported] = useState(false);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const utteranceRef = useRef(null);
  const timeoutRef = useRef(null);
  const currentTextRef = useRef(null);

  // Check for speech synthesis support
  useEffect(() => {
    if ('speechSynthesis' in window && window.speechSynthesis) {
      setIsSupported(true);

      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis?.getVoices() || [];
        const frenchVoices = voices.filter((voice) =>
          voice.lang.startsWith('fr') || voice.lang.startsWith('fr-FR')
        );

        setVoiceOptions(frenchVoices.length > 0 ? frenchVoices : voices.slice(0, 5));

        // Select default French voice or first available
        const defaultVoice = frenchVoices.find((voice) => voice.default) ||
          frenchVoices[0] ||
          voices[0];
        setSelectedVoice(defaultVoice);
      };

      loadVoices();
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Mock equation data for synthesis
  const mockEquationData = equationData || {
    formula: "Dépenses Weekend × État Émotionnel = Dépassement Mensuel",
    variables: [
      { name: 'Dépenses Weekend', value: 280, unit: '€' },
      { name: 'État Émotionnel', value: 6.2, unit: '/10' },
      { name: 'Dépassement Mensuel', value: 420, unit: '€' }]

  };

  const mockInsights = insights.length > 0 ? insights : [
    {
      id: 1,
      title: 'Dépenses Émotionnelles Détectées',
      summary: 'Vos achats augmentent de 45% les jours de stress élevé',
      impact: 'high'
    },
    {
      id: 2,
      title: 'Frais Cachés Identifiés',
      summary: '47 euros par mois en frais récurrents non-optimisés',
      impact: 'medium'
    }];


  // Generate synthesis content
  const generateSynthesisContent = () => {
    const segments = [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `Bonjour ! Voici votre analyse financière personnalisée générée par Rivela.`
      },
      {
        id: 'equation',
        title: 'Équation Personnalisée',
        content: `Votre équation financière révèle que : ${mockEquationData.formula}. 
                   Analysons chaque composant. ${mockEquationData.variables.map((v) =>
                     `${v.name} : ${v.value} ${v.unit}`
                   ).join('. ')}.`
      },
      {
        id: 'insights',
        title: 'Insights Principaux',
        content: `Nous avons identifié ${mockInsights.length} insights clés. 
                   ${mockInsights.map((insight) =>
                     `${insight.title} : ${insight.summary}`
                   ).join('. ')}.`
      },
      {
        id: 'recommendations',
        title: 'Recommandations',
        content: `Basé sur cette analyse, nous recommandons de surveiller vos dépenses émotionnelles 
                   et d'optimiser vos frais récurrents pour améliorer votre santé financière.`
      },
      {
        id: 'conclusion',title: 'Conclusion',
        content: `Cette analyse vous donne les clés pour mieux comprendre vos habitudes financières. 
                   Utilisez ces insights pour prendre des décisions éclairées et atteindre vos objectifs.`
      }
    ];

    return segments;
  };

  const synthesisSegments = generateSynthesisContent();

  const handleSpeechError = (event, segmentId = null) => {
    console.error('Speech synthesis error:', event.error);
    
    const errorMessages = {
      'interrupted': 'La lecture a été interrompue. Cliquez sur "Reprendre" pour continuer.',
      'canceled': 'La lecture a été annulée.',
      'not-allowed': 'Permission refusée pour la synthèse vocale.',
      'network': 'Erreur réseau. Vérifiez votre connexion.',
      'synthesis-failed': 'Échec de la synthèse vocale.',
      'synthesis-unavailable': 'Service de synthèse vocale indisponible.',
      'voice-unavailable': 'Voix sélectionnée indisponible.',
      'audio-busy': 'Audio occupé. Réessayez dans un moment.',
      'audio-hardware': 'Problème matériel audio.'
    };

    const errorMessage = errorMessages[event.error] || `Erreur inconnue: ${event.error}`;
    
    setError({
      type: event.error,
      message: errorMessage,
      segmentId: segmentId,
      canRetry: ['interrupted', 'network', 'audio-busy'].includes(event.error)
    });
    
    setIsPlaying(false);
    setCurrentSegment(null);
  };

  const clearError = () => {
    setError(null);
    setIsRetrying(false);
  };

  const retryPlayback = () => {
    if (!error?.canRetry || !currentTextRef.current) return;
    
    setIsRetrying(true);
    setError(null);
    
    // Wait a bit before retrying
    timeoutRef.current = setTimeout(() => {
      speak(currentTextRef.current, error.segmentId);
      setIsRetrying(false);
    }, 1000);
  };

  const speak = (text, segmentId = null) => {
    if (!isSupported || !window.speechSynthesis) return;

    // Clear any existing errors
    clearError();
    
    // Store current text for retry functionality
    currentTextRef.current = text;

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Wait a bit to ensure cancellation is complete
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = playbackSpeed;
      utterance.volume = volume;
      utterance.lang = 'fr-FR';

      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentSegment(segmentId);
        clearError();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentSegment(null);
        currentTextRef.current = null;
      };

      utterance.onerror = (event) => {
        handleSpeechError(event, segmentId);
      };

      // Handle browser page visibility changes
      const handleVisibilityChange = () => {
        if (document.hidden && isPlaying) {
          window.speechSynthesis.pause();
        } else if (!document.hidden && isPlaying) {
          window.speechSynthesis.resume();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      utterance.onend = () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        setIsPlaying(false);
        setCurrentSegment(null);
        currentTextRef.current = null;
      };

      utteranceRef.current = utterance;
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        handleSpeechError({ error: 'synthesis-failed' }, segmentId);
      }
    }, 100);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentSegment(null);
    currentTextRef.current = null;
    clearError();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const playFullAnalysis = () => {
    const fullText = synthesisSegments.map((segment) => segment.content).join(' ');
    speak(fullText, 'full');
  };

  const playSegment = (segment) => {
    speak(segment.content, segment.id);
  };

  const handleSpeedChange = (newSpeed) => {
    setPlaybackSpeed(newSpeed);
    if (isPlaying) {
      // Restart with new speed
      const currentText = utteranceRef.current?.text;
      if (currentText) {
        stopSpeech();
        setTimeout(() => speak(currentText, currentSegment), 100);
      }
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
  };

  if (!isSupported) {
    return (
      <div className={`glass rounded-xl p-4 ${className}`}>
        <div className="flex items-center space-x-3 text-text-secondary">
          <Icon name="VolumeX" size={20} />
          <span className="text-sm">
            La synthèse vocale n'est pas supportée par votre navigateur.
          </span>
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={`glass rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Volume2" size={16} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base text-foreground">
                Synthèse Vocale
              </h3>
              <p className="text-xs text-text-secondary">
                Écoutez votre analyse financière
              </p>
            </div>
          </div>
          
          {/* Main Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={isPlaying ? "Pause" : "Play"}
              onClick={isPlaying ? stopSpeech : playFullAnalysis}
              disabled={!selectedVoice}>

              {isPlaying ? 'Pause' : 'Écouter'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass rounded-lg p-3 bg-red-500/5 border border-red-500/20"
            >
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} color="var(--color-red-500)" className="mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-red-600">
                    Erreur de synthèse vocale
                  </div>
                  <div className="text-xs text-red-500 mt-1">
                    {error.message}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {error.canRetry && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName={isRetrying ? "Loader2" : "RotateCcw"}
                      onClick={retryPlayback}
                      disabled={isRetrying}
                      className="text-xs border-red-500/20 hover:bg-red-500/10"
                    >
                      {isRetrying ? 'Reprise...' : 'Reprendre'}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={clearError}
                    className="text-red-500 hover:bg-red-500/10"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playback Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Speed Control */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Vitesse: {playbackSpeed}x
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSpeedChange(Math.max(0.5, playbackSpeed - 0.25))}
                disabled={playbackSpeed <= 0.5}>

                <Icon name="Minus" size={14} />
              </Button>
              <div className="flex-1 text-center text-sm font-medium">
                {playbackSpeed}x
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSpeedChange(Math.min(2, playbackSpeed + 0.25))}
                disabled={playbackSpeed >= 2}>

                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer" />

          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Voix
            </label>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voiceOptions.find((v) => v.name === e.target.value);
                handleVoiceChange(voice);
              }}
              className="w-full px-3 py-1 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">

              {voiceOptions.map((voice) =>
              <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Segment Controls */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground">
            Écouter par section
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {synthesisSegments.map((segment) =>
            <Button
              key={segment.id}
              variant={currentSegment === segment.id ? "default" : "outline"}
              size="sm"
              iconName={currentSegment === segment.id ? "Volume2" : "Play"}
              iconPosition="left"
              onClick={() => playSegment(segment)}
              disabled={!selectedVoice}
              className="justify-start text-xs">

                {segment.title}
              </Button>
            )}
          </div>
        </div>

        {/* Current Status - Updated */}
        <AnimatePresence>
          {(isPlaying || isRetrying) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass rounded-lg p-3 bg-primary/5"
            >
              <div className="flex items-center space-x-3">
                <div className={isRetrying ? "animate-spin" : "animate-pulse"}>
                  <Icon 
                    name={isRetrying ? "Loader2" : "Volume2"} 
                    size={16} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-primary">
                    {isRetrying ? 'Reprise en cours...' : 'Lecture en cours...'}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {currentSegment === 'full' ? 'Analyse complète' :
                      synthesisSegments.find((s) => s.id === currentSegment)?.title}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Square"
                  onClick={stopSpeech}
                  disabled={isRetrying}
                >
                  Arrêter
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessibility Note */}
        <div className="text-xs text-text-secondary bg-muted/50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={14} color="var(--color-text-secondary)" className="mt-0.5" />
            <div>
              <strong>Accessibilité :</strong> Cette fonctionnalité utilise la synthèse vocale 
              de votre navigateur pour rendre l'analyse accessible aux personnes malvoyantes ou préférant l'écoute à la lecture.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioSynthesis;