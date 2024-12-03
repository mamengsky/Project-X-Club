import { ItemType } from './deposit';
import { BossItemType } from '../constants/bossItems';

export type PurchaseItemType = ItemType | BossItemType;

export interface PurchaseFormData {
  member_id: string;
  item_type: PurchaseItemType;
  quantity: number;
  total_price: number;
  notes?: string;
}

export interface Purchase {
  id: string;
  member_id: string;
  item_type: PurchaseItemType;
  quantity: number;
  total_price: number;
  notes?: string;
  created_at: string;
}