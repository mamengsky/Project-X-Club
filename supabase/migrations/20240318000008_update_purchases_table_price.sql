-- Update purchases table to use price_per_item
alter table purchases
  add column if not exists price_per_item integer not null default 0;