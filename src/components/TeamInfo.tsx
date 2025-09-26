'use client'

import { useEffect, useState } from 'react'
import { getTeamInfo } from '@/lib/api'
import Image from 'next/image'

export default function TeamInfo() {
  const [teamInfo, setTeamInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamInfo() {
      const data = await getTeamInfo()
      setTeamInfo(data)
      setLoading(false)
    }
    fetchTeamInfo()
  }, [])

  if (loading || !teamInfo) {
    return null
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src={teamInfo.team.logo}
              alt="SL Benfica"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{teamInfo.team.name}</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Fundado:</strong> {teamInfo.team.founded}</p>
              <p><strong>Estádio:</strong> {teamInfo.venue.name}</p>
              <p><strong>Capacidade:</strong> {teamInfo.venue.capacity.toLocaleString()} lugares</p>
              <p><strong>Cidade:</strong> {teamInfo.venue.city}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}