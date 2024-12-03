-- Remove seller_name and unit_price columns
alter table purchases
  drop column if exists seller_name,
  drop column if exists unit_price;