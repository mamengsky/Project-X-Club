import { PurchaseItemType } from '../types/purchase';

export const PURCHASE_PRICES: Record<PurchaseItemType, number> = {
  // Regular Items
  'Kecubung Kemasan': 1000,
  'Micin Kemasan': 1000,
  'Alumunium': 800,
  'Iron': 1200,
  'Metalscrap': 1500,
  'Glass': 500,
  'Rubber': 600,
  'Empty Bottle': 300,
  'Empty Can': 400,
  'Plastic': 200,
  'Kayu Jadi': 2000,
  'Baju': 1500,
  'Diamond': 50000,
  'Uncut Diamond': 35000,
  'Steel': 2500,
  'Gold Bar': 45000,
  'Copper': 1800,
  'Lembaran Kayu': 1000,

  // Boss Items
  'Bibit Micin': 2500,
  'Bibit Kecubung': 2500,
  'Security A': 15000,
  'Red Laptop': 25000,
  'Thermite': 20000,
  'Security B': 18000,
  'Blue Laptop': 28000,
  'Advance Lockpick': 12000,
  'Security D': 20000,
  'Green Laptop': 30000,
  'Trojan USB': 22000,
  'Micro SMG': 35000,
  'Heavy Sniper': 45000,
  'Desert Eagle': 25000,
  'Double Action Revolver': 28000,
  'AK 47': 40000,
  'Mini SMG': 32000,
  'Revolver MK2': 30000,
  '9mm': 5000,
  '50 AE': 6000,
  '7.62 x 39': 7000,
  '45 ACP': 5500,
  '44 Magnum': 6500,
  '50 BMG': 8000,
  'Heavy Armor': 15000,
  'Bom Pipa': 35000,
  'Uang Merah': 50000,
  'Uang Hitam': 50000,
  'RPG': 75000,
  'Pistol .50': 28000
} as const;