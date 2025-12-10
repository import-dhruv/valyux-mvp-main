-- Enable Row Level Security on all tables

-- Products table - public read access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);

-- Product specs - public read access
ALTER TABLE public.product_specs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product specs are publicly readable" ON public.product_specs FOR SELECT USING (true);

-- Retailers - public read access
ALTER TABLE public.retailers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Retailers are publicly readable" ON public.retailers FOR SELECT USING (true);

-- Product prices - public read access
ALTER TABLE public.product_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product prices are publicly readable" ON public.product_prices FOR SELECT USING (true);

-- Profiles - users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Favorites - users can only manage their own favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Comparisons - users can only manage their own comparisons
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own comparisons" ON public.comparisons FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert comparisons" ON public.comparisons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their comparisons" ON public.comparisons FOR UPDATE USING (auth.uid() = user_id);

-- Search history - users can only view their own
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own search history" ON public.search_history FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert search history" ON public.search_history FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Reviews - users can view all, but only manage their own
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are publicly readable" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Price alerts - users can only manage their own
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own price alerts" ON public.price_alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert price alerts" ON public.price_alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own alerts" ON public.price_alerts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own alerts" ON public.price_alerts FOR DELETE USING (auth.uid() = user_id);
