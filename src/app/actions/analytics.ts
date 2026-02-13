
'use server'

import { createClient } from '@/lib/supabase-server'
import { headers } from 'next/headers'

export async function trackPostView(postId: string) {
    const supabase = await createClient()
    const headerList = await headers()
    const userAgent = headerList.get('user-agent') || 'unknown'
    const referer = headerList.get('referer') || 'direct'
    const ip = headerList.get('x-forwarded-for') || 'unknown'

    // Hash IP using SHA-256 (Simple approach for anonymization)
    const crypto = globalThis.crypto;
    const encoder = new TextEncoder();
    const data = encoder.encode(ip);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    await supabase.from('post_views').insert({
        post_id: postId,
        user_agent: userAgent,
        referer: referer,
        ip_hash: hashHex
    })
}
