export const ITEM_TYPES = [
  'Kecubung Kemasan',
  'Micin Kemasan',
  'Alumunium',
  'Iron',
  'Metalscrap',
  'Glass',
  'Rubber',
  'Empty Bottle',
  'Empty Can',
  'Plastic',
  'Kayu Jadi',
  'Baju',
  'Diamond',
  'Uncut Diamond',
  'Steel',
  'Gold Bar',
  'Copper',
  'Lembaran Kayu'
] as const;

export type ItemType = typeof ITEM_TYPES[number];