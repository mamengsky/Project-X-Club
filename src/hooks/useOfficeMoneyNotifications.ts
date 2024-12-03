import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyMoneyManagement } from '../utils/discord/notifications/money';
import { Transaction } from '../types/office-money';

export function useOfficeMoneyNotifications() {
  useEffect(() => {
    async function handleMoneyChanges() {
      try {
        // Fetch sales
        const { data: sales } = await supabase
          .from('sales')
          .select('id, total_price, created_at')
          .order('created_at', { ascending: false });

        // Fetch purchases
        const { data: purchases } = await supabase
          .from('purchases')
          .select('id, total_price, created_at')
          .order('created_at', { ascending: false });

        const totalSales = sales?.reduce((sum, sale) => sum + sale.total_price, 0) || 0;
        const totalPurchases = purchases?.reduce((sum, purchase) => sum + purchase.total_price, 0) || 0;
        const totalBalance = totalSales - totalPurchases;

        // Format recent transactions
        const recentTransactions: Transaction[] = [
          ...(sales?.map(sale => ({
            id: sale.id,
            type: 'sale' as const,
            amount: sale.total_price,
            description: 'Sale transaction',
            reference_id: sale.id,
            created_at: sale.created_at
          })) || []),
          ...(purchases?.map(purchase => ({
            id: purchase.id,
            type: 'purchase' as const,
            amount: purchase.total_price,
            description: 'Purchase transaction',
            reference_id: purchase.id,
            created_at: purchase.created_at
          })) || [])
        ]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);

        await notifyMoneyManagement({
          totalSales,
          totalPurchases,
          totalBalance,
          recentTransactions
        });
      } catch (error) {
        console.error('Failed to process money changes:', error);
      }
    }

    // Initial check
    handleMoneyChanges();

    // Set up real-time subscriptions
    const salesSubscription = supabase
      .channel('sales-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, handleMoneyChanges)
      .subscribe();

    const purchasesSubscription = supabase
      .channel('purchases-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'purchases' }, handleMoneyChanges)
      .subscribe();

    return () => {
      salesSubscription.unsubscribe();
      purchasesSubscription.unsubscribe();
    };
  }, []);
}