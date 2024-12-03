import React from 'react';
import { X, Phone, Briefcase } from 'lucide-react';
import { MemberSidebarProps } from '../../types/member';
import MemberStatus from './MemberStatus';

export default function MemberSidebar({ isOpen, onClose, member }: MemberSidebarProps) {
  if (!member) return null;

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-80 bg-gray-900 text-white p-6 shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Member Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
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
            <MemberStatus status={member.status} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-300">
            <Briefcase className="w-5 h-5" />
            <span>{member.position}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Phone className="w-5 h-5" />
            <span>{member.phone}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Member Since</h4>
          <p className="text-gray-300">
            {new Date(member.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}