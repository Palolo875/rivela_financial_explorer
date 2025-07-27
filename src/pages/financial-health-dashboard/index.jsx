import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernSidebar from '../../components/ui/ModernSidebar';
import ModernDashboardHeader from '../../components/ui/ModernDashboardHeader';
import DashboardCard from '../../components/ui/DashboardCard';
import ProgressRing from '../../components/ui/ProgressRing';
import TaskCard from '../../components/ui/TaskCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FinancialHealthDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    tasksCompleted: 43,
    projectsFinished: 2,
    weeklyProgress: 75,
    monthlyProgress: 102,
    goals: [
      { id: 1, text: 'Reduce expenses by 15%', completed: true },
      { id: 2, text: 'Increase savings rate', completed: false },
      { id: 3, text: 'Complete investment course', completed: true },
      { id: 4, text: 'Build emergency fund', completed: false }
    ],
    tasks: [
      {
        id: 1,
        title: 'Review monthly budget',
        description: 'Analyze spending patterns',
        dueDate: 'Today',
        priority: 'high',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Update investment portfolio',
        description: 'Rebalance asset allocation',
        dueDate: 'Tomorrow',
        priority: 'medium',
        status: 'in_progress'
      }
    ],
    projects: [
      {
        id: 1,
        title: 'Financial Analysis',
        status: 'In progress',
        progress: 65
      },
      {
        id: 2,
        title: 'Budget Optimization',
        status: 'Completed',
        progress: 100
      },
      {
        id: 3,
        title: 'Investment Strategy',
        status: 'In progress',
        progress: 30
      }
    ]
  });

  const handleCreateClick = () => {
    navigate('/financial-data-entry-dashboard');
  };

  const handleTaskComplete = (taskId) => {
    setDashboardData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    }));
  };

  const handleGoalToggle = (goalId) => {
    setDashboardData(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <ModernSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-60">
        {/* Header */}
        <ModernDashboardHeader 
          onCreateClick={handleCreateClick}
          onSearchClick={() => {}}
          onNotificationClick={() => {}}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Overall Information - Dark Card */}
            <DashboardCard
              title="Overall Information"
              variant="dark"
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {dashboardData.tasksCompleted}
                  </div>
                  <div className="text-gray-300">
                    Tasks done this year
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {dashboardData.projectsFinished}
                  </div>
                  <div className="text-gray-300">
                    projects are finished
                  </div>
                </div>
              </div>
            </DashboardCard>

            {/* Progress Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Progress */}
              <DashboardCard title="Weekly progress">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Simple line chart simulation */}
                    <div className="h-20 flex items-end space-x-1 mb-4">
                      {[30, 45, 60, 40, 70, 55, 75].map((height, index) => (
                        <div
                          key={index}
                          className="bg-blue-500 rounded-t flex-1"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sport • Study • Project
                    </div>
                  </div>
                  <div className="ml-6">
                    <ProgressRing progress={dashboardData.weeklyProgress} size={80} />
                  </div>
                </div>
              </DashboardCard>

              {/* Monthly Progress */}
              <DashboardCard title="Month progress">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {dashboardData.monthlyProgress}%
                    </div>
                    <div className="text-sm text-green-600 mb-4">
                      +20% compared to last month
                    </div>
                    <Button variant="outline" size="sm">
                      Download Report
                    </Button>
                  </div>
                  <div className="ml-6">
                    <ProgressRing 
                      progress={dashboardData.monthlyProgress} 
                      size={80}
                      color="#48BB78"
                    />
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Goals and Tasks Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Month Goals */}
              <DashboardCard title="Month goals:">
                <div className="space-y-3">
                  {dashboardData.goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-3">
                      <button
                        onClick={() => handleGoalToggle(goal.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          goal.completed
                            ? 'bg-green-500 border-green-500' :'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {goal.completed && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </button>
                      <span className={`${
                        goal.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Task in Process */}
              <DashboardCard title={`Task in process (${dashboardData.tasks.length})`}>
                <div className="space-y-3">
                  {dashboardData.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      dueDate={task.dueDate}
                      priority={task.priority}
                      status={task.status}
                      onComplete={() => handleTaskComplete(task.id)}
                    />
                  ))}
                  <Button variant="outline" className="w-full mt-3">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add task
                  </Button>
                </div>
              </DashboardCard>
            </div>

            {/* Last Projects */}
            <DashboardCard 
              title="Last Projects"
              action={
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by</span>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronDown" size={16} />
                  </Button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardData.projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-3"></div>
                    <h4 className="font-medium text-gray-900 mb-1">{project.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' :'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialHealthDashboard;