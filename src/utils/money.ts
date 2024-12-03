import { supabase } from '../lib/supabase';

export async function getCurrentBalance(): Promise<number> {
  try {
    // Fetch sales
    const { data: sales, error: salesError } = await supabase
      .from('sales')
      .select('total_price');

    if (salesError) throw salesError;

    // Fetch purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('total_price');

    if (purchasesError) throw purchasesError;

    // Calculate totals
    const totalSales = sales?.reduce((sum, sale) => sum + sale.total_price, 0) || 0;
    const totalPurchases = purchases?.reduce((sum, purchase) => sum + purchase.total_price, 0) || 0;

    return totalSales - totalPurchases;
  } catch (error) {
    console.error('Failed to get current balance:', error);
    return 0;
  }
}