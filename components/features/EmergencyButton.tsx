'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { Phone, Video, AlertTriangle } from 'lucide-react';

interface EmergencyButtonProps {
  onEmergencyActivated: () => void;
}

export function EmergencyButton({ onEmergencyActivated }: EmergencyButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleEmergencyActivation = async () => {
    setIsActivating(true);
    
    try {
      // Start recording (mock implementation)
      setIsRecording(true);
      
      // Send alert to trusted contacts (mock implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlertSent(true);
      
      // Notify parent component
      onEmergencyActivated();
      
    } catch (error) {
      console.error('Emergency activation failed:', error);
    } finally {
      setIsActivating(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAlertSent(false);
  };

  if (isRecording) {
    return (
      <div className="space-y-4">
        <AlertBanner
          variant="error"
          title="Emergency Mode Active"
          message="Recording in progress. Trusted contacts have been notified."
        />
        
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2 text-red-300">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Recording</span>
          </div>
          
          <Button
            variant="secondary"
            onClick={stopRecording}
            className="bg-red-500 bg-opacity-20 hover:bg-opacity-30"
          >
            Stop Recording
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Emergency Actions</h3>
        <p className="text-sm text-white text-opacity-80 mb-6">
          Tap to start discreet recording and alert your trusted contacts
        </p>
      </div>

      <Button
        variant="danger"
        size="lg"
        onClick={handleEmergencyActivation}
        loading={isActivating}
        className="w-full py-6 text-lg font-bold"
      >
        <AlertTriangle className="w-6 h-6 mr-3" />
        Record & Alert Now
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={() => {/* Mock call emergency contact */}}
          className="flex items-center justify-center space-x-2"
        >
          <Phone className="w-5 h-5" />
          <span>Call Contact</span>
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => {/* Mock video recording */}}
          className="flex items-center justify-center space-x-2"
        >
          <Video className="w-5 h-5" />
          <span>Video Only</span>
        </Button>
      </div>

      {alertSent && (
        <AlertBanner
          variant="success"
          message="Emergency alert sent to your trusted contacts successfully."
        />
      )}
    </div>
  );
}
