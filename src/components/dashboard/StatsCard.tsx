import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export default function StatsCard({ label, value, change, trend, icon }: StatsCardProps) {
  return (
    <div className="bg-gray-900/50 p-4 sm:p-6 rounded-xl border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
          {icon}
        </div>
        <p className="text-xs sm:text-sm text-gray-400">{label}</p>
      </div>
      <p className="text-base sm:text-lg font-bold text-white truncate">{value}</p>
      <div className="flex items-center mt-1">
        {trend === 'up' ? (
          <ArrowUpRight className="w-3 h-3 text-green-400" />
        ) : (
          <ArrowDownRight className="w-3 h-3 text-red-400" />
        )}
        <span className={`text-xs ml-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}