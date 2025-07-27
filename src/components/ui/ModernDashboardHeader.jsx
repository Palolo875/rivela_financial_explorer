import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ModernDashboardHeader = ({ userName = "Dilan", onCreateClick, onSearchClick, onNotificationClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hi, {userName}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back to your financial dashboard
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearchClick}
            className="p-2"
          >
            <Icon name="Search" size={20} color="#6B7280" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            className="p-2 relative"
          >
            <Icon name="Bell" size={20} color="#6B7280" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>

          {/* Create Button */}
          <Button
            variant="default"
            onClick={onCreateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Create
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ModernDashboardHeader;