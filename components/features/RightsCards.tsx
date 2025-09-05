'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { AlertBanner } from '@/components/ui/AlertBanner';
import { generateShareableCard } from '@/lib/openai';
import { RightsCard } from '@/lib/types';
import { Share2, Plus, Download, Copy } from 'lucide-react';

interface RightsCardsProps {
  userState: string;
}

export function RightsCards({ userState }: RightsCardsProps) {
  const [cards, setCards] = useState<RightsCard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardContent, setNewCardContent] = useState('');
  const [generatedCard, setGeneratedCard] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateCard = async () => {
    if (!newCardTitle.trim() || !newCardContent.trim()) return;

    setIsGenerating(true);
    try {
      const shareableContent = await generateShareableCard(
        newCardTitle,
        newCardContent,
        userState
      );
      setGeneratedCard(shareableContent);
    } catch (error) {
      console.error('Failed to generate shareable card:', error);
      setGeneratedCard(`📋 ${newCardTitle}\n\n${newCardContent}\n\n#KnowYourRights #${userState.replace(' ', '')}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveCard = () => {
    const newCard: RightsCard = {
      id: Date.now().toString(),
      title: newCardTitle,
      content: generatedCard,
      state: userState,
      category: 'custom',
      createdAt: new Date().toISOString()
    };

    setCards([...cards, newCard]);
    setShowCreateModal(false);
    setNewCardTitle('');
    setNewCardContent('');
    setGeneratedCard('');
  };

  const shareCard = async (card: RightsCard) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: card.content
        });
      } else {
        await navigator.clipboard.writeText(card.content);
        // Show success message
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Show success message
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Rights Cards</h2>
          <p className="text-white text-opacity-80">Create and share your legal rights</p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Card</span>
        </Button>
      </div>

      {cards.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-white mb-2">No Rights Cards Yet</h3>
          <p className="text-white text-opacity-70 mb-4">
            Create your first shareable rights card to educate others about legal rights.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Card
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <Card key={card.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="text-sm text-white text-opacity-70">
                    {card.state} • {new Date(card.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="icon-only"
                    size="sm"
                    onClick={() => shareCard(card)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="icon-only"
                    size="sm"
                    onClick={() => copyToClipboard(card.content)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-white text-opacity-90 whitespace-pre-wrap">
                {card.content.length > 200 
                  ? `${card.content.substring(0, 200)}...`
                  : card.content
                }
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Card Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Rights Card"
        className="max-w-lg"
      >
        <div className="space-y-4">
          <Input
            label="Card Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="e.g., Traffic Stop Rights"
          />
          
          <Input
            label="Content"
            variant="textarea"
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            placeholder="Enter the key rights and information you want to share..."
            rows={4}
          />

          {generatedCard && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white">
                Generated Shareable Card:
              </label>
              <div className="p-4 bg-black bg-opacity-30 rounded-lg text-sm text-white whitespace-pre-wrap">
                {generatedCard}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            {!generatedCard ? (
              <Button
                variant="primary"
                onClick={handleCreateCard}
                loading={isGenerating}
                disabled={!newCardTitle.trim() || !newCardContent.trim()}
                className="flex-1"
              >
                Generate Card
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setGeneratedCard('')}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  onClick={saveCard}
                  className="flex-1"
                >
                  Save Card
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
