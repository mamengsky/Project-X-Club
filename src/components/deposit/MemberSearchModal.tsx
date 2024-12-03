import React, { useState, useEffect } from 'react';
import { X, Search, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ClubMember } from '../../types/member';
import MemberStatus from '../members/MemberStatus';

interface MemberSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (member: ClubMember) => void;
}

export default function MemberSearchModal({ isOpen, onClose, onSelect }: MemberSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && searchQuery.length >= 2) {
      const searchMembers = async () => {
        setLoading(true);
        setError(null);

        try {
          const { data, error: supabaseError } = await supabase
            .from('members')
            .select('*')
            .ilike('name', `%${searchQuery}%`)
            .order('name');

          if (supabaseError) throw supabaseError;
          setMembers(data || []);
        } catch (err) {
          setError('Failed to search members');
          setMembers([]);
        } finally {
          setLoading(false);
        }
      };

      searchMembers();
    }
  }, [searchQuery, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Search Members</h2>

        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 text-purple-400 animate-spin" />
            </div>
          ) : members.length > 0 ? (
            members.map((member) => (
              <button
                key={member.id}
                onClick={() => onSelect(member)}
                className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-purple-400">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{member.position}</span>
                      <MemberStatus status={member.status} />
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : searchQuery.length >= 2 ? (
            <p className="text-center text-gray-400 py-8">No members found</p>
          ) : (
            <p className="text-center text-gray-400 py-8">Type at least 2 characters to search</p>
          )}
        </div>
      </div>
    </div>
  );
}