'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, FileText, AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [currentLocation, setCurrentLocation] = useState<string>('Detecting...');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate location detection
    setTimeout(() => {
      setCurrentLocation('California, USA');
    }, 2000);
  }, []);

  const stats = [
    {
      icon: Shield,
      title: 'One Tap',
      subtitle: 'Emergency Recording',
      value: '56',
      unit: 'sec avg',
      color: 'text-green-300'
    },
    {
      icon: FileText,
      title: 'Legal Scenarios',
      subtitle: 'State-Specific Scripts',
      value: '2.47',
      unit: 'k+',
      color: 'text-blue-300'
    },
    {
      icon: Users,
      title: 'Legal Rights',
      subtitle: 'Know Your Rights',
      value: '123.3',
      unit: 'k+',
      color: 'text-purple-300'
    }
  ];

  const quickActions = [
    {
      icon: Shield,
      title: 'Get Help Now',
      description: 'Access legal scripts & emergency recording',
      action: () => onNavigate('scripts'),
      variant: 'primary' as const
    },
    {
      icon: Users,
      title: 'Trusted Contacts',
      description: 'Manage emergency contacts',
      action: () => onNavigate('contacts'),
      variant: 'secondary' as const
    },
    {
      icon: FileText,
      title: 'Rights Cards',
      description: 'Create & share legal rights',
      action: () => onNavigate('cards'),
      variant: 'secondary' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Pocket Justice</h1>
        <p className="text-blue-200 max-w-md mx-auto">
          Your rights, right in your pocket. Get instant access to legal scripts and emergency tools.
        </p>
        
        {/* Location & Status */}
        <div className="flex items-center justify-center space-x-4 text-sm text-blue-300">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{currentLocation}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>Updated {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="p-6 cursor-pointer"
            onClick={action.action}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-full">
                <action.icon size={24} className="text-blue-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{action.title}</h3>
                <p className="text-sm text-blue-200">{action.description}</p>
              </div>
              <div className="text-blue-300">
                →
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 text-center">
            <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
            <div className="space-y-1">
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-blue-300">{stat.unit}</span>
              </div>
              <h4 className="text-sm font-medium text-white">{stat.title}</h4>
              <p className="text-xs text-blue-300">{stat.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Notice */}
      <Card className="p-6 bg-red-500 bg-opacity-20 border-red-400">
        <div className="flex items-start space-x-3">
          <AlertTriangle size={20} className="text-red-300 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-200 mb-2">Emergency Reminder</h3>
            <p className="text-sm text-red-300">
              In a real emergency, call 911 first. This app is designed to help you know your rights and document interactions safely.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
