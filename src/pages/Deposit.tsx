import React from 'react';
import DepositForm from '../components/deposit/DepositForm';

export default function Deposit() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Deposit Item</h1>
        <p className="text-gray-400 mt-2">Record new item deposits from members</p>
      </div>
      
      <DepositForm />
    </div>
  );
}