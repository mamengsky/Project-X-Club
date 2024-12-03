import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ITEM_TYPES } from '../../constants/items';
import { BOSS_ITEMS } from '../../constants/bossItems';
import { PurchaseItemType } from '../../types/purchase';
import { ClubMember } from '../../types/member';
import MemberSelect from '../deposit/MemberSelect';
import { usePurchaseForm } from '../../hooks/usePurchaseForm';

const ALL_ITEMS: PurchaseItemType[] = [...ITEM_TYPES, ...BOSS_ITEMS];

export default function PurchaseForm() {
  const { formData, setFormData, error, isSubmitting, handleSubmit } = usePurchaseForm();
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);

  const handleMemberSelect = (member: ClubMember) => {
    setSelectedMember(member);
    setFormData(prev => ({ ...prev, member_id: member.id }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 p-6 rounded-xl border border-purple-900/20">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Record Purchase
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">Member</label>
          <MemberSelect value={formData.member_id} onChange={handleMemberSelect} />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">Item Type</label>
          <select
            value={formData.item_type}
            onChange={(e) => setFormData(prev => ({ ...prev, item_type: e.target.value as PurchaseItemType }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          >
            <optgroup label="Regular Items">
              {ITEM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </optgroup>
            <optgroup label="Special Items">
              {BOSS_ITEMS.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
          <input
            type="number"
            min="0"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Total Price (IDR)</label>
          <input
            type="number"
            min="0"
            value={formData.total_price}
            onChange={(e) => setFormData(prev => ({ ...prev, total_price: parseInt(e.target.value) || 0 }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 h-20 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMember || isSubmitting}
          className="col-span-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {isSubmitting ? 'Recording...' : 'Record Purchase'}
        </button>
      </form>
    </div>
  );
}