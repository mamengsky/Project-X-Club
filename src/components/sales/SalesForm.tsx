import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SaleItemType } from '../../types/sales';
import { ClubMember } from '../../types/member';
import MemberSelect from '../deposit/MemberSelect';
import { useSalesForm } from '../../hooks/useSalesForm';
import { formatNumber } from '../../utils/format';

const SALE_ITEMS: SaleItemType[] = ['Bibit Micin', 'Bibit Kecubung'];

export default function SalesForm() {
  const { formData, setFormData, error, isSubmitting, handleSubmit, updateTotalPrice } = useSalesForm();
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);

  const handleMemberSelect = (member: ClubMember) => {
    setSelectedMember(member);
    setFormData(prev => ({ ...prev, member_id: member.id }));
  };

  const handleItemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemType = e.target.value as SaleItemType;
    setFormData(prev => ({ ...prev, item_type: newItemType }));
    updateTotalPrice(formData.quantity, newItemType);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 p-6 rounded-xl border border-purple-900/20">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        Record Sale
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
          <label className="block text-sm font-medium text-gray-400 mb-1">Buyer Name</label>
          <input
            type="text"
            value={formData.buyer_name}
            onChange={(e) => setFormData(prev => ({ ...prev, buyer_name: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Item Type</label>
          <select
            value={formData.item_type}
            onChange={handleItemTypeChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          >
            {SALE_ITEMS.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
          <input
            type="number"
            min="0"
            value={formData.quantity}
            onChange={(e) => {
              const quantity = parseInt(e.target.value) || 0;
              updateTotalPrice(quantity, formData.item_type);
            }}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Unit Price (IDR)</label>
          <input
            type="text"
            value={formatNumber(formData.unit_price)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Total Price (IDR)</label>
          <input
            type="text"
            value={formatNumber(formData.total_price)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            disabled
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
          {isSubmitting ? 'Recording...' : 'Record Sale'}
        </button>
      </form>
    </div>
  );
}