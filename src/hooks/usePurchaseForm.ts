import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PurchaseFormData } from '../types/purchase';
import { useNotificationContext } from '../contexts/NotificationContext';
import { increaseBossInventory, increaseMemberInventory, isBossItem, isMemberItem, getBossSafeQuantity, getMemberSafeQuantity } from '../utils/inventory';
import { ItemType } from '../types/deposit';
import { notifyBossPurchaseDeposit } from '../utils/discord/bossPurchaseNotification';
import { notifyMemberPurchaseDeposit } from '../utils/discord/memberPurchaseNotification';
import { notifyPurchaseTransaction } from '../utils/discord/notifications/transactions/purchase';
import { getCurrentBalance } from '../utils/money';

export function usePurchaseForm() {
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<PurchaseFormData>({
    member_id: '',
    item_type: 'Kecubung Kemasan',
    quantity: 0,
    total_price: 0,
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Get member name for Discord notification
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select('name')
        .eq('id', formData.member_id)
        .single();

      if (memberError) throw memberError;

      // First record the purchase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert([formData]);

      if (purchaseError) throw purchaseError;

      // Get current balance for notification
      const totalBalance = await getCurrentBalance();

      const notificationPromises = [
        notifyPurchaseTransaction(
          formData,
          memberData.name,
          totalBalance
        )
      ];

      if (isBossItem(formData.item_type)) {
        // Get current quantity for boss items
        const currentQuantity = await getBossSafeQuantity(formData.item_type);
        
        // Increase boss inventory
        await increaseBossInventory(formData.item_type, formData.quantity);

        // Add boss notification
        notificationPromises.push(
          notifyBossPurchaseDeposit(
            formData,
            memberData.name,
            currentQuantity
          )
        );
      } else if (isMemberItem(formData.item_type)) {
        // Get current quantity for member items
        const currentQuantity = await getMemberSafeQuantity(formData.item_type);

        // Increase member inventory
        await increaseMemberInventory(formData.item_type as ItemType, formData.quantity);

        // Add member notification
        notificationPromises.push(
          notifyMemberPurchaseDeposit(
            formData,
            memberData.name,
            currentQuantity
          )
        );
      }

      // Send all notifications
      try {
        await Promise.all(notificationPromises);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      showNotification('success', 'Purchase recorded and inventory updated successfully');

      setFormData(prev => ({
        ...prev,
        quantity: 0,
        total_price: 0,
        notes: ''
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record purchase';
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