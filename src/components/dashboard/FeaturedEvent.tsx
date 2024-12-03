import React from 'react';
import EventSlideshow from './EventSlideshow';

export default function FeaturedEvent() {
  return (
    <div className="bg-gray-900/50 p-4 rounded-xl border border-purple-900/20 h-full">
      <h2 className="text-lg font-semibold text-white mb-3">Featured Events</h2>
      <div className="relative h-[calc(100%-3rem)] rounded-lg overflow-hidden">
        <EventSlideshow />
      </div>
    </div>
  );
}