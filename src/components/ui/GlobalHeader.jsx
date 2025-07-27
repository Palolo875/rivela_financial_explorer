import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'questions',
      labelFr: 'Questions',
      path: '/financial-question-input',
      icon: 'MessageCircle',
      tooltip: 'Commencez votre exploration financière'
    },
    {
      id: 'profil',
      labelFr: 'Profil',
      path: '/user-profile-setup',
      icon: 'User',
      tooltip: 'Configurez votre profil personnel'
    },
    {
      id: 'donnees',
      labelFr: 'Données',
      path: '/financial-data-entry-dashboard',
      icon: 'Database',
      tooltip: 'Saisissez vos informations financières'
    },
    {
      id: 'equation',
      labelFr: 'Équation',
      path: '/personalized-financial-equation-visualization',
      icon: 'Calculator',
      tooltip: 'Visualisez votre formule financière personnalisée'
    },
    {
      id: 'scenarios',
      labelFr: 'Scénarios',
      path: '/interactive-scenario-simulator',
      icon: 'TrendingUp',
      tooltip: 'Explorez différents scénarios financiers'
    },
    {
      id: 'apprentissage',
      labelFr: 'Apprentissage',
      path: '/neuroscience-insights-library',
      icon: 'Brain',
      tooltip: 'Découvrez les insights neuroscientifiques'
    },
    {
      id: 'dashboard',
      labelFr: 'Tableau de Bord',
      path: '/financial-health-dashboard',
      icon: 'BarChart3',
      tooltip: 'Surveillez votre santé financière'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glass">
          <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={10} color="white" strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-lg text-foreground leading-tight">
          Rivela
        </span>
        <span className="font-caption text-xs text-text-secondary leading-tight">
          Financial Explorer
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 glass border-b border-border/40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      relative px-4 py-2 rounded-lg font-heading font-medium text-sm
                      transition-all duration-300 ease-out group
                      ${isActive 
                        ? 'bg-primary/10 text-primary glass-hover' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                      }
                    `}
                    title={item.tooltip}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={item.icon} 
                        size={16} 
                        color={isActive ? 'var(--color-primary)' : 'currentColor'} 
                      />
                      <span>{item.labelFr}</span>
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-scale-in" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="relative"
              >
                <Icon 
                  name={isMobileMenuOpen ? "X" : "Menu"} 
                  size={24} 
                  color="var(--color-text-primary)" 
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-1100 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-1100 glass border-r border-border/40 md:hidden animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name="X" size={24} color="var(--color-text-primary)" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                        font-heading font-medium text-left transition-all duration-300
                        ${isActive 
                          ? 'bg-primary/10 text-primary glass-hover' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                        }
                      `}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        color={isActive ? 'var(--color-primary)' : 'currentColor'} 
                      />
                      <div className="flex-1">
                        <div className="text-base">{item.labelFr}</div>
                        <div className="text-xs text-text-secondary/70 mt-0.5">
                          {item.tooltip}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-scale-in" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-border/20">
                <div className="text-xs text-text-secondary text-center">
                  Rivela Financial Explorer
                  <br />
                  Explorez votre avenir financier
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GlobalHeader;