export type SaleItemType = 'Bibit Micin' | 'Bibit Kecubung';

export interface SaleFormData {
  member_id: string;
  buyer_name: string;
  item_type: SaleItemType;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
}

export interface Sale {
  id: string;
  member_id: string;
  buyer_name: string;
  item_type: SaleItemType;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;
}