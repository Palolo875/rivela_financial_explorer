import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationBanner = ({ 
  notifications = [],
  onDismiss,
  position = "top", // top, bottom
  maxVisible = 3,
  autoHideDelay = 5000,
  className = ""
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getNotificationConfig = (type) => {
    const configs = {
      insight: {
        icon: 'Lightbulb',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        textColor: 'text-primary',
        iconColor: 'var(--color-primary)'
      },
      success: {
        icon: 'CheckCircle2',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        textColor: 'text-success',
        iconColor: 'var(--color-success)'
      },
      warning: {
        icon: 'AlertTriangle',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        textColor: 'text-warning',
        iconColor: 'var(--color-warning)'
      },
      error: {
        icon: 'AlertCircle',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        textColor: 'text-error',
        iconColor: 'var(--color-error)'
      },
      achievement: {
        icon: 'Trophy',
        bgColor: 'bg-accent/10',
        borderColor: 'border-accent/20',
        textColor: 'text-accent',
        iconColor: 'var(--color-accent)'
      },
      financial: {
        icon: 'TrendingUp',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        textColor: 'text-secondary',
        iconColor: 'var(--color-secondary)'
      }
    };
    return configs[type] || configs.insight;
  };

  const handleDismiss = (notificationId) => {
    setVisibleNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    if (onDismiss) {
      onDismiss(notificationId);
    }
  };

  const handleAction = (notification) => {
    if (notification.action && notification.action.handler) {
      notification.action.handler();
    }
    handleDismiss(notification.id);
  };

  useEffect(() => {
    if (autoHideDelay > 0) {
      visibleNotifications.forEach(notification => {
        if (!notification.persistent) {
          const timer = setTimeout(() => {
            handleDismiss(notification.id);
          }, autoHideDelay);

          return () => clearTimeout(timer);
        }
      });
    }
  }, [visibleNotifications, autoHideDelay]);

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div 
      className={`
        fixed left-4 right-4 z-900 space-y-3
        ${position === 'top' ? 'top-20' : 'bottom-4'}
        ${className}
      `}
    >
      {visibleNotifications.map((notification) => {
        const config = getNotificationConfig(notification.type);
        
        return (
          <div
            key={notification.id}
            className={`
              glass border ${config.bgColor} ${config.borderColor}
              rounded-xl p-4 shadow-glass animate-slide-in
              max-w-md mx-auto md:max-w-2xl
            `}
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <Icon 
                  name={config.icon} 
                  size={20} 
                  color={config.iconColor}
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <div className={`font-heading font-semibold text-sm ${config.textColor} mb-1`}>
                    {notification.title}
                  </div>
                )}
                <div className="text-sm text-text-primary leading-relaxed">
                  {notification.message}
                </div>
                
                {notification.details && (
                  <div className="text-xs text-text-secondary mt-2 leading-relaxed">
                    {notification.details}
                  </div>
                )}

                {/* Action Button */}
                {notification.action && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(notification)}
                      className="text-xs"
                    >
                      {notification.action.label}
                    </Button>
                  </div>
                )}
              </div>

              {/* Dismiss Button */}
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDismiss(notification.id)}
                  className="w-8 h-8 hover:bg-black/5"
                >
                  <Icon 
                    name="X" 
                    size={16} 
                    color="var(--color-text-secondary)"
                  />
                </Button>
              </div>
            </div>

            {/* Progress Bar for Auto-hide */}
            {!notification.persistent && autoHideDelay > 0 && (
              <div className="mt-3 h-1 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${config.bgColor.replace('/10', '/30')} rounded-full animate-pulse`}
                  style={{
                    animation: `shrink ${autoHideDelay}ms linear forwards`
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Example usage component for demonstration
export const NotificationExample = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type) => {
    const examples = {
      insight: {
        id: Date.now(),
        type: 'insight',
        title: 'Nouvelle découverte financière',
        message: 'Votre épargne mensuelle pourrait augmenter de 15% en optimisant vos dépenses récurrentes.',
        details: 'Basé sur l\'analyse de vos 3 derniers mois de transactions.',
        action: {
          label: 'Voir les détails',
          handler: () => console.log('Navigating to insights...')
        }
      },
      success: {
        id: Date.now(),
        type: 'success',
        title: 'Objectif atteint !',
        message: 'Félicitations ! Vous avez atteint votre objectif d\'épargne mensuel.',
        action: {
          label: 'Définir un nouvel objectif',
          handler: () => console.log('Setting new goal...')
        }
      },
      warning: {
        id: Date.now(),
        type: 'warning',
        title: 'Attention aux dépenses',
        message: 'Vos dépenses ce mois-ci dépassent la moyenne de 23%. Voulez-vous ajuster votre budget ?',
        action: {
          label: 'Ajuster le budget',
          handler: () => console.log('Adjusting budget...')
        }
      },
      achievement: {
        id: Date.now(),
        type: 'achievement',
        title: 'Nouveau niveau débloqué !',
        message: 'Vous avez complété votre première analyse financière complète.',
        persistent: true
      }
    };

    const newNotification = examples[type];
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDismiss = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addNotification('insight')}>
          Insight
        </Button>
        <Button onClick={() => addNotification('success')}>
          Success
        </Button>
        <Button onClick={() => addNotification('warning')}>
          Warning
        </Button>
        <Button onClick={() => addNotification('achievement')}>
          Achievement
        </Button>
      </div>

      <NotificationBanner
        notifications={notifications}
        onDismiss={handleDismiss}
        position="top"
        maxVisible={3}
        autoHideDelay={5000}
      />
    </div>
  );
};

export default NotificationBanner;