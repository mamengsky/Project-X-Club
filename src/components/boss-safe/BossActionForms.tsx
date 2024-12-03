import React from 'react';
import BossDepositForm from './BossDepositForm';
import BossWithdrawForm from './BossWithdrawForm';

export default function BossActionForms() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BossDepositForm />
      <BossWithdrawForm />
    </div>
  );
}