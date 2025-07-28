import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ModernDashboardHeader = ({ userName = "Dilan", onCreateClick, onSearchClick, onNotificationClick }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              color="#9CA3AF" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            className="p-2 relative hover:bg-gray-100 rounded-lg"
          >
            <Icon name="Bell" size={20} color="#6B7280" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">My account</div>
              <div className="text-xs text-gray-500">{userName}</div>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {userName.charAt(0)}
              </span>
            </div>
            <Icon name="ChevronDown" size={16} color="#6B7280" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernDashboardHeader;