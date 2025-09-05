'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { LEGAL_SCENARIOS, SAMPLE_LEGAL_CONTENT } from '@/lib/constants';
import { generateLegalScript } from '@/lib/openai';
import { LegalScenario } from '@/lib/types';
import { MapPin, Clock, Share2, BookOpen } from 'lucide-react';

interface LegalScriptsProps {
  userState: string;
  onScriptGenerated: (script: string) => void;
}

export function LegalScripts({ userState, onScriptGenerated }: LegalScriptsProps) {
  const [selectedScenario, setSelectedScenario] = useState<LegalScenario | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  const handleScenarioSelect = async (scenarioId: LegalScenario) => {
    setSelectedScenario(scenarioId);
    setIsGenerating(true);
    setError('');

    try {
      const scenario = LEGAL_SCENARIOS.find(s => s.id === scenarioId);
      if (!scenario) throw new Error('Scenario not found');

      // Try to generate with AI, fallback to sample content
      let script = '';
      try {
        script = await generateLegalScript(scenario.title, userState);
      } catch (aiError) {
        console.warn('AI generation failed, using sample content:', aiError);
        script = SAMPLE_LEGAL_CONTENT[scenarioId]?.script || 'Script not available for this scenario.';
      }

      setGeneratedScript(script);
      onScriptGenerated(script);
    } catch (err) {
      setError('Failed to load legal script. Please try again.');
      console.error('Script generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareScript = async () => {
    if (!generatedScript) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Legal Rights Script',
          text: generatedScript
        });
      } else {
        await navigator.clipboard.writeText(generatedScript);
        // Show success message
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  if (selectedScenario && generatedScript) {
    const scenario = LEGAL_SCENARIOS.find(s => s.id === selectedScenario);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedScenario(null);
              setGeneratedScript('');
            }}
          >
            ← Back to Scenarios
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-white text-opacity-80">
            <MapPin className="w-4 h-4" />
            <span>{userState}</span>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl">{scenario?.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-white">{scenario?.title}</h3>
              <p className="text-sm text-white text-opacity-70">State-specific guidance for {userState}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-white text-opacity-90 leading-relaxed">
              {generatedScript}
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="primary"
              onClick={shareScript}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Script</span>
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => {/* Save to favorites */}}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Save</span>
            </Button>
          </div>
        </Card>

        <AlertBanner
          variant="info"
          title="Important Disclaimer"
          message="This information is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and situation."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Legal Scripts</h2>
        <p className="text-white text-opacity-80">
          Get state-specific guidance for common legal situations
        </p>
        <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-white text-opacity-70">
          <MapPin className="w-4 h-4" />
          <span>Currently showing scripts for {userState}</span>
        </div>
      </div>

      {error && (
        <AlertBanner
          variant="error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      <div className="grid gap-4">
        {LEGAL_SCENARIOS.map((scenario) => (
          <Card
            key={scenario.id}
            onClick={() => handleScenarioSelect(scenario.id)}
            className="p-4 cursor-pointer hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{scenario.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{scenario.title}</h3>
                <p className="text-sm text-white text-opacity-70">{scenario.description}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                scenario.urgency === 'high' 
                  ? 'bg-red-500 bg-opacity-20 text-red-300'
                  : scenario.urgency === 'medium'
                  ? 'bg-yellow-500 bg-opacity-20 text-yellow-300'
                  : 'bg-green-500 bg-opacity-20 text-green-300'
              }`}>
                {scenario.urgency}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isGenerating && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-white text-opacity-80">
            <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
            <span>Generating personalized legal script...</span>
          </div>
        </div>
      )}
    </div>
  );
}
