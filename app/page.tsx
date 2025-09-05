'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Home, Shield, Users, FileText, Menu, X } from 'lucide-react';

// Components
import { Dashboard } from '@/components/features/Dashboard';
import { LegalScripts } from '@/components/features/LegalScripts';
import { TrustedContacts } from '@/components/features/TrustedContacts';
import { RightsCards } from '@/components/features/RightsCards';
import { EmergencyButton } from '@/components/features/EmergencyButton';
import { Button } from '@/components/ui/Button';
import { TrustedContact } from '@/lib/types';

export default function PocketJusticePage() {
  const { setFrameReady } = useMiniKit();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([]);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const navigation = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'scripts', label: 'Legal Scripts', icon: Shield },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'cards', label: 'Rights Cards', icon: FileText },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'scripts':
        return <LegalScripts userState="California" />;
      case 'contacts':
        return (
          <TrustedContacts
            contacts={trustedContacts}
            onContactsChange={setTrustedContacts}
          />
        );
      case 'cards':
        return <RightsCards />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Shield size={24} className="text-blue-300" />
              <span className="font-bold text-white">Pocket Justice</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-blue-200 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button & Wallet */}
            <div className="flex items-center space-x-2">
              <Wallet>
                <ConnectWallet>
                  <Name />
                </ConnectWallet>
              </Wallet>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pt-4 border-t border-white border-opacity-10">
              <div className="grid grid-cols-2 gap-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'text-blue-200 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {renderActiveSection()}
      </main>

      {/* Emergency Button */}
      <EmergencyButton
        onEmergencyActivated={() => setEmergencyActive(true)}
      />

      {/* Emergency Status Banner */}
      {emergencyActive && (
        <div className="fixed top-20 left-4 right-4 z-40 max-w-md mx-auto">
          <div className="bg-red-500 bg-opacity-90 backdrop-blur-sm border border-red-400 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-200 rounded-full animate-pulse"></div>
              <span className="text-red-100 text-sm font-medium">Emergency mode active</span>
            </div>
            <button
              onClick={() => setEmergencyActive(false)}
              className="text-red-200 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-black bg-opacity-30 backdrop-blur-md border-t border-white border-opacity-10 md:hidden">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-300'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
