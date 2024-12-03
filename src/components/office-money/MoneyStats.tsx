import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatNumber } from '../../utils/format';

interface MoneyStatsProps {
  totalBalance: number;
  totalSales: number;
  totalPurchases: number;
}

export default function MoneyStats({ totalBalance, totalSales, totalPurchases }: MoneyStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Wallet className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Total Balance</h3>
        </div>
        <p className="text-3xl font-bold text-white">
          IDR {formatNumber(totalBalance)}
        </p>
      </div>

      <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Total Sales</h3>
        </div>
        <p className="text-3xl font-bold text-green-400">
          IDR {formatNumber(totalSales)}
        </p>
      </div>

      <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-900/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Total Purchases</h3>
        </div>
        <p className="text-3xl font-bold text-red-400">
          IDR {formatNumber(totalPurchases)}
        </p>
      </div>
    </div>
  );
}