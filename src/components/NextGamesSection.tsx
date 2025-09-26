'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { getNextFixtures, Fixture } from '@/lib/api'
import Image from 'next/image'

export default function NextGamesSection() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFixtures() {
      const data = await getNextFixtures()
      setFixtures(data)
      setLoading(false)
    }
    fetchFixtures()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benfica-red"></div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fixtures.map((fixture) => (
        <div
          key={fixture.fixture.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-sm text-gray-600 mb-2">
            {fixture.league.name}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <Image
                  src={fixture.teams.home.logo}
                  alt={fixture.teams.home.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-sm">{fixture.teams.home.name}</p>
            </div>
            
            <div className="px-4">
              <p className="text-2xl font-bold">VS</p>
            </div>
            
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <Image
                  src={fixture.teams.away.logo}
                  alt={fixture.teams.away.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-sm">{fixture.teams.away.name}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 text-center">
            <p className="text-lg font-semibold">
              {format(new Date(fixture.fixture.date), "dd 'de' MMMM", { locale: pt })}
            </p>
            <p className="text-gray-600">
              {format(new Date(fixture.fixture.date), 'HH:mm')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {fixture.fixture.venue.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}