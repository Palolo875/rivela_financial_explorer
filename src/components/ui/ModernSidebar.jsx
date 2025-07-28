import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ModernSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationSections = [
    {
      title: '',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          path: '/financial-health-dashboard',
          icon: 'LayoutDashboard'
        },
        {
          id: 'calendar',
          label: 'Calendar',
          path: '/financial-question-input',
          icon: 'Calendar'
        },
        {
          id: 'tasks',
          label: 'My Tasks',
          path: '/financial-data-entry-dashboard',
          icon: 'CheckSquare'
        },
        {
          id: 'statistics',
          label: 'Statistics',
          path: '/personalized-financial-equation-visualization',
          icon: 'BarChart3'
        },
        {
          id: 'documents',
          label: 'Documents',
          path: '/neuroscience-insights-library',
          icon: 'FileText'
        }
      ]
    },
    {
      title: 'INTEGRATIONS',
      items: [
        {
          id: 'scenarios',
          label: 'Scenarios',
          path: '/interactive-scenario-simulator',
          icon: 'Zap'
        },
        {
          id: 'insights',
          label: 'Insights',
          path: '/neuroscience-insights-library',
          icon: 'Brain'
        },
        {
          id: 'add-plugin',
          label: 'Add new plugin',
          path: '#',
          icon: 'Plus'
        }
      ]
    },
    {
      title: 'TEAMS',
      items: [
        {
          id: 'analysis',
          label: 'Analysis',
          path: '/personalized-financial-equation-visualization',
          icon: 'TrendingUp'
        },
        {
          id: 'reports',
          label: 'Reports',
          path: '/financial-health-dashboard',
          icon: 'FileBarChart'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`
      fixed left-0 top-0 h-full bg-gray-900 z-40 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-60'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={18} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">Rivela</span>
                <span className="text-xs text-gray-400">Financial Explorer</span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="px-3 mb-6">
              {section.title && !isCollapsed && (
                <h3 className="mb-3 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                        ${isCollapsed ? 'justify-center' : 'justify-start'}
                      `}
                      title={isCollapsed ? item.label : ''}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        color={isActive ? '#ffffff' : 'currentColor'} 
                      />
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={() => handleNavigation('/settings')}
            className={`
              w-full flex items-center px-3 py-3 text-sm font-medium text-gray-300 rounded-lg
              hover:bg-gray-800 hover:text-white transition-all duration-200
              ${isCollapsed ? 'justify-center' : 'justify-start'}
            `}
            title={isCollapsed ? 'Settings' : ''}
          >
            <Icon name="Settings" size={20} />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ModernSidebar;