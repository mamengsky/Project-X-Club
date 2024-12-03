import React, { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import MemberSidebar from '../components/members/MemberSidebar';
import MemberStatus from '../components/members/MemberStatus';
import AddMemberModal from '../components/members/AddMemberModal';
import { ClubMember } from '../types/member';
import { Users, UserPlus } from 'lucide-react';

export default function Members() {
  const { members, loading, error, addMember } = useMembers();
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-purple-400">Loading members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const handleMemberClick = (member: ClubMember) => {
    setSelectedMember(member);
    setSidebarOpen(true);
  };

  const handleMemberAdded = (newMember: ClubMember) => {
    addMember(newMember);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8" />
            Members
          </h1>
          <p className="text-gray-400 mt-2">Manage club members and their status</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => handleMemberClick(member)}
            className="bg-gray-900/50 p-4 rounded-xl border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-purple-400">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.position}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <MemberStatus status={member.status} />
              <span className="text-gray-400 text-sm">{member.phone}</span>
            </div>
          </div>
        ))}
      </div>

      <MemberSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        member={selectedMember}
      />

      <AddMemberModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onMemberAdded={handleMemberAdded}
      />
    </div>
  );
}