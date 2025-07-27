import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProfileCustomization = ({ data, onUpdate }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(data.avatar || 'default');

  const avatarOptions = [
    { id: 'default', name: 'Profil par défaut', icon: 'User', color: 'var(--color-primary)' },
    { id: 'professional', name: 'Professionnel', icon: 'Briefcase', color: 'var(--color-secondary)' },
    { id: 'creative', name: 'Créatif', icon: 'Palette', color: 'var(--color-accent)' },
    { id: 'student', name: 'Étudiant', icon: 'GraduationCap', color: 'var(--color-warning)' },
    { id: 'family', name: 'Famille', icon: 'Home', color: 'var(--color-success)' },
    { id: 'entrepreneur', name: 'Entrepreneur', icon: 'TrendingUp', color: 'var(--color-error)' }
  ];

  const handleAvatarChange = (avatarId) => {
    setSelectedAvatar(avatarId);
    onUpdate(prev => ({
      ...prev,
      avatar: avatarId
    }));
  };

  const handleThemeChange = (theme) => {
    onUpdate(prev => ({
      ...prev,
      theme: theme
    }));
  };

  const handleNotificationChange = (type, value) => {
    onUpdate(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const NotificationToggle = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover:bg-muted/30 transition-colors duration-200">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary mb-1">{label}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20
          ${checked ? 'bg-primary' : 'bg-border/40'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300
          ${checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Settings" size={32} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
          Personnalisation du profil
        </h2>
        <p className="text-text-secondary">
          Personnalisez l'apparence et les préférences de votre compte Rivela
        </p>
      </div>

      {/* Avatar Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Choisissez votre avatar
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {avatarOptions.map((avatar) => {
            const isSelected = selectedAvatar === avatar.id;
            return (
              <button
                key={avatar.id}
                onClick={() => handleAvatarChange(avatar.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center
                  ${isSelected 
                    ? 'border-primary bg-primary/10 shadow-glass-hover' 
                    : 'border-border/20 hover:border-primary/40 hover:bg-primary/5'
                  }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3
                  ${isSelected ? 'bg-primary/20' : 'bg-muted'}`}>
                  <Icon 
                    name={avatar.icon} 
                    size={32} 
                    color={isSelected ? avatar.color : 'var(--color-text-secondary)'} 
                  />
                </div>
                <h4 className="font-medium text-text-primary text-sm">{avatar.name}</h4>
                {isSelected && (
                  <div className="mt-2">
                    <Icon name="Check" size={16} color="var(--color-primary)" className="mx-auto" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Thème d'affichage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${data.theme === 'light' ?'border-primary bg-primary/10' :'border-border/20 hover:border-primary/40'
              }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-white border border-border/30 rounded-lg flex items-center justify-center">
                <Icon name="Sun" size={16} color="var(--color-warning)" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Thème clair</h4>
                <p className="text-sm text-text-secondary">Interface lumineuse et moderne</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleThemeChange('dark')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left opacity-50 cursor-not-allowed
              ${data.theme === 'dark' ?'border-primary bg-primary/10' :'border-border/20'
              }`}
            disabled
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-gray-800 border border-border/30 rounded-lg flex items-center justify-center">
                <Icon name="Moon" size={16} color="var(--color-text-secondary)" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Thème sombre</h4>
                <p className="text-sm text-text-secondary">Bientôt disponible</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Préférences de notification
        </h3>
        <div className="space-y-4">
          <NotificationToggle
            id="email"
            label="Notifications par email"
            description="Recevez des insights et conseils personnalisés par email"
            checked={data.notifications?.email || false}
            onChange={(value) => handleNotificationChange('email', value)}
          />
          
          <NotificationToggle
            id="push"
            label="Notifications push"
            description="Alertes et rappels directement dans votre navigateur"
            checked={data.notifications?.push || false}
            onChange={(value) => handleNotificationChange('push', value)}
          />
          
          <NotificationToggle
            id="weekly"
            label="Résumé hebdomadaire"
            description="Rapport hebdomadaire de votre santé financière"
            checked={data.notifications?.weekly || false}
            onChange={(value) => handleNotificationChange('weekly', value)}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-border/20">
        <h4 className="font-semibold text-text-primary mb-4">Aperçu de votre profil</h4>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon 
              name={avatarOptions.find(a => a.id === selectedAvatar)?.icon || 'User'} 
              size={32} 
              color="var(--color-primary)" 
            />
          </div>
          <div>
            <h5 className="font-medium text-text-primary text-lg">
              {data.fullName ? `Bonjour, ${data.fullName.split(' ')[0]} !` : 'Bonjour !'}
            </h5>
            <p className="text-text-secondary">
              {data.profession || 'Profession non renseignée'} • {data.age ? `${data.age} ans` : 'Âge non renseigné'}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Icon name="Target" size={16} color="var(--color-secondary)" />
              <span className="text-sm text-text-secondary">
                {data.financialGoals?.length || 0} objectif(s) financier(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Notice */}
      <div className="bg-success/5 border border-success/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-success mb-1">Profil prêt !</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Votre profil Rivela est maintenant configuré. Vous pouvez modifier ces paramètres 
              à tout moment depuis les paramètres de votre compte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomization;