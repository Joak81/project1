import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'demo_key'
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'v3.football.api-sports.io'
const BENFICA_TEAM_ID = 211 // Benfica's team ID in API-Sports

const api = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
})

export interface Team {
  id: number
  name: string
  logo: string
}

export interface Fixture {
  fixture: {
    id: number
    date: string
    venue: {
      name: string
      city: string
    }
    status: {
      long: string
      short: string
    }
  }
  league: {
    id: number
    name: string
    logo: string
  }
  teams: {
    home: Team
    away: Team
  }
  goals: {
    home: number | null
    away: number | null
  }
}

export interface Player {
  id: number
  name: string
  number: number
  pos: string
  grid: string | null
}

export interface Lineup {
  team: Team
  formation: string
  startXI: Array<{
    player: Player
  }>
  substitutes: Array<{
    player: Player
  }>
  coach: {
    id: number
    name: string
    photo: string
  }
}

// Fetch next fixtures for Benfica
export async function getNextFixtures(limit = 5): Promise<Fixture[]> {
  try {
    const response = await api.get('/fixtures', {
      params: {
        team: BENFICA_TEAM_ID,
        next: limit,
      },
    })
    return response.data.response || []
  } catch (error) {
    console.error('Error fetching fixtures:', error)
    return getMockFixtures()
  }
}

// Fetch recent results
export async function getRecentResults(limit = 5): Promise<Fixture[]> {
  try {
    const response = await api.get('/fixtures', {
      params: {
        team: BENFICA_TEAM_ID,
        last: limit,
      },
    })
    return response.data.response || []
  } catch (error) {
    console.error('Error fetching results:', error)
    return getMockResults()
  }
}

// Fetch team information
export async function getTeamInfo() {
  try {
    const response = await api.get('/teams', {
      params: {
        id: BENFICA_TEAM_ID,
      },
    })
    return response.data.response?.[0] || getMockTeamInfo()
  } catch (error) {
    console.error('Error fetching team info:', error)
    return getMockTeamInfo()
  }
}

// Fetch lineup for a specific fixture
export async function getLineup(fixtureId: number): Promise<Lineup | null> {
  try {
    const response = await api.get('/fixtures/lineups', {
      params: {
        fixture: fixtureId,
      },
    })
    const lineups = response.data.response || []
    return lineups.find((l: Lineup) => l.team.id === BENFICA_TEAM_ID) || null
  } catch (error) {
    console.error('Error fetching lineup:', error)
    return getMockLineup()
  }
}

// Mock data for development/demo
function getMockFixtures(): Fixture[] {
  return [
    {
      fixture: {
        id: 1,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        venue: { name: 'Estádio da Luz', city: 'Lisboa' },
        status: { long: 'Not Started', short: 'NS' },
      },
      league: {
        id: 94,
        name: 'Primeira Liga',
        logo: 'https://media.api-sports.io/football/leagues/94.png',
      },
      teams: {
        home: {
          id: 211,
          name: 'Benfica',
          logo: 'https://media.api-sports.io/football/teams/211.png',
        },
        away: {
          id: 228,
          name: 'Sporting CP',
          logo: 'https://media.api-sports.io/football/teams/228.png',
        },
      },
      goals: { home: null, away: null },
    },
    {
      fixture: {
        id: 2,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        venue: { name: 'Estádio do Dragão', city: 'Porto' },
        status: { long: 'Not Started', short: 'NS' },
      },
      league: {
        id: 94,
        name: 'Primeira Liga',
        logo: 'https://media.api-sports.io/football/leagues/94.png',
      },
      teams: {
        home: {
          id: 212,
          name: 'FC Porto',
          logo: 'https://media.api-sports.io/football/teams/212.png',
        },
        away: {
          id: 211,
          name: 'Benfica',
          logo: 'https://media.api-sports.io/football/teams/211.png',
        },
      },
      goals: { home: null, away: null },
    },
  ]
}

function getMockResults(): Fixture[] {
  return [
    {
      fixture: {
        id: 3,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        venue: { name: 'Estádio da Luz', city: 'Lisboa' },
        status: { long: 'Match Finished', short: 'FT' },
      },
      league: {
        id: 94,
        name: 'Primeira Liga',
        logo: 'https://media.api-sports.io/football/leagues/94.png',
      },
      teams: {
        home: {
          id: 211,
          name: 'Benfica',
          logo: 'https://media.api-sports.io/football/teams/211.png',
        },
        away: {
          id: 810,
          name: 'Braga',
          logo: 'https://media.api-sports.io/football/teams/810.png',
        },
      },
      goals: { home: 3, away: 1 },
    },
  ]
}

function getMockTeamInfo() {
  return {
    team: {
      id: 211,
      name: 'Benfica',
      country: 'Portugal',
      founded: 1904,
      logo: 'https://media.api-sports.io/football/teams/211.png',
    },
    venue: {
      id: 1078,
      name: 'Estádio da Luz',
      address: 'Av. General Norton de Matos',
      city: 'Lisboa',
      capacity: 65647,
      surface: 'grass',
      image: 'https://media.api-sports.io/football/venues/1078.png',
    },
  }
}

function getMockLineup(): Lineup {
  return {
    team: {
      id: 211,
      name: 'Benfica',
      logo: 'https://media.api-sports.io/football/teams/211.png',
    },
    formation: '4-3-3',
    startXI: [
      { player: { id: 1, name: 'Trubin', number: 1, pos: 'G', grid: '1:1' } },
      { player: { id: 2, name: 'Bah', number: 6, pos: 'D', grid: '2:4' } },
      { player: { id: 3, name: 'Otámendi', number: 30, pos: 'D', grid: '2:3' } },
      { player: { id: 4, name: 'António Silva', number: 4, pos: 'D', grid: '2:2' } },
      { player: { id: 5, name: 'Carreras', number: 3, pos: 'D', grid: '2:1' } },
      { player: { id: 6, name: 'Aursnes', number: 8, pos: 'M', grid: '3:3' } },
      { player: { id: 7, name: 'Florentino', number: 61, pos: 'M', grid: '3:2' } },
      { player: { id: 8, name: 'Kökçü', number: 10, pos: 'M', grid: '3:1' } },
      { player: { id: 9, name: 'Di María', number: 11, pos: 'F', grid: '4:3' } },
      { player: { id: 10, name: 'Pavlidis', number: 14, pos: 'F', grid: '4:2' } },
      { player: { id: 11, name: 'Aktürkoğlu', number: 17, pos: 'F', grid: '4:1' } },
    ],
    substitutes: [
      { player: { id: 12, name: 'Samuel Soares', number: 24, pos: 'G', grid: null } },
      { player: { id: 13, name: 'Beste', number: 37, pos: 'D', grid: null } },
      { player: { id: 14, name: 'Schjelderup', number: 21, pos: 'M', grid: null } },
      { player: { id: 15, name: 'Arthur Cabral', number: 9, pos: 'F', grid: null } },
    ],
    coach: {
      id: 1,
      name: 'Bruno Lage',
      photo: 'https://media.api-sports.io/football/coachs/1.png',
    },
  }
}

export default api