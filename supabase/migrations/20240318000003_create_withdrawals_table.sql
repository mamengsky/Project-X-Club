-- Create withdrawals table
create table if not exists withdrawals (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) not null,
  item_type text not null,
  quantity integer not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index withdrawals_member_id_idx on withdrawals(member_id);
create index withdrawals_created_at_idx on withdrawals(created_at desc);

-- Add RLS policies
alter table withdrawals enable row level security;

-- Allow anonymous access (development only)
create policy "Allow anonymous read access"
  on withdrawals for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on withdrawals for insert
  to anon
  with check (true);