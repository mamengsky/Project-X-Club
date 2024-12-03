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

  -- Insert deposits for each boss item
  insert into boss_deposits (member_id, item_type, quantity, notes)
  values
    (system_user_id, 'Bibit Micin', 1000, 'Initial inventory'),
    (system_user_id, 'Bibit Kecubung', 1000, 'Initial inventory'),
    (system_user_id, 'Security A', 500, 'Initial inventory'),
    (system_user_id, 'Red Laptop', 100, 'Initial inventory'),
    (system_user_id, 'Thermite', 200, 'Initial inventory'),
    (system_user_id, 'Security B', 500, 'Initial inventory'),
    (system_user_id, 'Blue Laptop', 100, 'Initial inventory'),
    (system_user_id, 'Advance Lockpick', 300, 'Initial inventory'),
    (system_user_id, 'Security D', 500, 'Initial inventory'),
    (system_user_id, 'Green Laptop', 100, 'Initial inventory'),
    (system_user_id, 'Trojan USB', 250, 'Initial inventory'),
    (system_user_id, 'Micro SMG', 50, 'Initial inventory'),
    (system_user_id, 'Heavy Sniper', 25, 'Initial inventory'),
    (system_user_id, 'Desert Eagle', 75, 'Initial inventory'),
    (system_user_id, 'Double Action Revolver', 75, 'Initial inventory'),
    (system_user_id, 'AK 47', 50, 'Initial inventory'),
    (system_user_id, 'Mini SMG', 50, 'Initial inventory'),
    (system_user_id, 'Revolver MK2', 75, 'Initial inventory'),
    (system_user_id, '9mm', 2000, 'Initial inventory'),
    (system_user_id, '50 AE', 2000, 'Initial inventory'),
    (system_user_id, '7.62 x 39', 2000, 'Initial inventory'),
    (system_user_id, '45 ACP', 2000, 'Initial inventory'),
    (system_user_id, '44 Magnum', 2000, 'Initial inventory'),
    (system_user_id, '50 BMG', 2000, 'Initial inventory'),
    (system_user_id, 'Heavy Armor', 150, 'Initial inventory');
end $$;