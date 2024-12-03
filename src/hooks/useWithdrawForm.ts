import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { WithdrawFormData } from '../types/withdraw';
import { ItemType } from '../types/deposit';
import { useNotificationContext } from '../contexts/NotificationContext';
import { notifyWithdrawal } from '../utils/discord/withdrawalNotification';
import { getMemberSafeQuantity } from '../utils/inventory';

export function useWithdrawForm() {
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<WithdrawFormData>({
    member_id: '',
    item_type: 'Kecubung Kemasan',
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
      // Get current member safe quantity before making changes
      const currentQuantity = await getMemberSafeQuantity(formData.item_type);

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
        .from('withdrawals')
        .insert([formData]);

      if (withdrawalError) throw withdrawalError;

      // Send Discord notification with the before quantity
      try {
        await notifyWithdrawal(formData, memberData.name, currentQuantity);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
        // Continue with success flow even if Discord notification fails
      }

      showNotification('success', 'Item withdrawn successfully');

      // Only reset quantity and notes, keep the member selected
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