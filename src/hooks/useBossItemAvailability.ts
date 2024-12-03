import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { notifyBossSafeChange } from '../utils/discord/bossSafe';

export function useBossItemAvailability(itemType: string) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousQuantity = useRef(0);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        // Get total deposits
        const { data: deposits, error: depositsError } = await supabase
          .from('boss_deposits')
          .select('quantity')
          .eq('item_type', itemType);

        if (depositsError) throw depositsError;

        // Get total withdrawals
        const { data: withdrawals, error: withdrawalsError } = await supabase
          .from('boss_withdrawals')
          .select('quantity')
          .eq('item_type', itemType);

        if (withdrawalsError) throw withdrawalsError;

        // Calculate total deposits
        const totalDeposits = deposits?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        
        // Calculate total withdrawals
        const totalWithdrawals = withdrawals?.reduce((sum, item) => sum + item.quantity, 0) || 0;

        // Calculate new quantity
        const newQuantity = totalDeposits - totalWithdrawals;

        // If quantity has changed and we're not in initial loading state
        if (!loading && newQuantity !== previousQuantity.current) {
          try {
            await notifyBossSafeChange(itemType, previousQuantity.current, newQuantity);
          } catch (discordError) {
            console.error('Failed to send Discord notification:', discordError);
          }
        }

        // Update state and ref
        previousQuantity.current = newQuantity;
        setQuantity(newQuantity);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Failed to fetch availability');
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();

    // Set up real-time subscriptions
    const depositsSubscription = supabase
      .channel('boss-deposits-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'boss_deposits',
        filter: `item_type=eq.${itemType}`
      }, fetchAvailability)
      .subscribe();

    const withdrawalsSubscription = supabase
      .channel('boss-withdrawals-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'boss_withdrawals',
        filter: `item_type=eq.${itemType}`
      }, fetchAvailability)
      .subscribe();

    return () => {
      depositsSubscription.unsubscribe();
      withdrawalsSubscription.unsubscribe();
    };
  }, [itemType, loading]);

  return { quantity, loading, error };
}