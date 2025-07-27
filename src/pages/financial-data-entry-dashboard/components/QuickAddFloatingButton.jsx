import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAddFloatingButton = ({ onQuickAdd, activeTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickAddOptions = [
    {
      id: 'income',
      label: 'Revenus',
      icon: 'TrendingUp',
      color: 'success',
      tab: 0
    },
    {
      id: 'expense',
      label: 'Dépense fixe',
      icon: 'Home',
      color: 'error',
      tab: 1
    },
    {
      id: 'variable',
      label: 'Dépense variable',
      icon: 'Activity',
      color: 'warning',
      tab: 2
    },
    {
      id: 'debt',
      label: 'Dette',
      icon: 'CreditCard',
      color: 'error',
      tab: 3
    },
    {
      id: 'goal',
      label: 'Objectif',
      icon: 'Target',
      color: 'primary',
      tab: 4
    }
  ];

  const handleQuickAdd = (option) => {
    onQuickAdd(option.tab);
    setIsExpanded(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      success: 'bg-success hover:bg-success/90',
      error: 'bg-error hover:bg-error/90',
      warning: 'bg-warning hover:bg-warning/90',
      primary: 'bg-primary hover:bg-primary/90'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {quickAddOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <span className="text-sm font-medium text-foreground bg-surface px-3 py-2 rounded-lg shadow-lg border border-border/20">
                  {option.label}
                </span>
                <Button
                  size="icon"
                  className={`w-12 h-12 rounded-full shadow-lg ${getColorClasses(option.color)}`}
                  onClick={() => handleQuickAdd(option)}
                >
                  <Icon 
                    name={option.icon} 
                    size={20} 
                    color="white"
                  />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon 
            name="Plus" 
            size={24} 
            color="white"
          />
        </Button>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickAddFloatingButton;