
'use client'

import { useEffect } from 'react'
import { trackPostView } from '@/app/actions/analytics'

export function AnalyticsTracker({ postId }: { postId: string }) {
    useEffect(() => {
        // Fire and forget
        const track = async () => {
            try {
                await trackPostView(postId)
            } catch (e) {
                console.error('Failed to track view', e)
            }
        }
        track()
    }, [postId])

    return null
}
