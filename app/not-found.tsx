import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-4xl font-bold text-card-foreground mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry&apos; the page you&lsquo;re looking for doesn&lsquo;t exist&rsquo; Please check the URL or go back to the home page&rsquo;
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
