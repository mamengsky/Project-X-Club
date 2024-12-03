import React from 'react';
import { Package } from 'lucide-react';
import { useBossItemAvailability } from '../../hooks/useBossItemAvailability';
import { formatNumber } from '../../utils/format';

interface BossItemCardProps {
  itemType: string;
}

export default function BossItemCard({ itemType }: BossItemCardProps) {
  const { quantity, loading, error } = useBossItemAvailability(itemType);

  if (loading) {
    return (
      <div className="bg-gray-900/50 p-3 rounded-lg border border-purple-900/20 animate-pulse">
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400 text-sm truncate">{itemType}</span>
        </div>
        <div className="h-6 bg-gray-800 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900/50 p-3 rounded-lg border border-red-500/20">
        <span className="text-red-400 text-sm">Failed to load</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 p-3 rounded-lg border border-purple-900/20 hover:border-purple-500/50 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4 text-purple-400" />
        <span className="text-gray-400 text-sm truncate">{itemType}</span>
      </div>
      <p className="text-lg font-bold text-white">
        {formatNumber(quantity)}
      </p>
    </div>
  );
}