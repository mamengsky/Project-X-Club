import React from 'react';
import { Package } from 'lucide-react';
import { useItemAvailability } from '../../hooks/useItemAvailability';
import { formatNumber } from '../../utils/format';

interface ItemAvailabilityProps {
  itemType: string;
}

export default function ItemAvailability({ itemType }: ItemAvailabilityProps) {
  const { quantity, loading, error } = useItemAvailability(itemType);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-4 h-4 text-purple-400" />
          <span className="text-gray-400 text-sm">{itemType}</span>
        </div>
        <div className="h-6 bg-gray-800 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm">
        Failed to load availability
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4 text-purple-400" />
        <span className="text-gray-400 text-sm">{itemType}</span>
      </div>
      <p className="text-lg font-bold text-white">
        {formatNumber(quantity)}
      </p>
    </div>
  );
}