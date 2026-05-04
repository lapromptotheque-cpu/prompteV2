ALTER TABLE public.prompts
  ADD COLUMN IF NOT EXISTS copy_count INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION public.increment_copy_count(p_id UUID)
RETURNS void AS $$
  UPDATE public.prompts
  SET copy_count = COALESCE(copy_count, 0) + 1
  WHERE id = p_id;
$$ LANGUAGE SQL SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.increment_copy_count(UUID) TO anon, authenticated;
