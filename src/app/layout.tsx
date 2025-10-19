import type { Metadata } from "next"

import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth/auth"
import { Providers } from "@/providers/providers"
import AppLoader from "@/hoc/app-loader"
import Header from "@/components/UI/layout/header"
import Footer from "@/components/UI/layout/footer"
import { siteConfig } from "@/config/site.config"
import { Nunito, Inter } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-nunito",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',              
    apple: '/apple.png',
  },
}

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const session = await auth()

  return (
    <html lang="ru">
      <body className={`${nunito.variable} ${inter.variable}`}>
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}
