'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Menu, Settings2, MapPin, Bell } from 'lucide-react';

interface HeaderProps {
  userState: string;
  onStateChange: (state: string) => void;
}

export function Header({ userState, onStateChange }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PJ</span>
          </div>
          <div>
            <h1 className="font-bold text-white">Pocket Justice</h1>
            <div className="flex items-center space-x-1 text-xs text-white text-opacity-70">
              <MapPin className="w-3 h-3" />
              <span>{userState}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="icon-only"
            size="sm"
            onClick={() => {/* Show notifications */}}
          >
            <Bell className="w-4 h-4" />
          </Button>

          <Button
            variant="icon-only"
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            <Settings2 className="w-4 h-4" />
          </Button>

          <Wallet>
            <ConnectWallet className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm">
              <Avatar className="w-6 h-6" />
              <Name className="text-white" />
            </ConnectWallet>
          </Wallet>
        </div>
      </header>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Current State
            </label>
            <select
              value={userState}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Illinois">Illinois</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Language
            </label>
            <select className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">Notifications</h3>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-500 bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-blue-400"
              />
              <span className="text-sm text-white">Emergency alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-500 bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-blue-400"
              />
              <span className="text-sm text-white">Legal updates</span>
            </label>
          </div>

          <Button
            variant="primary"
            onClick={() => setShowSettings(false)}
            className="w-full"
          >
            Save Settings
          </Button>
        </div>
      </Modal>
    </>
  );
}
