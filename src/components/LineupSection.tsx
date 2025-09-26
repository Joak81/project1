'use client'

import { useState, useEffect } from 'react'
import { getLineup, getRecentResults, Lineup } from '@/lib/api'

export default function LineupSection() {
  const [lineup, setLineup] = useState<Lineup | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLineup() {
      // Get the most recent match to fetch its lineup
      const results = await getRecentResults(1)
      if (results.length > 0) {
        const lineupData = await getLineup(results[0].fixture.id)
        setLineup(lineupData)
      }
      setLoading(false)
    }
    fetchLineup()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benfica-red"></div>
      </div>
    )
  }

  if (!lineup) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Escalação não disponível no momento</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Formação: {lineup.formation}</h3>
        <p className="text-gray-600">Treinador: {lineup.coach.name}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Starting XI */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-benfica-red">11 Inicial</h4>
          <div className="space-y-2">
            {lineup.startXI.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg w-8 text-center">
                    {item.player.number}
                  </span>
                  <span className="font-medium">{item.player.name}</span>
                </div>
                <span className="text-sm bg-benfica-red text-white px-3 py-1 rounded">
                  {item.player.pos}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Substitutes */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-gray-700">Suplentes</h4>
          <div className="space-y-2">
            {lineup.substitutes.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg w-8 text-center">
                    {item.player.number}
                  </span>
                  <span className="font-medium">{item.player.name}</span>
                </div>
                <span className="text-sm bg-gray-600 text-white px-3 py-1 rounded">
                  {item.player.pos}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}