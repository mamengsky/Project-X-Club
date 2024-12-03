import React from 'react';
import { useMembers } from '../../hooks/useMembers';
import { ClubMember } from '../../types/member';
import { Users } from 'lucide-react';

interface MemberSelectProps {
  value: string;
  onChange: (member: ClubMember) => void;
}

export default function MemberSelect({ value, onChange }: MemberSelectProps) {
  const { members, loading, error } = useMembers();

  if (loading) {
    return (
      <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-400">
        Loading members...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400">
        Error loading members
      </div>
    );
  }

  return (
    <div className="relative">
      <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => {
          const member = members.find(m => m.id === e.target.value);
          if (member) onChange(member);
        }}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500 appearance-none"
      >
        <option value="">Select a member</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} - {member.position}
          </option>
        ))}
      </select>
    </div>
  );
}