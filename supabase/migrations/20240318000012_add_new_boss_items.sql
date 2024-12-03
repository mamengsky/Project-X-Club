-- Add new items to boss inventory
do $$
declare
  system_user_id uuid;
begin
  -- Get system user ID
  select id into system_user_id
  from members
  where name = 'System'
  limit 1;

  -- Create system user if it doesn't exist
  if system_user_id is null then
    insert into members (name, position, phone, status)
    values ('System', 'Automated System', '000000000', 'active')
    returning id into system_user_id;
  end if;

  -- Insert initial inventory for new items
  insert into boss_deposits (member_id, item_type, quantity, notes)
  values
    (system_user_id, 'Bom Pipa', 500, 'Initial inventory'),
    (system_user_id, 'Uang Merah', 1000, 'Initial inventory'),
    (system_user_id, 'Uang Hitam', 1000, 'Initial inventory'),
    (system_user_id, 'RPG', 100, 'Initial inventory'),
    (system_user_id, 'Pistol .50', 250, 'Initial inventory');

  -- Add additional stock
  insert into boss_deposits (member_id, item_type, quantity, notes)
  values
    (system_user_id, 'Bom Pipa', 2500, 'Inventory increase'),
    (system_user_id, 'Uang Merah', 5000, 'Inventory increase'),
    (system_user_id, 'Uang Hitam', 5000, 'Inventory increase'),
    (system_user_id, 'RPG', 500, 'Inventory increase'),
    (system_user_id, 'Pistol .50', 1250, 'Inventory increase');
end $$;