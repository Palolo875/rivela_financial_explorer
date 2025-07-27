import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ data, errors, onUpdate }) => {
  const [professionSuggestions] = useState([
    'Développeur / Développeuse',
    'Designer / Designeuse',
    'Manager / Manageuse',
    'Consultant / Consultante',
    'Enseignant / Enseignante',
    'Médecin / Médecine',
    'Ingénieur / Ingénieure',
    'Comptable',
    'Avocat / Avocate',
    'Entrepreneur / Entrepreneuse',
    'Étudiant / Étudiante',
    'Retraité / Retraitée',
    'Autre'
  ]);

  const [showProfessionSuggestions, setShowProfessionSuggestions] = useState(false);

  const handleInputChange = (field, value) => {
    onUpdate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfessionSelect = (profession) => {
    handleInputChange('profession', profession);
    setShowProfessionSuggestions(false);
  };

  const filteredProfessions = professionSuggestions.filter(prof =>
    prof.toLowerCase().includes(data.profession?.toLowerCase() || '')
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="User" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
          Informations personnelles
        </h2>
        <p className="text-text-secondary">
          Renseignez vos informations de base pour personnaliser votre expérience Rivela
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <Input
            type="text"
            label="Nom complet"
            placeholder="Prénom Nom"
            value={data.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={errors.fullName}
            required
            className="text-lg"
          />
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            label="Adresse email"
            placeholder="votre.email@exemple.com"
            value={data.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
            description="Utilisé pour les notifications et la récupération de compte"
          />
        </div>

        {/* Age */}
        <div>
          <Input
            type="number"
            label="Âge"
            placeholder="25"
            min="16"
            max="100"
            value={data.age || ''}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
            error={errors.age}
            required
            description="Pour adapter les conseils à votre tranche d'âge"
          />
        </div>

        {/* Profession with Autocomplete */}
        <div className="md:col-span-2 relative">
          <Input
            type="text"
            label="Profession"
            placeholder="Commencez à taper votre profession..."
            value={data.profession || ''}
            onChange={(e) => {
              handleInputChange('profession', e.target.value);
              setShowProfessionSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowProfessionSuggestions(data.profession?.length > 0)}
            error={errors.profession}
            required
            description="Votre secteur d'activité nous aide à personnaliser les conseils financiers"
          />
          
          {/* Profession Suggestions Dropdown */}
          {showProfessionSuggestions && filteredProfessions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-border/30 
                          rounded-xl shadow-lg max-h-60 overflow-y-auto glass">
              {filteredProfessions.slice(0, 8).map((profession, index) => (
                <button
                  key={index}
                  onClick={() => handleProfessionSelect(profession)}
                  className="w-full text-left px-4 py-3 hover:bg-primary/5 hover:text-primary transition-colors duration-200 border-b border-border/10 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Briefcase" size={16} color="var(--color-text-secondary)" />
                    <span className="text-sm">{profession}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-8">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-primary mb-1">Protection des données</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vos informations personnelles sont chiffrées et ne sont jamais partagées avec des tiers. 
              Elles servent uniquement à personnaliser votre expérience Rivela.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;