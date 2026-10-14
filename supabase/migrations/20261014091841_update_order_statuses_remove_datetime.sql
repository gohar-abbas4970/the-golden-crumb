/*
# Update order statuses and remove date/time preferences

1. Changes to existing tables
- `orders` table:
  - Change `order_status` default from 'pending' to 'confirmed'
  - Set all existing 'pending' orders to 'confirmed'
  - The `preferred_date` and `preferred_time` columns remain in the table (nullable, unused going forward)
  - No columns are dropped (data safety)

2. Migration of existing data
- All orders with order_status = 'pending' are updated to 'confirmed'
- All orders with order_status in ('paid', 'preparing', 'ready', 'out-for-delivery', 'completed') are updated to 'done'
- 'cancelled' orders are updated to 'done' as well since we only use confirmed/done now

3. Security
- No changes to RLS policies — existing policies remain in place.
*/

-- Update existing orders to the new two-status system
UPDATE orders SET order_status = 'confirmed' WHERE order_status = 'pending';
UPDATE orders SET order_status = 'done' WHERE order_status IN ('paid', 'preparing', 'ready', 'out-for-delivery', 'completed', 'cancelled');

-- Change the default for new orders to 'confirmed'
ALTER TABLE orders ALTER COLUMN order_status SET DEFAULT 'confirmed';
