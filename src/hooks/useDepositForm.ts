import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { DepositFormData, ItemType } from '../types/deposit';
import { useNotificationContext } from '../contexts/NotificationContext';
import { notifyDeposit } from '../utils/discord/depositNotification';
import { getMemberSafeQuantity } from '../utils/inventory';

export function useDepositForm() {
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<DepositFormData>({
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

      // Get member name for Discord notification
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('name')
        .eq('id', formData.member_id)
        .single();

      if (memberError) throw memberError;

      // Submit deposit
      const { error: depositError } = await supabase
        .from('deposits')
        .insert([formData]);

      if (depositError) throw depositError;

      // Send Discord notification with the before quantity
      try {
        await notifyDeposit(formData, memberData.name, currentQuantity);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
        // Continue with success flow even if Discord notification fails
      }

      showNotification('success', 'Item deposited successfully');

      // Only reset quantity and notes, keep the member selected
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