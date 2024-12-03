import React from 'react';
import { Vault } from 'lucide-react';
import { ITEM_TYPES } from '../constants/items';
import ItemAvailability from '../components/member-safe/ItemAvailability';

export default function MemberSafe() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Vault className="w-8 h-8" />
          Item Availability
        </h1>
        <p className="text-gray-400 mt-2">Current inventory status for all items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ITEM_TYPES.map((itemType) => (
          <div key={itemType} className="bg-gray-900/50 p-4 rounded-xl border border-purple-900/20">
            <ItemAvailability itemType={itemType} />
          </div>
        ))}
      </div>
    </div>
  );
}