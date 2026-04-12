import React from 'react'

interface BlogPostSchemaProps {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  imageUrl?: string
  authorName?: string
}

export function BlogPostSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  imageUrl,
  authorName = 'Antecipy',
}: BlogPostSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.antecipy.com.br'
  const postUrl = `${baseUrl}/blog/${slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: postUrl,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://antecipy.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Antecipy',
      url: 'https://antecipy.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://antecipy.com.br/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://antecipy.com.br',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: postUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
