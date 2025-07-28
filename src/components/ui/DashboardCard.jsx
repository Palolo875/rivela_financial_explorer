import React from 'react';
import Icon from '../AppIcon';

const DashboardCard = ({ 
  title, 
  children, 
  className = '', 
  variant = 'glass', // 'glass', 'glass-intense', 'gradient'
  action,
  subtitle,
  icon,
  size = 'md', // 'sm', 'md', 'lg'
  hover = true,
  animate = true
}) => {
  const getCardClasses = () => {
    const baseClasses = 'transition-all duration-glass';
    const animationClass = animate ? 'animate-glass-in' : '';
    const hoverClass = hover ? 'glass-hover micro-glow' : '';
    
    const sizeClasses = {
      sm: 'card-glass-sm',
      md: 'card-glass',
      lg: 'card-glass-lg'
    };
    
    const variantClasses = {
      glass: sizeClasses[size],
      'glass-intense': `glass-intense ${size === 'sm' ? 'rounded-xl p-4' : size === 'lg' ? 'rounded-3xl p-8' : 'rounded-2xl p-6'}`,
      gradient: 'card-gradient'
    };

    return `${baseClasses} ${variantClasses[variant]} ${hoverClass} ${animationClass} ${className}`;
  };

  const getIconContainerClasses = () => {
    const baseClasses = 'p-3 rounded-xl micro-bounce transition-all duration-glass';
    
    if (variant === 'gradient') {
      return `${baseClasses} glass-subtle`;
    }
    
    return `${baseClasses} bg-gradient-accent text-white shadow-glass`;
  };

  const getTitleClasses = () => {
    const baseClasses = 'font-heading font-bold';
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };
    
    return `${baseClasses} ${sizeClasses[size]} text-text-primary`;
  };

  const getSubtitleClasses = () => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    
    return `${sizeClasses[size]} text-text-secondary mt-1`;
  };

  return (
    <div className={getCardClasses()}>
      {/* Header */}
      {(title || action || icon) && (
        <div className={`flex items-center justify-between ${size === 'sm' ? 'mb-3' : size === 'lg' ? 'mb-8' : 'mb-6'}`}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className={getIconContainerClasses()}>
                <Icon 
                  name={icon} 
                  size={size === 'sm' ? 18 : size === 'lg' ? 24 : 20} 
                  color="currentColor"
                  strokeWidth={2}
                />
              </div>
            )}
            <div>
              {title && (
                <h3 className={getTitleClasses()}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={getSubtitleClasses()}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className={title || action || icon ? '' : 'first-child'}>
        {children}
      </div>
    </div>
  );
};

// Specialized card variants for common use cases
export const MetricCard = ({ value, label, trend, trendValue, icon, ...props }) => (
  <DashboardCard 
    size="sm" 
    variant="glass" 
    icon={icon}
    {...props}
  >
    <div className="space-y-2">
      <div className="flex items-end space-x-2">
        <span className="text-2xl font-bold font-heading text-text-primary">
          {value}
        </span>
        {trend && (
          <div className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary'
          }`}>
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={14} 
            />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-text-secondary">{label}</p>
    </div>
  </MetricCard>
);

export const ChartCard = ({ title, subtitle, children, ...props }) => (
  <DashboardCard 
    title={title}
    subtitle={subtitle}
    variant="glass"
    size="lg"
    className="chart-container"
    {...props}
  >
    {children}
  </DashboardCard>
);

export const InsightCard = ({ title, insight, icon = "Lightbulb", type = "primary", ...props }) => {
  const getInsightClasses = () => {
    const typeClasses = {
      primary: 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20',
      success: 'bg-gradient-to-r from-success/10 to-success/5 border-success/20',
      warning: 'bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20',
      info: 'bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20'
    };
    
    return `glass-subtle rounded-xl p-4 border ${typeClasses[type]}`;
  };

  const getIconColor = () => {
    const colors = {
      primary: 'var(--color-primary)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      info: 'var(--color-accent)'
    };
    
    return colors[type];
  };

  return (
    <DashboardCard variant="glass" {...props}>
      <div className={getInsightClasses()}>
        <div className="flex items-start space-x-3">
          <Icon name={icon} size={18} color={getIconColor()} className="mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            {title && (
              <p className="text-sm font-semibold text-text-primary mb-1">
                {title}
              </p>
            )}
            <p className="text-sm text-text-secondary leading-relaxed">
              {insight}
            </p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardCard;