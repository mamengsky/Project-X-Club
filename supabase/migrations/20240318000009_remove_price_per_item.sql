-- Remove price_per_item column from purchases table
alter table purchases
  drop column if exists price_per_item;