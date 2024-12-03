-- Create boss_deposits table
create table if not exists boss_deposits (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  item_type text not null,
  quantity integer not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create boss_withdrawals table
create table if not exists boss_withdrawals (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  item_type text not null,
  quantity integer not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index boss_deposits_item_type_idx on boss_deposits(item_type);
create index boss_deposits_created_at_idx on boss_deposits(created_at desc);
create index boss_withdrawals_item_type_idx on boss_withdrawals(item_type);
create index boss_withdrawals_created_at_idx on boss_withdrawals(created_at desc);
create index boss_deposits_member_id_idx on boss_deposits(member_id);
create index boss_withdrawals_member_id_idx on boss_withdrawals(member_id);

-- Add RLS policies
alter table boss_deposits enable row level security;
alter table boss_withdrawals enable row level security;

-- Allow anonymous access (development only)
create policy "Allow anonymous read access"
  on boss_deposits for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on boss_deposits for insert
  to anon
  with check (true);

create policy "Allow anonymous read access"
  on boss_withdrawals for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on boss_withdrawals for insert
  to anon
  with check (true);