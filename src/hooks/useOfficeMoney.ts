import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { OfficeMoneySummary, Transaction } from '../types/office-money';

export function useOfficeMoney() {
  const [summary, setSummary] = useState<OfficeMoneySummary>({
    total_balance: 0,
    total_sales: 0,
    total_purchases: 0,
    recent_transactions: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOfficeMoney() {
      try {
        // Fetch sales
        const { data: sales, error: salesError } = await supabase
          .from('sales')
          .select('id, total_price, created_at, buyer_name, item_type, quantity, members(name)')
          .order('created_at', { ascending: false });

        if (salesError) throw salesError;

        // Fetch purchases
        const { data: purchases, error: purchasesError } = await supabase
          .from('purchases')
          .select('id, total_price, created_at, item_type, quantity, members(name)')
          .order('created_at', { ascending: false });

        if (purchasesError) throw purchasesError;

        // Calculate totals
        const totalSales = sales?.reduce((sum, sale) => sum + sale.total_price, 0) || 0;
        const totalPurchases = purchases?.reduce((sum, purchase) => sum + purchase.total_price, 0) || 0;

        // Format transactions
        const transactions: Transaction[] = [
          ...(sales?.map(sale => ({
            id: sale.id,
            type: 'sale' as const,
            amount: sale.total_price,
            description: `${sale.members?.name || 'Unknown'} sold ${sale.quantity}x ${sale.item_type} to ${sale.buyer_name}`,
            reference_id: sale.id,
            created_at: sale.created_at
          })) || []),
          ...(purchases?.map(purchase => ({
            id: purchase.id,
            type: 'purchase' as const,
            amount: purchase.total_price,
            description: `${purchase.members?.name || 'Unknown'} purchased ${purchase.quantity}x ${purchase.item_type}`,
            reference_id: purchase.id,
            created_at: purchase.created_at
          })) || [])
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setSummary({
          total_balance: totalSales - totalPurchases,
          total_sales: totalSales,
          total_purchases: totalPurchases,
          recent_transactions: transactions
        });
      } catch (err) {
        console.error('Error fetching office money:', err);
        setError('Failed to fetch office money data');
      } finally {
        setLoading(false);
      }
    }

    fetchOfficeMoney();

    // Set up real-time subscriptions
    const salesSubscription = supabase
      .channel('sales-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, fetchOfficeMoney)
      .subscribe();

    const purchasesSubscription = supabase
      .channel('purchases-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'purchases' }, fetchOfficeMoney)
      .subscribe();

    return () => {
      salesSubscription.unsubscribe();
      purchasesSubscription.unsubscribe();
    };
  }, []);

  return { summary, loading, error };
}