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
    // Financial Cards Data
    cards: [
      {
        id: 1,
        balance: 15780.0,
        cardNumber: "•••• 1510",
        expiryDate: "10/24",
        type: "VISA",
        variant: "dark"
      },
      {
        id: 2,
        balance: 123424.0,
        cardNumber: "•••• 4423",
        expiryDate: "10/24",
        type: "MASTERCARD",
        variant: "light"
      }
    ],
    // Statistics
    totalBalance: 14810.0,
    monthlySpending: [
      { name: "Spotify", amount: -315, icon: "Music", color: "bg-green-500" },
      { name: "Apple", amount: -525, icon: "Smartphone", color: "bg-blue-500" },
      { name: "Bitcoin", amount: -1235, icon: "CircleDollarSign", color: "bg-orange-500" },
      { name: "Apple", amount: -2425, icon: "Smartphone", color: "bg-blue-500" },
      { name: "Binance", amount: -1405, icon: "TrendingUp", color: "bg-yellow-500" }
    ],
    // Recent Sales
    recentSales: [
      {
        id: 1,
        name: "James Smith",
        date: "May 16, 2023",
        amount: -1980.0,
        status: "Success",
        avatar: "JS"
      },
      {
        id: 2,
        name: "George Holster",
        date: "May 15, 2023",
        amount: -880.0,
        status: "Process",
        avatar: "GH"
      },
      {
        id: 3,
        name: "Daniela Gordienko",
        date: "May 21, 2023",
        amount: -1260.0,
        status: "Failed",
        avatar: "DG"
      }
    ],
    // Quick Actions
    quickActions: [
      { name: "Transfer", icon: "ArrowRightLeft", color: "bg-blue-100 text-blue-700" },
      { name: "Utility", icon: "Zap", color: "bg-gray-100 text-gray-700" },
      { name: "Taxes", icon: "Home", color: "bg-gray-100 text-gray-700" },
      { name: "Transport", icon: "Car", color: "bg-gray-100 text-gray-700" }
    ]
  });

  const handleCreateClick = () => {
    navigate('/financial-data-entry-dashboard');
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
            
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">👋</span>
                <h1 className="text-2xl font-bold text-gray-900">Greetings!</h1>
              </div>
              <p className="text-gray-600">Start your day with RIVELA</p>
            </div>

            {/* Cards and Statistics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cards Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Cards</h2>
                  <button className="text-blue-600 text-sm hover:text-blue-700">See all</button>
                </div>
                <div className="space-y-4">
                  {dashboardData.cards.map((card) => (
                    <div key={card.id} className={`
                      p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl
                      ${card.variant === 'dark' 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 shadow-md'
                      }
                    `}>
                      {/* Card Balance */}
                      <div className="mb-4">
                        <div className="text-2xl font-bold">
                          $ {card.balance.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Card Details */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-sm ${card.variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {card.cardNumber}
                          </div>
                          <div className={`text-xs ${card.variant === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {card.expiryDate}
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${card.variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                          {card.type}
                        </div>
                      </div>

                      {/* Card Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    {dashboardData.quickActions.map((action, index) => (
                      <button key={index} className={`
                        flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent
                        hover:border-blue-200 hover:scale-105 transition-all duration-200 ${action.color}
                      `}>
                        <Icon name={action.icon} size={20} />
                        <span className="text-sm font-medium mt-2">{action.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Statistic</h2>
                  <button className="text-blue-600 text-sm hover:text-blue-700">This week</button>
                </div>
                
                {/* Balance Overview */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ${dashboardData.totalBalance.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Total Balance</div>
                    </div>
                    <div className="w-24 h-24">
                      <ProgressRing 
                        progress={75} 
                        size={96}
                        strokeWidth={8}
                        color="#3B82F6"
                      />
                    </div>
                  </div>
                </div>

                {/* Spending Breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Spending</h3>
                  <div className="space-y-3">
                    {dashboardData.monthlySpending.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                            <Icon name={item.icon} size={16} color="white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">Subscription</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${Math.abs(item.amount)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>Sender</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Amount</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {dashboardData.recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">{sale.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{sale.name}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">{sale.date}</div>
                    
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        sale.status === 'Success' ? 'bg-green-100 text-green-700' :
                        sale.status === 'Process' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {sale.status}
                      </span>
                    </div>
                    
                    <div className="font-semibold text-gray-900">
                      ${Math.abs(sale.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialHealthDashboard;