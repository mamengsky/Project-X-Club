export interface Transaction {
  id: string;
  type: 'sale' | 'purchase';
  amount: number;
  description: string;
  reference_id: string;
  created_at: string;
}

export interface OfficeMoneySummary {
  total_balance: number;
  total_sales: number;
  total_purchases: number;
  recent_transactions: Transaction[];
}