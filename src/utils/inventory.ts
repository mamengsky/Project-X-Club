import { supabase } from '../lib/supabase';
import { SaleItemType } from '../types/sales';
import { PurchaseItemType } from '../types/purchase';
import { ItemType } from '../types/deposit';
import { ITEM_TYPES } from '../constants/items';
import { BOSS_ITEMS } from '../constants/bossItems';

async function getSystemUser() {
  const { data: systemUser } = await supabase
    .from('members')
    .select('id')
    .eq('name', 'System')
    .single();

  if (!systemUser) {
    const { data: newUser, error } = await supabase
      .from('members')
      .insert({
        name: 'System',
        position: 'Automated System',
        phone: '000000000',
        status: 'active'
      })
      .select()
      .single();

    if (error) throw new Error('Failed to create system user');
    return newUser.id;
  }

  return systemUser.id;
}

export async function getMemberSafeQuantity(itemType: string): Promise<number> {
  const { data: deposits, error: depositsError } = await supabase
    .from('deposits')
    .select('quantity')
    .eq('item_type', itemType);

  if (depositsError) throw new Error('Failed to check deposits');

  const { data: withdrawals, error: withdrawalsError } = await supabase
    .from('withdrawals')
    .select('quantity')
    .eq('item_type', itemType);

  if (withdrawalsError) throw new Error('Failed to check withdrawals');

  const totalDeposits = deposits?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalWithdrawals = withdrawals?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return totalDeposits - totalWithdrawals;
}

export async function getBossSafeQuantity(itemType: string): Promise<number> {
  const { data: deposits, error: depositsError } = await supabase
    .from('boss_deposits')
    .select('quantity')
    .eq('item_type', itemType);

  if (depositsError) throw new Error('Failed to check deposits');

  const { data: withdrawals, error: withdrawalsError } = await supabase
    .from('boss_withdrawals')
    .select('quantity')
    .eq('item_type', itemType);

  if (withdrawalsError) throw new Error('Failed to check withdrawals');

  const totalDeposits = deposits?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalWithdrawals = withdrawals?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return totalDeposits - totalWithdrawals;
}

export async function getInventoryLevel(itemType: string): Promise<number> {
  if (isBossItem(itemType)) {
    return getBossSafeQuantity(itemType);
  } else if (isMemberItem(itemType)) {
    return getMemberSafeQuantity(itemType);
  }
  throw new Error('Invalid item type');
}

export async function decreaseBossInventory(itemType: SaleItemType, quantity: number): Promise<void> {
  const currentStock = await getBossSafeQuantity(itemType);

  if (currentStock < quantity) {
    throw new Error(`Insufficient stock in boss safe. Available: ${Math.max(0, currentStock)}, Requested: ${quantity}`);
  }

  const systemUserId = await getSystemUser();

  const { error: withdrawError } = await supabase
    .from('boss_withdrawals')
    .insert([{
      member_id: systemUserId,
      item_type: itemType,
      quantity: quantity,
      notes: 'Automatic withdrawal due to sale'
    }]);

  if (withdrawError) {
    throw new Error('Failed to update inventory');
  }
}

export async function increaseBossInventory(itemType: PurchaseItemType, quantity: number): Promise<void> {
  const systemUserId = await getSystemUser();

  const { error: depositError } = await supabase
    .from('boss_deposits')
    .insert([{
      member_id: systemUserId,
      item_type: itemType,
      quantity: quantity,
      notes: 'Automatic deposit from purchase'
    }]);

  if (depositError) {
    throw new Error('Failed to update inventory');
  }
}

export async function increaseMemberInventory(itemType: ItemType, quantity: number): Promise<void> {
  const systemUserId = await getSystemUser();

  const { error: depositError } = await supabase
    .from('deposits')
    .insert([{
      member_id: systemUserId,
      item_type: itemType,
      quantity: quantity,
      notes: 'Automatic deposit from purchase'
    }]);

  if (depositError) {
    throw new Error('Failed to update inventory');
  }
}

export function isBossItem(itemType: string): boolean {
  return BOSS_ITEMS.includes(itemType as any);
}

export function isMemberItem(itemType: string): boolean {
  return ITEM_TYPES.includes(itemType as any);
}