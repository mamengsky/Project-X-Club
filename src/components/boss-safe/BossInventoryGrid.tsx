import React from 'react';
import { BOSS_ITEMS } from '../../constants/bossItems';
import BossItemCard from './BossItemCard';

export default function BossInventoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {BOSS_ITEMS.map((itemType) => (
        <BossItemCard key={itemType} itemType={itemType} />
      ))}
    </div>
  );
}