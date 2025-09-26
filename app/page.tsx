'use client'

import { useEffect, useState } from 'react'
import NextGamesSection from '@/components/NextGamesSection'
import LineupSection from '@/components/LineupSection'
import TeamInfo from '@/components/TeamInfo'
import ResultsSection from '@/components/ResultsSection'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-benfica-red mx-auto"></div>
          <p className="mt-4 text-gray-600">A carregar informações do Benfica...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-benfica-red to-red-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Sport Lisboa e Benfica</h1>
          <p className="text-xl">E Pluribus Unum - Rumo ao 39º</p>
        </div>
      </section>

      {/* Team Info */}
      <TeamInfo />

      {/* Next Games Section */}
      <section id="jogos" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Próximos Jogos</h2>
          <NextGamesSection />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Últimos Resultados</h2>
          <ResultsSection />
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Escalação Habitual</h2>
          <LineupSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-benfica-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 SL Benfica Info - Desenvolvido com ❤️</p>
          <p className="text-sm mt-2 text-gray-400">Dados fornecidos por API-Sports</p>
        </div>
      </footer>
    </main>
  )
}