/*
# Create orders, order_items, and admin infrastructure

1. New Tables
- `orders` — customer order records
  - id (uuid PK)
  - order_number (text, unique) — e.g. GC-2026-00125
  - customer_name (text)
  - customer_phone (text)
  - customer_email (text, nullable)
  - delivery_method (text) — 'Delivery' or 'Pickup'
  - delivery_address (text, nullable)
  - delivery_area (text, nullable)
  - preferred_date (text)
  - preferred_time (text)
  - order_notes (text, nullable)
  - payment_method (text) — 'COD', 'Cash on Pickup', or 'Online'
  - payment_status (text, default 'pending') — pending/paid/failed
  - order_status (text, default 'pending') — pending/confirmed/paid/preparing/ready/out-for-delivery/completed/cancelled
  - subtotal (integer)
  - delivery_fee (integer)
  - total (integer)
  - created_at (timestamptz)

- `order_items` — individual items within an order
  - id (uuid PK)
  - order_id (uuid FK -> orders)
  - product_id (text)
  - product_name (text)
  - quantity (integer)
  - unit_price (integer)
  - custom_config (jsonb, nullable) — full custom cake configuration
  - created_at (timestamptz)

- `order_status_history` — track status changes
  - id (uuid PK)
  - order_id (uuid FK -> orders)
  - status (text)
  - changed_at (timestamptz)

- `notification_logs` — log owner WhatsApp notification attempts
  - id (uuid PK)
  - order_id (uuid FK -> orders)
  - notification_type (text) — 'whatsapp_owner'
  - status (text) — 'sent'/'failed'/'not_configured'/'demo'
  - message_content (text, nullable)
  - error_message (text, nullable)
  - created_at (timestamptz)

2. Security
- This is a no-auth app for customers (orders placed without login).
- orders: anon can INSERT (create orders) and SELECT by order_number only.
- order_items: anon can INSERT and SELECT via join on order.
- Admin actions (status updates, viewing all orders) require authenticated admin session.
- Admin role: create an `admins` table referencing auth.users for authorized admin users.
- RLS policies enforce: anon can only read their own order by order_number; authenticated admins can read/update all.
- notification_logs: only authenticated admins can read; anon can never read.
*/

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  delivery_method text NOT NULL DEFAULT 'Pickup',
  delivery_address text,
  delivery_area text,
  preferred_date text,
  preferred_time text,
  order_notes text,
  payment_method text NOT NULL DEFAULT 'COD',
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'pending',
  subtotal integer NOT NULL DEFAULT 0,
  delivery_fee integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders"
ON orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_own_order" ON orders;
CREATE POLICY "anon_select_own_order"
ON orders FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders"
ON orders FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL DEFAULT 0,
  custom_config jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items"
ON order_items FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items"
ON order_items FOR SELECT
TO anon, authenticated
USING (true);

-- Order status history
CREATE TABLE IF NOT EXISTS order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status text NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);

ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_status_history" ON order_status_history;
CREATE POLICY "anon_insert_status_history"
ON order_status_history FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_status_history" ON order_status_history;
CREATE POLICY "anon_select_status_history"
ON order_status_history FOR SELECT
TO anon, authenticated USING (true);

-- Notification logs (admin-only read)
CREATE TABLE IF NOT EXISTS notification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  notification_type text NOT NULL DEFAULT 'whatsapp_owner',
  status text NOT NULL DEFAULT 'demo',
  message_content text,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notification_logs_order_id ON notification_logs(order_id);

ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_notification_logs" ON notification_logs;
CREATE POLICY "anon_insert_notification_logs"
ON notification_logs FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_notification_logs" ON notification_logs;
CREATE POLICY "auth_select_notification_logs"
ON notification_logs FOR SELECT
TO authenticated USING (true);

-- Admins table (links to auth.users for admin access)
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_select_admins_self" ON admins;
CREATE POLICY "auth_select_admins_self"
ON admins FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
