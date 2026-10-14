/*
# Create product reviews table

1. New Tables
- `reviews`
  - `id` (uuid, primary key)
  - `product_id` (text, not null) — references product slug in the frontend product data
  - `customer_name` (text, not null) — display name of the reviewer
  - `rating` (integer, not null, 1–5) — star rating
  - `title` (text, nullable) — optional review title
  - `body` (text, not null) — the review text
  - `image_url` (text, nullable) — optional review photo URL
  - `is_verified` (boolean, default false) — verified purchase badge (always false from client inserts)
  - `moderation_status` (text, default 'approved') — pending/approved/rejected
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reviews`.
- This is a no-auth (no sign-in) app, so policies use `TO anon, authenticated`.
- Anyone can read approved reviews (SELECT).
- Anyone can submit a review (INSERT), but `is_verified` is forced to false and `moderation_status` defaults to 'approved' for now (can be changed to 'pending' when moderation is enabled).
- No UPDATE or DELETE from the client — reviews are immutable once submitted.

3. Notes
- `is_verified` is always false for client-submitted reviews. Only bakery staff can mark reviews as verified (via the Supabase dashboard or a future admin function).
- `moderation_status` is set to 'approved' by default so reviews are visible immediately. This can be changed to 'pending' when a moderation workflow is added.
- Only reviews with `moderation_status = 'approved'` are returned to the frontend.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  body text NOT NULL,
  image_url text,
  is_verified boolean NOT NULL DEFAULT false,
  moderation_status text NOT NULL DEFAULT 'approved',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_approved_reviews" ON reviews;
CREATE POLICY "anon_select_approved_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (moderation_status = 'approved');

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (
  is_verified = false
  AND rating >= 1
  AND rating <= 5
  AND length(customer_name) > 0
  AND length(body) > 0
);
