-- Drop existing policies
drop policy if exists "Users can view all members" on members;
drop policy if exists "Admins can manage members" on members;

-- Create new policies for anonymous access (development only)
create policy "Allow anonymous read access"
  on members for select
  to anon
  using (true);

create policy "Allow anonymous insert access"
  on members for insert
  to anon
  with check (true);

create policy "Allow anonymous update access"
  on members for update
  to anon
  using (true);

create policy "Allow anonymous delete access"
  on members for delete
  to anon
  using (true);