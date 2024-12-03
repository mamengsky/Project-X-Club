import { ItemType } from './deposit';

export interface Withdrawal {
  id: string;
  member_id: string;
  item_type: ItemType;
  quantity: number;
  notes?: string;
  created_at: string;
}

export interface WithdrawFormData {
  member_id: string;
  item_type: ItemType;
  quantity: number;
  notes?: string;
}