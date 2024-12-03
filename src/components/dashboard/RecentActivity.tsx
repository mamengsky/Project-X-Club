import React from 'react';
import { Clock } from 'lucide-react';
import { Transaction } from '../../types/office-money';
import TransactionList from '../office-money/TransactionList';

interface RecentActivityProps {
  transactions: Transaction[];
}

export default function RecentActivity({ transactions }: RecentActivityProps) {
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="bg-gray-900/50 p-4 sm:p-6 rounded-xl border border-purple-900/20 h-full">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        <h2 className="text-base sm:text-lg font-semibold text-white">Latest Activity</h2>
      </div>
      <div className="h-[calc(100%-3rem)] overflow-hidden">
        <TransactionList transactions={recentTransactions} />
      </div>
    </div>
  );
}