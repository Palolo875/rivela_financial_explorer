import React from 'react';
import Icon from '../AppIcon';

const DashboardCard = ({ 
  title, 
  children, 
  className = '', 
  variant = 'white', // 'white' or 'dark'
  action,
  subtitle,
  icon
}) => {
  const baseClasses = `rounded-xl p-6 transition-all duration-200`;
  const variantClasses = {
    white: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    dark: 'bg-gray-800 text-white shadow-lg'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Header */}
      {(title || action || icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className={`p-2 rounded-lg ${
                variant === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Icon name={icon} size={20} color={variant === 'dark' ? '#FFFFFF' : '#374151'} />
              </div>
            )}
            <div>
              {title && (
                <h3 className={`font-semibold ${
                  variant === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-sm ${
                  variant === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && action}
        </div>
      )}
      
      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;