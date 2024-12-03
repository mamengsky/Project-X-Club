import React from 'react';
import PurchaseForm from '../components/purchases/PurchaseForm';

export default function Purchases() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Purchases</h1>
        <p className="text-gray-400 mt-2">Record purchase transactions</p>
      </div>
      
      <PurchaseForm />
    </div>
  );
}