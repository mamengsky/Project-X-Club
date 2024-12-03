import React from 'react';
import { Badge } from 'lucide-react';

interface MemberStatusProps {
  status: 'active' | 'inactive' | 'vip';
}

const statusStyles = {
  active: 'bg-green-500/20 text-green-400',
  inactive: 'bg-gray-500/20 text-gray-400',
  vip: 'bg-purple-500/20 text-purple-400',
};

export default function MemberStatus({ status }: MemberStatusProps) {
  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusStyles[status]}`}>
      <Badge className="w-4 h-4" />
      <span className="text-sm capitalize">{status}</span>
    </div>
  );
}