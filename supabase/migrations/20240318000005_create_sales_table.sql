-- Create sales table
create table if not exists sales (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  buyer_name text not null,
  item_type text not null,
  quantity integer not null,
  unit_price integer not null,
  total_price integer not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index sales_member_id_idx on sales(member_id);
create index sales_created_at_idx on sales(created_at desc);

-- Add RLS policies
alter table sales enable row level security;

-- Allow anonymous access (development only)
create policy "Allow anonymous read access"
  on sales for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on sales for insert
  to anon
  with check (true);