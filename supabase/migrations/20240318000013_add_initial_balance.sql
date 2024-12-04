-- Add initial balance through a system sale transaction
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

  -- Insert initial balance as a sale transaction
  insert into sales (
    member_id,
    buyer_name,
    item_type,
    quantity,
    unit_price,
    total_price,
    notes,
    created_at
  )
  values (
    system_user_id,
    'Initial Balance',
    'Bibit Micin',
    6950,
    500,
    3475000,
    'Initial balance setup',
    now()
  );
end $$;