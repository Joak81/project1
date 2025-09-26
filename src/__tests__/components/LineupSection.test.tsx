import { render, screen, waitFor } from '@testing-library/react'
import LineupSection from '@/components/LineupSection'
import { getLineup, getRecentResults } from '@/lib/api'

jest.mock('@/lib/api')

describe('LineupSection', () => {
  const mockLineup = {
    team: {
      id: 211,
      name: 'Benfica',
      logo: 'benfica-logo.png',
    },
    formation: '4-3-3',
    startXI: [
      { player: { id: 1, name: 'Trubin', number: 1, pos: 'G', grid: '1:1' } },
      { player: { id: 2, name: 'Bah', number: 6, pos: 'D', grid: '2:4' } },
    ],
    substitutes: [
      { player: { id: 12, name: 'Samuel Soares', number: 24, pos: 'G', grid: null } },
    ],
    coach: {
      id: 1,
      name: 'Bruno Lage',
      photo: 'coach.png',
    },
  }

  const mockResults = [
    {
      fixture: { id: 123 },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading spinner initially', () => {
    ;(getRecentResults as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    render(<LineupSection />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('should display lineup information', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    ;(getLineup as jest.Mock).mockResolvedValue(mockLineup)
    
    render(<LineupSection />)

    await waitFor(() => {
      expect(screen.getByText('Formação: 4-3-3')).toBeInTheDocument()
      expect(screen.getByText('Treinador: Bruno Lage')).toBeInTheDocument()
    })
  })

  it('should display starting XI players', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    ;(getLineup as jest.Mock).mockResolvedValue(mockLineup)
    
    render(<LineupSection />)

    await waitFor(() => {
      expect(screen.getByText('11 Inicial')).toBeInTheDocument()
      expect(screen.getByText('Trubin')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('G')).toBeInTheDocument()
    })
  })

  it('should display substitute players', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    ;(getLineup as jest.Mock).mockResolvedValue(mockLineup)
    
    render(<LineupSection />)

    await waitFor(() => {
      expect(screen.getByText('Suplentes')).toBeInTheDocument()
      expect(screen.getByText('Samuel Soares')).toBeInTheDocument()
      expect(screen.getByText('24')).toBeInTheDocument()
    })
  })

  it('should display message when no lineup available', async () => {
    ;(getRecentResults as jest.Mock).mockResolvedValue(mockResults)
    ;(getLineup as jest.Mock).mockResolvedValue(null)
    
    render(<LineupSection />)

    await waitFor(() => {
      expect(screen.getByText('Escalação não disponível no momento')).toBeInTheDocument()
    })
  })
})