import React from 'react';
import { Shield } from 'lucide-react';
import BossInventoryGrid from '../components/boss-safe/BossInventoryGrid';
import BossActionForms from '../components/boss-safe/BossActionForms';

export default function BossSafe() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Boss Safe
        </h1>
        <p className="text-gray-400 mt-1">Manage and track special items</p>
      </div>

      <BossActionForms />

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Current Inventory</h2>
        <BossInventoryGrid />
      </div>
    </div>
  );
}