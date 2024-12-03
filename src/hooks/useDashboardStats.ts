import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Transaction } from '../types/office-money';

interface DashboardStats {
  totalMembers: number;
  topSeller: { name: string; total: number } | null;
  topBuyer: { name: string; total: number } | null;
  topItems: Array<{ item_type: string; total: number }>;
  recentActivity: Transaction[];
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    topSeller: null,
    topBuyer: null,
    topItems: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total members (excluding System)
        const { count: membersCount } = await supabase
          .from('members')
          .select('*', { count: 'exact', head: true })
          .neq('name', 'System');

        // Fetch sales with member details (excluding System)
        const { data: sales } = await supabase
          .from('sales')
          .select('*, members!inner(name)')
          .neq('members.name', 'System')
          .order('created_at', { ascending: false });

        // Fetch purchases with member details (excluding System)
        const { data: purchases } = await supabase
          .from('purchases')
          .select('*, members!inner(name)')
          .neq('members.name', 'System')
          .order('created_at', { ascending: false });

        // Calculate top seller
        const sellerTotals = sales?.reduce((acc, sale) => {
          const memberName = sale.members?.name || 'Unknown';
          acc[memberName] = (acc[memberName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topSeller = Object.entries(sellerTotals || {})
          .sort(([, a], [, b]) => b - a)[0];

        // Calculate top buyer
        const buyerTotals = purchases?.reduce((acc, purchase) => {
          const memberName = purchase.members?.name || 'Unknown';
          acc[memberName] = (acc[memberName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topBuyer = Object.entries(buyerTotals || {})
          .sort(([, a], [, b]) => b - a)[0];

        // Calculate top items
        const itemTotals = [...(sales || []), ...(purchases || [])]
          .reduce((acc, transaction) => {
            acc[transaction.item_type] = (acc[transaction.item_type] || 0) + transaction.quantity;
            return acc;
          }, {} as Record<string, number>);

        const topItems = Object.entries(itemTotals)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([item_type, total]) => ({ item_type, total }));

        // Format recent activity
        const recentActivity: Transaction[] = [
          ...(sales?.map(sale => ({
            id: sale.id,
            type: 'sale' as const,
            amount: sale.total_price,
            description: `${sale.members?.name} sold ${sale.quantity}x ${sale.item_type}`,
            reference_id: sale.id,
            created_at: sale.created_at
          })) || []),
          ...(purchases?.map(purchase => ({
            id: purchase.id,
            type: 'purchase' as const,
            amount: purchase.total_price,
            description: `${purchase.members?.name} purchased ${purchase.quantity}x ${purchase.item_type}`,
            reference_id: purchase.id,
            created_at: purchase.created_at
          })) || [])
        ]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);

        setStats({
          totalMembers: membersCount || 0,
          topSeller: topSeller ? { name: topSeller[0], total: topSeller[1] } : null,
          topBuyer: topBuyer ? { name: topBuyer[0], total: topBuyer[1] } : null,
          topItems,
          recentActivity
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // Set up real-time subscriptions
    const subscriptions = [
      supabase.channel('members-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, fetchStats),
      supabase.channel('sales-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, fetchStats),
      supabase.channel('purchases-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'purchases' }, fetchStats)
    ];

    subscriptions.forEach(subscription => subscription.subscribe());

    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  }, []);

  return { stats, loading, error };
}