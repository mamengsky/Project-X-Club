import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { BossItemType } from '../constants/bossItems';
import { useNotificationContext } from '../contexts/NotificationContext';
import { notifyBossDeposit } from '../utils/discord/bossDepositNotification';
import { getBossSafeQuantity } from '../utils/inventory';

interface BossDepositFormData {
  member_id: string;
  item_type: BossItemType;
  quantity: number;
  notes?: string;
}

export function useBossDepositForm() {
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<BossDepositFormData>({
    member_id: '',
    item_type: 'Bibit Micin',
    quantity: 0,
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Get current boss safe quantity before making changes
      const currentQuantity = await getBossSafeQuantity(formData.item_type);

      // Get member name for Discord notification
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('name')
        .eq('id', formData.member_id)
        .single();

      if (memberError) throw memberError;

      // Submit deposit
      const { error: depositError } = await supabase
        .from('boss_deposits')
        .insert([formData]);

      if (depositError) throw depositError;

      // Send Discord notification
      try {
        await notifyBossDeposit(formData, memberData.name, currentQuantity);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      showNotification('success', 'Item deposited successfully');

      setFormData(prev => ({
        ...prev,
        quantity: 0,
        notes: ''
      }));
    } catch (err) {
      setError('Failed to submit deposit. Please try again.');
      showNotification('error', 'Failed to submit deposit');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    error,
    isSubmitting,
    handleSubmit
  };
}