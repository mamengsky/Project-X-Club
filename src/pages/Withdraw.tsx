import React from 'react';
import WithdrawForm from '../components/withdraw/WithdrawForm';

export default function Withdraw() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Withdraw Item</h1>
        <p className="text-gray-400 mt-2">Record item withdrawals from members</p>
      </div>
      
      <WithdrawForm />
    </div>
  );
}