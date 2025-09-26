import { render, screen, waitFor } from '@testing-library/react'
import TeamInfo from '@/components/TeamInfo'
import { getTeamInfo } from '@/lib/api'

jest.mock('@/lib/api')
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

describe('TeamInfo', () => {
  const mockTeamInfo = {
    team: {
      id: 211,
      name: 'Benfica',
      country: 'Portugal',
      founded: 1904,
      logo: 'benfica-logo.png',
    },
    venue: {
      id: 1078,
      name: 'Estádio da Luz',
      address: 'Av. General Norton de Matos',
      city: 'Lisboa',
      capacity: 65647,
      surface: 'grass',
      image: 'stadium.png',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render while loading', () => {
    ;(getTeamInfo as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )
    const { container } = render(<TeamInfo />)
    expect(container.firstChild).toBeNull()
  })

  it('should display team information', async () => {
    ;(getTeamInfo as jest.Mock).mockResolvedValue(mockTeamInfo)
    render(<TeamInfo />)

    await waitFor(() => {
      expect(screen.getByText('Benfica')).toBeInTheDocument()
      expect(screen.getByText(/Fundado:/)).toBeInTheDocument()
      expect(screen.getByText(/1904/)).toBeInTheDocument()
      expect(screen.getByText(/Estádio da Luz/)).toBeInTheDocument()
      expect(screen.getByText(/65.647 lugares/)).toBeInTheDocument()
      expect(screen.getByText(/Lisboa/)).toBeInTheDocument()
    })
  })

  it('should display team logo', async () => {
    ;(getTeamInfo as jest.Mock).mockResolvedValue(mockTeamInfo)
    render(<TeamInfo />)

    await waitFor(() => {
      const logo = screen.getByAltText('SL Benfica')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', 'benfica-logo.png')
    })
  })
})