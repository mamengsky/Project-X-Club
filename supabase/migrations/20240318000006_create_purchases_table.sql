-- Create purchases table
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  seller_name text not null,
  item_type text not null,
  quantity integer not null,
  unit_price integer not null,
  total_price integer not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index purchases_member_id_idx on purchases(member_id);
create index purchases_created_at_idx on purchases(created_at desc);
create index purchases_item_type_idx on purchases(item_type);

-- Add RLS policies
alter table purchases enable row level security;

-- Allow anonymous access (development only)
create policy "Allow anonymous read access"
  on purchases for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on purchases for insert
  to anon
  with check (true);