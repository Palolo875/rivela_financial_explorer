import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MoodSlider = ({ mood, onMoodChange, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);

  const moodLabels = [
    { value: 1, label: "Très stressé", emoji: "😰", color: "text-red-600" },
    { value: 2, label: "Stressé", emoji: "😟", color: "text-red-500" },
    { value: 3, label: "Inquiet", emoji: "😕", color: "text-orange-500" },
    { value: 4, label: "Préoccupé", emoji: "😐", color: "text-yellow-500" },
    { value: 5, label: "Neutre", emoji: "😑", color: "text-gray-500" },
    { value: 6, label: "Calme", emoji: "🙂", color: "text-blue-500" },
    { value: 7, label: "Confiant", emoji: "😊", color: "text-green-500" },
    { value: 8, label: "Optimiste", emoji: "😄", color: "text-green-600" },
    { value: 9, label: "Très confiant", emoji: "😁", color: "text-emerald-600" },
    { value: 10, label: "Excellent", emoji: "🤩", color: "text-emerald-700" }
  ];

  const getCurrentMoodData = () => {
    return moodLabels.find(m => m.value === mood) || moodLabels[4];
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    onMoodChange(value);
  };

  const currentMood = getCurrentMoodData();

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="glass rounded-xl p-6 border border-border/20">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Heart" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold font-heading text-text-primary">
              Comment vous sentez-vous financièrement ?
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Votre état émotionnel influence vos décisions financières. Cette information nous aide à personnaliser l'analyse.
          </p>
        </div>

        {/* Current Mood Display */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{currentMood.emoji}</div>
          <div className={`text-lg font-medium font-heading ${currentMood.color}`}>
            {currentMood.label}
          </div>
          <div className="text-sm text-text-secondary mt-1">
            Niveau {mood}/10
          </div>
        </div>

        {/* Slider */}
        <div className="relative mb-4">
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer
                     slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 
                     slider-thumb:rounded-full slider-thumb:bg-primary 
                     slider-thumb:cursor-pointer slider-thumb:shadow-lg
                     slider-thumb:transition-all slider-thumb:duration-200
                     hover:slider-thumb:scale-110 focus:outline-none focus:ring-2 
                     focus:ring-primary/20"
            style={{
              background: `linear-gradient(to right, 
                var(--color-error) 0%, 
                var(--color-warning) 50%, 
                var(--color-success) 100%)`
            }}
          />
          
          {/* Tick Marks */}
          <div className="flex justify-between mt-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
              <button
                key={tick}
                onClick={() => onMoodChange(tick)}
                className={`w-2 h-2 rounded-full transition-all duration-200
                          ${tick <= mood ? 'bg-primary' : 'bg-muted'}
                          hover:scale-125 cursor-pointer`}
                title={moodLabels[tick - 1].label}
              />
            ))}
          </div>
        </div>

        {/* Mood Scale Labels */}
        <div className="flex justify-between text-xs text-text-secondary mt-4">
          <div className="text-center">
            <div className="text-red-500 font-medium">Stressé</div>
            <div>1-3</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-500 font-medium">Neutre</div>
            <div>4-6</div>
          </div>
          <div className="text-center">
            <div className="text-green-500 font-medium">Confiant</div>
            <div>7-10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSlider;