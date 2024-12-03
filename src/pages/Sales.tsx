import React from 'react';
import SalesForm from '../components/sales/SalesForm';

export default function Sales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Sales</h1>
        <p className="text-gray-400 mt-2">Record sales transactions</p>
      </div>
      
      <SalesForm />
    </div>
  );
}