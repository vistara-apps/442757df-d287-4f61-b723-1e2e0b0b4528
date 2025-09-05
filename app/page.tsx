'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Dashboard } from '@/components/features/Dashboard';
import { LegalScripts } from '@/components/features/LegalScripts';
import { EmergencyButton } from '@/components/features/EmergencyButton';
import { RightsCards } from '@/components/features/RightsCards';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { getCurrentLocation, detectStateFromCoordinates } from '@/lib/utils';

export default function Home() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userState, setUserState] = useState('California');
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Get user location on mount
  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const state = await detectStateFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        setUserState(state);
      } catch (error) {
        console.warn('Location access denied or failed:', error);
        setLocationError('Location access denied. Using default state.');
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleGetHelpClick = () => {
    setActiveTab('scripts');
  };

  const handleEmergencyActivated = () => {
    // Handle emergency activation - could trigger notifications, etc.
    console.log('Emergency mode activated');
  };

  const handleScriptGenerated = (script: string) => {
    // Handle when a legal script is generated
    console.log('Legal script generated:', script);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onGetHelpClick={handleGetHelpClick} />;
      case 'scripts':
        return (
          <LegalScripts
            userState={userState}
            onScriptGenerated={handleScriptGenerated}
          />
        );
      case 'emergency':
        return <EmergencyButton onEmergencyActivated={handleEmergencyActivated} />;
      case 'cards':
        return <RightsCards userState={userState} />;
      default:
        return <Dashboard onGetHelpClick={handleGetHelpClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <Header
        userState={userState}
        onStateChange={setUserState}
      />

      <main className="px-4 py-6 pb-20 max-w-md mx-auto">
        {locationError && (
          <AlertBanner
            variant="warning"
            message={locationError}
            onClose={() => setLocationError('')}
            className="mb-6"
          />
        )}

        {isLoadingLocation && (
          <div className="text-center py-4 mb-6">
            <div className="inline-flex items-center space-x-2 text-white text-opacity-80">
              <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm">Detecting your location...</span>
            </div>
          </div>
        )}

        {renderActiveTab()}
      </main>

      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
