import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TaskCard = ({ 
  title, 
  description, 
  dueDate, 
  priority = 'medium', 
  status = 'pending',
  onComplete,
  onEdit 
}) => {
  const priorityColors = {
    low: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-600 bg-red-50'
  };

  const statusIcons = {
    pending: 'Clock',
    completed: 'CheckCircle',
    in_progress: 'PlayCircle'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name={statusIcons[status]} size={16} />
          <span>{dueDate}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Icon name="Edit" size={16} />
            </Button>
          )}
          {onComplete && status !== 'completed' && (
            <Button variant="ghost" size="sm" onClick={onComplete}>
              <Icon name="Check" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;