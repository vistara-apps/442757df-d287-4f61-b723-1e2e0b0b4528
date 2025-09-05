'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { AlertBanner } from '@/components/ui/AlertBanner';

interface EmergencyButtonProps {
  onEmergencyActivated: () => void;
}

export function EmergencyButton({ onEmergencyActivated }: EmergencyButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video'>('audio');

  const handleEmergencyStart = () => {
    setShowModal(true);
  };

  const handleStartRecording = async (type: 'audio' | 'video') => {
    setRecordingType(type);
    setIsRecording(true);
    
    // Simulate recording start
    try {
      // In a real app, this would start actual recording
      console.log(`Starting ${type} recording...`);
      
      // Send emergency alert
      await sendEmergencyAlert();
      setAlertSent(true);
      onEmergencyActivated();
      
    } catch (error) {
      console.error('Failed to start emergency recording:', error);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setShowModal(false);
    console.log('Recording stopped and saved');
  };

  const sendEmergencyAlert = async () => {
    // Simulate sending alert to trusted contacts
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Emergency alert sent to trusted contacts');
        resolve(true);
      }, 1000);
    });
  };

  return (
    <>
      {/* Emergency Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="danger"
          size="lg"
          onClick={handleEmergencyStart}
          className={`rounded-full w-16 h-16 p-0 shadow-2xl ${isRecording ? 'animate-pulse' : ''}`}
        >
          <AlertTriangle size={24} />
        </Button>
      </div>

      {/* Emergency Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Emergency Recording & Alert"
      >
        <div className="space-y-6">
          {alertSent && (
            <AlertBanner
              variant="success"
              message="Emergency alert sent to your trusted contacts!"
            />
          )}

          {!isRecording ? (
            <div className="space-y-4">
              <p className="text-white text-center mb-6">
                Choose recording type and we'll immediately alert your trusted contacts:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className="p-4 text-center cursor-pointer"
                  onClick={() => handleStartRecording('audio')}
                >
                  <Mic size={32} className="mx-auto mb-2 text-blue-300" />
                  <p className="text-sm font-medium">Audio Only</p>
                  <p className="text-xs text-gray-300 mt-1">Discreet recording</p>
                </Card>
                
                <Card 
                  className="p-4 text-center cursor-pointer"
                  onClick={() => handleStartRecording('video')}
                >
                  <Video size={32} className="mx-auto mb-2 text-blue-300" />
                  <p className="text-sm font-medium">Video</p>
                  <p className="text-xs text-gray-300 mt-1">Full documentation</p>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-400">
                <p className="text-yellow-100 text-sm">
                  <strong>Important:</strong> Recording laws vary by state. Ensure you understand your local laws regarding recording interactions.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-white font-medium">
                  Recording {recordingType}...
                </p>
              </div>
              
              <div className="text-6xl animate-pulse">
                {recordingType === 'audio' ? <Mic /> : <Video />}
              </div>
              
              <Button
                variant="secondary"
                onClick={handleStopRecording}
                className="w-full"
              >
                Stop Recording & Save
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
