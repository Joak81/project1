import { render, screen, waitFor } from '@testing-library/react'
import ResultsSection from '@/components/ResultsSection'
import { getRecentResults } from '@/lib/api'

jest.mock('@/lib/api')
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

describe('ResultsSection', () => {
  const mockResults = [
    {
      fixture: {
        id: 1,
        date: '2025-01-10T20:00:00Z',
        venue: { name: 'Estádio da Luz', city: 'Lisboa' },
        status: { long: 'Match Finished', short: 'FT' },
      },
      league: {
        id: 94,
        name: 'Primeira Liga',
        logo: 'league-logo.png',
      },
      teams: {
        home: {
          id: 211,
          name: 'Benfica',
          logo: 'benfica-logo.png',
        },
        away: {
          id: 810,
          name: 'Braga',
          logo: 'braga-logo.png',
        },
      },
      goals: { home: 3, away: 1 },
    },
    {
      fixture: {
        id: 2,
        date: '2025-01-05T18:00:00Z',
        venue: { name: 'Estádio do Dragão', city: 'Porto' },
        status: { long: 'Match Finished', short: 'FT' },
      },
      league: {
        id: 94,
        name: 'Primeira Liga',
        logo: 'league-logo.png',
      },
      teams: {
        home: {
          id: 212,
          name: 'Porto',
          logo: 'porto-logo.png',
        },
        away: {
          id: 211,
          name: 'Benfica',
          logo: 'benfica-logo.png',
        },
      },
      goals: { home: 1, away: 1 },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading spinner initially', () => {
    ;(getRecentResults as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<ResultsSection />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should display match results', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    render(<ResultsSection />)

    await waitFor(() => {
      expect(screen.getByText('Benfica')).toBeInTheDocument()
      expect(screen.getByText('Braga')).toBeInTheDocument()
      expect(screen.getByText('3 : 1')).toBeInTheDocument()
    })
  })

  it('should display victory badge for wins', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    render(<ResultsSection />)

    await waitFor(() => {
      expect(screen.getByText('Vitória')).toBeInTheDocument()
    })
  })

  it('should display draw badge for draws', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    render(<ResultsSection />)

    await waitFor(() => {
      expect(screen.getByText('Empate')).toBeInTheDocument()
    })
  })

  it('should format dates correctly', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    render(<ResultsSection />)

    await waitFor(() => {
      expect(screen.getByText(/10 de janeiro/i)).toBeInTheDocument()
      expect(screen.getByText(/5 de janeiro/i)).toBeInTheDocument()
    })
  })
})