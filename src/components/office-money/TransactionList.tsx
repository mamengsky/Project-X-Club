import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../../types/office-money';
import { formatNumber } from '../../utils/format';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-2 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2 custom-scrollbar">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-gray-900/50 p-3 sm:p-4 rounded-lg border border-purple-900/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded-full ${
              transaction.type === 'sale' 
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {transaction.type === 'sale' ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
            </div>
            <div>
              <p className="text-sm text-white font-medium truncate max-w-[200px] sm:max-w-[300px]">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(transaction.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <p className={`text-sm font-medium ${
            transaction.type === 'sale' ? 'text-green-400' : 'text-red-400'
          }`}>
            {transaction.type === 'sale' ? '+' : '-'} IDR {formatNumber(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}