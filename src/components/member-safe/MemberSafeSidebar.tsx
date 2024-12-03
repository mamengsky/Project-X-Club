import React from 'react';
import { X } from 'lucide-react';
import { ITEM_TYPES } from '../../constants/items';
import ItemAvailability from './ItemAvailability';
import { ClubMember } from '../../types/member';

interface MemberSafeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  member: ClubMember | null;
}

export default function MemberSafeSidebar({ isOpen, onClose, member }: MemberSafeSidebarProps) {
  if (!member) return null;

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-96 bg-gray-900 text-white p-6 shadow-xl transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Member Safe</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
            {member.avatar_url ? (
              <img
                src={member.avatar_url}
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-purple-400">
                {member.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-sm">{member.position}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-400 uppercase">Available Items</h4>
        <div className="grid grid-cols-1 gap-4">
          {ITEM_TYPES.map((itemType) => (
            <ItemAvailability
              key={itemType}
              memberId={member.id}
              itemType={itemType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}