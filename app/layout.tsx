import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SL Benfica - Info Completa',
  description: 'Todas as informações sobre o Sport Lisboa e Benfica: próximos jogos, escalações, resultados e mais',
  keywords: 'Benfica, SLB, futebol, jogos, escalações, lineups, portugal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <nav className="bg-benfica-red text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">SL Benfica Info</h1>
            <div className="flex gap-4">
              <a href="/" className="hover:text-benfica-gold transition">Início</a>
              <a href="#jogos" className="hover:text-benfica-gold transition">Próximos Jogos</a>
              <a href="#lineup" className="hover:text-benfica-gold transition">Escalações</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}