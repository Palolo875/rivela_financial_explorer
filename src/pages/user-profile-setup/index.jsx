import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import NotificationBanner from '../../components/ui/NotificationBanner';
import PersonalInfoForm from './components/PersonalInfoForm';
import FinancialGoalsForm from './components/FinancialGoalsForm';
import FamilySituationForm from './components/FamilySituationForm';
import ProfileCustomization from './components/ProfileCustomization';

const UserProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    age: '',
    profession: '',
    
    // Financial Goals
    financialGoals: [],
    monthlyIncome: '',
    
    // Family Situation
    familyStatus: '',
    
    // Profile Customization
    avatar: '',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      weekly: true
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const totalSteps = 4;

  // Load saved profile data on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('rivela_user_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData({ ...profileData, ...parsedProfile });
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }

    // Show welcome notification for first-time setup
    const hasSetupProfile = localStorage.getItem('rivela_profile_setup_complete');
    if (!hasSetupProfile) {
      setNotifications([{
        id: 'welcome_setup',
        type: 'insight',
        title: 'Créez votre profil Rivela',
        message: 'Personnalisez votre expérience en renseignant vos informations personnelles et objectifs financiers.',
        persistent: true
      }]);
    }
  }, []);

  // Save profile data to localStorage
  const saveProfileData = (data) => {
    localStorage.setItem('rivela_user_profile', JSON.stringify(data));
  };

  const updateProfileData = (section, data) => {
    const updatedProfile = { ...profileData, [section]: data };
    setProfileData(updatedProfile);
    saveProfileData(updatedProfile);
  };

  const validateCurrentStep = () => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 1:
        if (!profileData.fullName?.trim()) stepErrors.fullName = 'Le nom complet est requis';
        if (!profileData.email?.trim()) {
          stepErrors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
          stepErrors.email = 'Format d\'email invalide';
        }
        if (!profileData.age || profileData.age < 16 || profileData.age > 100) {
          stepErrors.age = 'L\'âge doit être entre 16 et 100 ans';
        }
        if (!profileData.profession?.trim()) stepErrors.profession = 'La profession est requise';
        break;
      
      case 2:
        if (profileData.financialGoals?.length === 0) {
          stepErrors.financialGoals = 'Sélectionnez au moins un objectif financier';
        }
        if (!profileData.monthlyIncome) {
          stepErrors.monthlyIncome = 'Renseignez votre tranche de revenus approximative';
        }
        break;
      
      case 3:
        if (!profileData.familyStatus) {
          stepErrors.familyStatus = 'Sélectionnez votre situation familiale';
        }
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        handleProfileSave();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleProfileSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark profile setup as complete
      localStorage.setItem('rivela_profile_setup_complete', 'true');
      saveProfileData(profileData);
      
      setNotifications([{
        id: 'profile_saved',
        type: 'success',
        title: 'Profil sauvegardé !',
        message: `Bienvenue ${profileData.fullName} ! Votre profil a été créé avec succès.`,
        action: {
          label: 'Continuer',
          handler: () => navigate('/financial-question-input')
        }
      }]);
      
    } catch (error) {
      setNotifications([{
        id: 'save_error',
        type: 'error',
        title: 'Erreur de sauvegarde',
        message: 'Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={profileData}
            errors={errors}
            onChange={(data) => updateProfileData('personalInfo', data)}
            onUpdate={setProfileData}
          />
        );
      case 2:
        return (
          <FinancialGoalsForm
            data={profileData}
            errors={errors}
            onChange={(data) => updateProfileData('financialGoals', data)}
            onUpdate={setProfileData}
          />
        );
      case 3:
        return (
          <FamilySituationForm
            data={profileData}
            errors={errors}
            onChange={(data) => updateProfileData('familyStatus', data)}
            onUpdate={setProfileData}
          />
        );
      case 4:
        return (
          <ProfileCustomization
            data={profileData}
            onChange={(data) => updateProfileData('customization', data)}
            onUpdate={setProfileData}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Informations personnelles',
      2: 'Objectifs financiers',
      3: 'Situation familiale',
      4: 'Personnalisation du profil'
    };
    return titles[currentStep];
  };

  return (
    <>
      <Helmet>
        <title>Configuration du Profil - Rivela Financial Explorer</title>
        <meta name="description" content="Créez votre profil personnalisé Rivela en renseignant vos informations personnelles et objectifs financiers pour une expérience sur-mesure." />
        <meta name="keywords" content="profil utilisateur, configuration, informations personnelles, objectifs financiers, Rivela" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main className="pt-16">
          {/* Progress Indicator */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border/20">
            <div className="container mx-auto px-4 py-4">
              <ProgressIndicator 
                currentStep={currentStep} 
                totalSteps={totalSteps} 
                variant="detailed"
                labels={['Personnel', 'Objectifs', 'Famille', 'Profil']}
              />
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
                Créez votre profil
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                {getStepTitle()} - Étape {currentStep} sur {totalSteps}
              </p>
            </div>

            {/* Form Content */}
            <div className="glass rounded-2xl p-6 md:p-8 border border-border/20 shadow-glass mb-8">
              {renderCurrentStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                className="order-2 sm:order-1 px-6 py-3 text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {currentStep > 1 ? '← Étape précédente' : ''}
              </button>

              <div className="order-1 sm:order-2 flex gap-3">
                <button
                  onClick={() => navigate('/financial-question-input')}
                  className="px-6 py-3 glass rounded-xl border border-border/20 text-text-secondary 
                           hover:text-primary hover:shadow-glass-hover transition-all duration-300"
                >
                  Passer
                </button>
                
                <button
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-medium 
                           hover:bg-primary/90 disabled:opacity-50 transition-all duration-200
                           flex items-center space-x-2"
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  <span>
                    {currentStep === totalSteps 
                      ? (isLoading ? 'Sauvegarde...' : 'Sauvegarder le profil')
                      : 'Étape suivante →'
                    }
                  </span>
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
          autoHideDelay={8000}
        />
      </div>
    </>
  );
};

export default UserProfileSetup;