import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ClubMember } from '../types/member';

export function useMembers() {
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .neq('name', 'System')
          .order('name', { ascending: true });

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();

    const subscription = supabase
      .channel('members-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'members',
        filter: 'name=neq.System'
      }, fetchMembers)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addMember = (newMember: ClubMember) => {
    setMembers((prevMembers) => [newMember, ...prevMembers]);
  };

  return { members, loading, error, addMember };
}