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
    },
    {
      id: 'design',
      labelFr: 'Design System',
      path: '/glassmorphism-demo',
      icon: 'Palette',
      tooltip: 'Démonstration du système glassmorphism'
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
        <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center glass-intense shadow-glass micro-glow">
          <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-rose rounded-full flex items-center justify-center animate-breathe">
          <Icon name="Sparkles" size={10} color="white" strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-lg text-gradient-primary leading-tight">
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
      <header className="fixed top-0 left-0 right-0 z-1000 glass-intense border-b border-glass-border backdrop-glass-intense">
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
                      relative px-4 py-2 rounded-xl font-heading font-medium text-sm
                      transition-all duration-glass ease-out group micro-bounce
                      ${isActive 
                        ? 'nav-item-active' : 'nav-item'
                      }
                    `}
                    title={item.tooltip}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={item.icon} 
                        size={16} 
                        color={isActive ? 'var(--color-primary)' : 'currentColor'} 
                        strokeWidth={2}
                      />
                      <span>{item.labelFr}</span>
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-glass-in" />
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
                className="relative glass-subtle"
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
            className="fixed inset-0 z-1100 bg-black/20 backdrop-glass md:hidden animate-glass-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-1100 glass-intense border-r border-glass-border-hover md:hidden animate-slide-in backdrop-glass-intense">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="glass-subtle"
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
                        font-heading font-medium text-left transition-all duration-glass
                        micro-bounce
                        ${isActive 
                          ? 'nav-item-active' : 'nav-item hover:glass-hover'
                        }
                      `}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        color={isActive ? 'var(--color-primary)' : 'currentColor'} 
                        strokeWidth={2}
                      />
                      <div className="flex-1">
                        <div className="text-base">{item.labelFr}</div>
                        <div className="text-xs text-text-secondary/70 mt-0.5">
                          {item.tooltip}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-glass-in" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-glass-border">
                <div className="text-xs text-text-secondary text-center">
                  <span className="text-gradient-primary font-semibold">Rivela Financial Explorer</span>
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