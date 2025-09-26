'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { getRecentResults, Fixture } from '@/lib/api'
import Image from 'next/image'

export default function ResultsSection() {
  const [results, setResults] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      const data = await getRecentResults()
      setResults(data)
      setLoading(false)
    }
    fetchResults()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benfica-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((fixture) => {
        const isBenficaHome = fixture.teams.home.id === 211
        const benficaScore = isBenficaHome ? fixture.goals.home : fixture.goals.away
        const opponentScore = isBenficaHome ? fixture.goals.away : fixture.goals.home
        const isWin = benficaScore !== null && opponentScore !== null && benficaScore > opponentScore
        const isDraw = benficaScore === opponentScore
        
        return (
          <div
            key={fixture.fixture.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  {fixture.league.name} - {format(new Date(fixture.fixture.date), "dd 'de' MMMM", { locale: pt })}
                </p>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{fixture.teams.home.name}</p>
                  </div>
                  <Image
                    src={fixture.teams.home.logo}
                    alt={fixture.teams.home.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                
                <div className="text-center min-w-[80px]">
                  <p className="text-2xl font-bold">
                    {fixture.goals.home ?? '-'} : {fixture.goals.away ?? '-'}
                  </p>
                  {fixture.fixture.status.short === 'FT' && (
                    <p className="text-xs text-gray-600 mt-1">Final</p>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <Image
                    src={fixture.teams.away.logo}
                    alt={fixture.teams.away.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div>
                    <p className="font-semibold">{fixture.teams.away.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-right">
                {fixture.fixture.status.short === 'FT' && (
                  <span
                    className={`px-3 py-1 rounded text-white font-semibold ${
                      isWin ? 'bg-green-500' : isDraw ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  >
                    {isWin ? 'Vitória' : isDraw ? 'Empate' : 'Derrota'}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}