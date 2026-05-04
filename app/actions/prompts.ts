'use server'

import { supabaseServer } from '@/lib/supabase-server'
import { generateSlug } from '@/lib/slug'

export async function incrementCopyCount(promptId: string) {
  await supabaseServer.rpc('increment_copy_count', { p_id: promptId })
}

export async function getOrCreateSlug(promptId: string): Promise<string> {
  const { data } = await supabaseServer
    .from('prompts')
    .select('slug, titre')
    .eq('id', promptId)
    .single()

  if (data?.slug) return data.slug

  const slug = generateSlug(data?.titre ?? promptId, promptId)
  await supabaseServer
    .from('prompts')
    .update({ slug })
    .eq('id', promptId)

  return slug
}
