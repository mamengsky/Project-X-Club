import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { BossItemType } from '../constants/bossItems';
import { useNotificationContext } from '../contexts/NotificationContext';
import { notifyBossWithdraw } from '../utils/discord/bossWithdrawNotification';
import { getBossSafeQuantity } from '../utils/inventory';

interface BossWithdrawFormData {
  member_id: string;
  item_type: BossItemType;
  quantity: number;
  notes?: string;
}

export function useBossWithdrawForm() {
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<BossWithdrawFormData>({
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

      // Verify sufficient inventory
      if (currentQuantity < formData.quantity) {
        throw new Error(`Insufficient inventory. Available: ${currentQuantity}, Requested: ${formData.quantity}`);
      }

      // Get member name for Discord notification
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('name')
        .eq('id', formData.member_id)
        .single();

      if (memberError) throw memberError;

      // Submit withdrawal
      const { error: withdrawalError } = await supabase
        .from('boss_withdrawals')
        .insert([formData]);

      if (withdrawalError) throw withdrawalError;

      // Send Discord notification
      try {
        await notifyBossWithdraw(formData, memberData.name, currentQuantity);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      showNotification('success', 'Item withdrawn successfully');

      setFormData(prev => ({
        ...prev,
        quantity: 0,
        notes: ''
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit withdrawal';
      setError(errorMessage);
      showNotification('error', errorMessage);
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