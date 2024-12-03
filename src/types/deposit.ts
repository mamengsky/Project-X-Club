export type ItemType =
  | 'Kecubung Kemasan'
  | 'Micin Kemasan'
  | 'Alumunium'
  | 'Iron'
  | 'Metalscrap'
  | 'Glass'
  | 'Rubber'
  | 'Empty Bottle'
  | 'Empty Can'
  | 'Plastic'
  | 'Kayu Jadi'
  | 'Baju'
  | 'Diamond'
  | 'Uncut Diamond'
  | 'Steel'
  | 'Gold Bar'
  | 'Copper'
  | 'Lembaran Kayu';

export interface Deposit {
  id: string;
  member_id: string;
  item_type: ItemType;
  quantity: number;
  notes?: string;
  created_at: string;
}

export interface DepositFormData {
  member_id: string;
  item_type: ItemType;
  quantity: number;
  notes?: string;
}