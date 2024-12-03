import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { SaleFormData, SaleItemType } from '../types/sales';
import { ITEM_PRICES } from '../constants/prices';
import { useNotificationContext } from '../contexts/NotificationContext';
import { decreaseBossInventory, getBossSafeQuantity } from '../utils/inventory';
import { notifyBossSaleWithdraw } from '../utils/discord/bossSaleNotification';
import { notifySaleTransaction } from '../utils/discord/notifications/transactions/sale';
import { getCurrentBalance } from '../utils/money';

export function useSalesForm() {
  const { showNotification } = useNotificationContext();
  const [formData, setFormData] = useState<SaleFormData>({
    member_id: '',
    buyer_name: '',
    item_type: 'Bibit Micin',
    quantity: 0,
    unit_price: ITEM_PRICES['Bibit Micin'],
    total_price: 0,
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateTotalPrice = (quantity: number, itemType: SaleItemType) => {
    const unitPrice = ITEM_PRICES[itemType];
    const total = quantity * unitPrice;
    setFormData(prev => ({
      ...prev,
      quantity,
      unit_price: unitPrice,
      total_price: total
    }));
  };

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

      // First, try to decrease the boss inventory
      await decreaseBossInventory(formData.item_type, formData.quantity);

      // If successful, record the sale
      const { error: supabaseError } = await supabase
        .from('sales')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      // Get current balance for notification
      const totalBalance = await getCurrentBalance();

      // Send Discord notifications
      try {
        await Promise.all([
          notifyBossSaleWithdraw(
            formData,
            memberData.name,
            currentQuantity,
            formData.buyer_name
          ),
          notifySaleTransaction(
            formData,
            memberData.name,
            totalBalance
          )
        ]);
      } catch (discordError) {
        console.error('Discord notification failed:', discordError);
      }

      showNotification('success', 'Sale recorded and inventory updated successfully');

      setFormData(prev => ({
        ...prev,
        buyer_name: '',
        quantity: 0,
        total_price: 0,
        notes: ''
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to record sale';
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
    handleSubmit,
    updateTotalPrice
  };
}