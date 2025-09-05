'use client';

import { useState } from 'react';
import { ChevronRight, MapPin, BookOpen, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LEGAL_SCENARIOS } from '@/lib/constants';
import { LegalScenario } from '@/lib/types';

interface LegalScriptsProps {
  userState?: string;
}

export function LegalScripts({ userState = 'California' }: LegalScriptsProps) {
  const [selectedScenario, setSelectedScenario] = useState<LegalScenario | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleScenarioSelect = (scenario: LegalScenario) => {
    setSelectedScenario(scenario);
    setShowModal(true);
  };

  const handleShare = () => {
    if (selectedScenario) {
      const shareText = `Know Your Rights: ${selectedScenario.title}\n\nKey Rights:\n${selectedScenario.scripts.keyRights.join('\n')}\n\nFrom Pocket Justice App`;
      
      if (navigator.share) {
        navigator.share({
          title: `Know Your Rights: ${selectedScenario.title}`,
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Rights information copied to clipboard!');
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Legal Scripts</h2>
          <div className="flex items-center justify-center space-x-2 text-blue-200">
            <MapPin size={16} />
            <span className="text-sm">State: {userState}</span>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid gap-4">
          {LEGAL_SCENARIOS.map((scenario) => (
            <Card
              key={scenario.id}
              className="p-4 cursor-pointer"
              onClick={() => handleScenarioSelect(scenario)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{scenario.title}</h3>
                    <p className="text-sm text-blue-200">{scenario.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-blue-300" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Scenario Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedScenario?.title}
        variant="fullscreen"
      >
        {selectedScenario && (
          <div className="space-y-6">
            {/* What to Say */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-300 flex items-center">
                <BookOpen size={20} className="mr-2" />
                What to Say
              </h3>
              <div className="space-y-2">
                {selectedScenario.scripts.whatToSay.map((script, index) => (
                  <div key={index} className="p-3 bg-green-500 bg-opacity-20 rounded-lg border border-green-400">
                    <p className="text-green-100">"{script}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What NOT to Say */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-300 flex items-center">
                <BookOpen size={20} className="mr-2" />
                What NOT to Say/Do
              </h3>
              <div className="space-y-2">
                {selectedScenario.scripts.whatNotToSay.map((script, index) => (
                  <div key={index} className="p-3 bg-red-500 bg-opacity-20 rounded-lg border border-red-400">
                    <p className="text-red-100">• {script}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Rights */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-300 flex items-center">
                <BookOpen size={20} className="mr-2" />
                Your Key Rights
              </h3>
              <div className="space-y-2">
                {selectedScenario.scripts.keyRights.map((right, index) => (
                  <div key={index} className="p-3 bg-blue-500 bg-opacity-20 rounded-lg border border-blue-400">
                    <p className="text-blue-100">• {right}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={handleShare}
                className="flex-1 flex items-center justify-center"
              >
                <Share2 size={16} className="mr-2" />
                Share Rights
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Got It
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
