'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, FileText, Users, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onGetHelpClick: () => void;
}

export function Dashboard({ onGetHelpClick }: DashboardProps) {
  const stats = [
    {
      icon: Shield,
      title: 'One Tap',
      subtitle: 'Emergency Recording',
      value: '56',
      unit: 'sec avg',
      description: 'Latest discreet recording activation time'
    },
    {
      icon: FileText,
      title: 'Legal Scenarios',
      subtitle: 'State-Specific Scripts',
      value: '2.47',
      unit: 'min',
      description: 'Average time to find relevant legal guidance'
    },
    {
      icon: Users,
      title: 'Legal Rights',
      subtitle: 'Community Shares',
      value: '123.3',
      unit: 'K+',
      description: 'Cards shared this month across all users'
    }
  ];

  const quickActions = [
    {
      title: 'Know Your Rights',
      description: 'State-specific legal guidance',
      icon: '⚖️',
      action: () => onGetHelpClick()
    },
    {
      title: 'Traffic Stop',
      description: 'What to do when pulled over',
      icon: '🚗',
      action: () => onGetHelpClick()
    },
    {
      title: 'Police Questions',
      description: 'How to respond to questioning',
      icon: '❓',
      action: () => onGetHelpClick()
    },
    {
      title: 'Search Rights',
      description: 'Understanding search and seizure',
      icon: '🔍',
      action: () => onGetHelpClick()
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Pocket Justice</h1>
        </div>
        
        <p className="text-lg text-white text-opacity-90 max-w-md mx-auto">
          Your essential legal rights and emergency response tools, right in your pocket.
        </p>

        <div className="flex justify-center space-x-4 mt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={onGetHelpClick}
            className="px-8"
          >
            Get Help Now
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {/* Open emergency contacts */}}
          >
            Emergency Contacts
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="feature-icon">
                <stat.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-white text-opacity-70">{stat.unit}</span>
                </div>
                <h3 className="font-semibold text-white">{stat.title}</h3>
                <p className="text-sm text-white text-opacity-70">{stat.subtitle}</p>
              </div>
            </div>
            
            <p className="text-xs text-white text-opacity-60 mt-3">
              {stat.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              onClick={action.action}
              className="p-4 cursor-pointer hover:scale-105"
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">{action.icon}</div>
                <h3 className="font-medium text-white text-sm">{action.title}</h3>
                <p className="text-xs text-white text-opacity-70">{action.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart Visualization */}
      <Card className="p-6">
        <h3 className="font-semibold text-white mb-4">Usage Trends</h3>
        <div className="flex items-end justify-between h-32 space-x-2">
          {[40, 65, 45, 80, 95, 70, 85].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-sm opacity-80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-white text-opacity-60 mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </Card>
    </div>
  );
}
