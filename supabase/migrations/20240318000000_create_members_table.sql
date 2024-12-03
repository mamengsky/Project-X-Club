-- Create enum for member status
create type member_status as enum ('active', 'inactive', 'vip');

-- Create members table
create table if not exists members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  position text not null,
  phone text not null,
  status member_status not null default 'active',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index members_status_idx on members(status);
create index members_created_at_idx on members(created_at desc);

-- Add RLS (Row Level Security) policies
alter table members enable row level security;

-- Create policy for authenticated users to read all members
create policy "Users can view all members"
  on members for select
  to authenticated
  using (true);

-- Create policy for admin users to manage members
create policy "Admins can manage members"
  on members for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');

-- Create function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to update updated_at column
create trigger update_members_updated_at
  before update on members
  for each row
  execute function update_updated_at_column();