import React from 'react';
import { Building2, ArrowUpDown } from 'lucide-react';
import { useOfficeMoney } from '../hooks/useOfficeMoney';
import MoneyStats from '../components/office-money/MoneyStats';
import TransactionList from '../components/office-money/TransactionList';

export default function OfficeMoney() {
  const { summary, loading, error } = useOfficeMoney();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-purple-400">Loading office money data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Building2 className="w-8 h-8" />
          Office Money
        </h1>
        <p className="text-gray-400 mt-2">Track all financial transactions</p>
      </div>

      <MoneyStats
        totalBalance={summary.total_balance}
        totalSales={summary.total_sales}
        totalPurchases={summary.total_purchases}
      />

      <div>
        <div className="flex items-center gap-2 mb-6">
          <ArrowUpDown className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        </div>
        <TransactionList transactions={summary.recent_transactions} />
      </div>
    </div>
  );
}