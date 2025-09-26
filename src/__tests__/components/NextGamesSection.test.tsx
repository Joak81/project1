import { render, screen, waitFor } from '@testing-library/react'
import NextGamesSection from '@/components/NextGamesSection'
import { getNextFixtures } from '@/lib/api'

jest.mock('@/lib/api')
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

describe('NextGamesSection', () => {
  const mockFixtures = [
    {
      fixture: {
        id: 1,
        date: '2025-01-15T20:00:00Z',
        venue: { name: 'Estádio da Luz', city: 'Lisboa' },
        status: { long: 'Not Started', short: 'NS' },
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
          id: 228,
          name: 'Sporting CP',
          logo: 'sporting-logo.png',
        },
      },
      goals: { home: null, away: null },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading spinner initially', () => {
    ;(getNextFixtures as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<NextGamesSection />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should display fixtures after loading', async () => {
    ;(getNextFixtures as jest.Mock).mockResolvedValue(mockFixtures)
    render(<NextGamesSection />)

    await waitFor(() => {
      expect(screen.getByText('Benfica')).toBeInTheDocument()
      expect(screen.getByText('Sporting CP')).toBeInTheDocument()
      expect(screen.getByText('Primeira Liga')).toBeInTheDocument()
      expect(screen.getByText('Estádio da Luz')).toBeInTheDocument()
    })
  })

  it('should format date correctly', async () => {
    ;(getNextFixtures as jest.Mock).mockResolvedValue(mockFixtures)
    render(<NextGamesSection />)

    await waitFor(() => {
      expect(screen.getByText(/15 de janeiro/i)).toBeInTheDocument()
      expect(screen.getByText('20:00')).toBeInTheDocument()
    })
  })

  it('should display VS between teams', async () => {
    ;(getNextFixtures as jest.Mock).mockResolvedValue(mockFixtures)
    render(<NextGamesSection />)

    await waitFor(() => {
      expect(screen.getByText('VS')).toBeInTheDocument()
    })
  })
})