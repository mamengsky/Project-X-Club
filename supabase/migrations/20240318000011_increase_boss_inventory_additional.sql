-- First, ensure we have a system user for automated operations
do $$
declare
  system_user_id uuid;
begin
  -- Try to find existing system user
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

  -- Insert additional deposits for each boss item
  insert into boss_deposits (member_id, item_type, quantity, notes)
  values
    (system_user_id, 'Bibit Micin', 5000, 'Inventory increase'),
    (system_user_id, 'Bibit Kecubung', 5000, 'Inventory increase'),
    (system_user_id, 'Security A', 2500, 'Inventory increase'),
    (system_user_id, 'Red Laptop', 500, 'Inventory increase'),
    (system_user_id, 'Thermite', 1000, 'Inventory increase'),
    (system_user_id, 'Security B', 2500, 'Inventory increase'),
    (system_user_id, 'Blue Laptop', 500, 'Inventory increase'),
    (system_user_id, 'Advance Lockpick', 1500, 'Inventory increase'),
    (system_user_id, 'Security D', 2500, 'Inventory increase'),
    (system_user_id, 'Green Laptop', 500, 'Inventory increase'),
    (system_user_id, 'Trojan USB', 1250, 'Inventory increase'),
    (system_user_id, 'Micro SMG', 250, 'Inventory increase'),
    (system_user_id, 'Heavy Sniper', 125, 'Inventory increase'),
    (system_user_id, 'Desert Eagle', 375, 'Inventory increase'),
    (system_user_id, 'Double Action Revolver', 375, 'Inventory increase'),
    (system_user_id, 'AK 47', 250, 'Inventory increase'),
    (system_user_id, 'Mini SMG', 250, 'Inventory increase'),
    (system_user_id, 'Revolver MK2', 375, 'Inventory increase'),
    (system_user_id, '9mm', 10000, 'Inventory increase'),
    (system_user_id, '50 AE', 10000, 'Inventory increase'),
    (system_user_id, '7.62 x 39', 10000, 'Inventory increase'),
    (system_user_id, '45 ACP', 10000, 'Inventory increase'),
    (system_user_id, '44 Magnum', 10000, 'Inventory increase'),
    (system_user_id, '50 BMG', 10000, 'Inventory increase'),
    (system_user_id, 'Heavy Armor', 750, 'Inventory increase');
end $$;