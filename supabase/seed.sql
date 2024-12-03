-- Seed data for members table
insert into members (name, position, phone, status, created_at) values
  ('John Doe', 'VIP Host', '+1234567890', 'vip', now() - interval '6 months'),
  ('Jane Smith', 'Bartender', '+1234567891', 'active', now() - interval '3 months'),
  ('Mike Johnson', 'Security', '+1234567892', 'active', now() - interval '2 months'),
  ('Sarah Williams', 'Event Manager', '+1234567893', 'vip', now() - interval '1 month'),
  ('Tom Brown', 'DJ', '+1234567894', 'inactive', now() - interval '5 months');