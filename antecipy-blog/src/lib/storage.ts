
import { createClient } from '@/lib/supabase-browser'

// Upload helper function with improved reliability and error logging
export async function uploadImage(file: File): Promise<string | null> {
    try {
        const supabase = createClient()

        // Sanitize file name and generate unique path
        const fileExt = file.name.split('.').pop() || 'jpg'
        const randomString = Math.random().toString(36).substring(2, 10)
        const timestamp = Date.now()
        const fileName = `post-${timestamp}-${randomString}.${fileExt}`
        const filePath = fileName

        console.log('Attempting upload to blog-assets:', filePath)

        const { data, error: uploadError } = await supabase.storage
            .from('blog-assets')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type // Explicitly set content type
            })

        if (uploadError) {
            // Enhanced error logging for debugging (visible in browser console)
            console.error('Supabase Storage Upload Error:', {
                message: uploadError.message,
                error: uploadError,
                details: (uploadError as any).details,
                statusCode: (uploadError as any).statusCode
            })
            return null
        }

        console.log('Upload successful:', data)

        const { data: urlData } = supabase.storage
            .from('blog-assets')
            .getPublicUrl(filePath)

        if (!urlData || !urlData.publicUrl) {
            console.error('Failed to get public URL for:', filePath)
            return null
        }

        return urlData.publicUrl
    } catch (err) {
        console.error('Unexpected error during image upload:', err)
        return null
    }
}
