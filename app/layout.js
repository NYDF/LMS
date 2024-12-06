"use client"
import { Outfit } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
const inter = Outfit({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  return (
    <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>

    </ClerkProvider>
  )
}
