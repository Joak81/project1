import axios from 'axios'
import { getNextFixtures, getRecentResults, getTeamInfo, getLineup } from '@/lib/api'

jest.mock('axios')

describe('API Functions', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  beforeEach(() => {
    jest.clearAllMocks()
    mockedAxios.create.mockReturnValue({
      get: jest.fn(),
    } as any)
  })

  describe('getNextFixtures', () => {
    it('should fetch next fixtures successfully', async () => {
      const mockData = {
        data: {
          response: [
            { fixture: { id: 1 }, teams: { home: { id: 211 } } },
          ],
        },
      }

      const mockGet = jest.fn().mockResolvedValue(mockData)
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getNextFixtures()
      
      expect(mockGet).toHaveBeenCalledWith('/fixtures', {
        params: {
          team: 211,
          next: 5,
        },
      })
      expect(result).toEqual(mockData.data.response)
    })

    it('should return mock data on error', async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error('API Error'))
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getNextFixtures()
      
      expect(result).toHaveLength(2)
      expect(result[0].teams.home.name).toBe('Benfica')
    })
  })

  describe('getRecentResults', () => {
    it('should fetch recent results successfully', async () => {
      const mockData = {
        data: {
          response: [
            { fixture: { id: 2 }, goals: { home: 2, away: 1 } },
          ],
        },
      }

      const mockGet = jest.fn().mockResolvedValue(mockData)
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getRecentResults(3)
      
      expect(mockGet).toHaveBeenCalledWith('/fixtures', {
        params: {
          team: 211,
          last: 3,
        },
      })
      expect(result).toEqual(mockData.data.response)
    })
  })

  describe('getTeamInfo', () => {
    it('should fetch team info successfully', async () => {
      const mockData = {
        data: {
          response: [
            {
              team: { id: 211, name: 'Benfica' },
              venue: { name: 'Estádio da Luz' },
            },
          ],
        },
      }

      const mockGet = jest.fn().mockResolvedValue(mockData)
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getTeamInfo()
      
      expect(mockGet).toHaveBeenCalledWith('/teams', {
        params: {
          id: 211,
        },
      })
      expect(result).toEqual(mockData.data.response[0])
    })
  })

  describe('getLineup', () => {
    it('should fetch lineup successfully', async () => {
      const mockData = {
        data: {
          response: [
            {
              team: { id: 211 },
              formation: '4-3-3',
              startXI: [],
            },
          ],
        },
      }

      const mockGet = jest.fn().mockResolvedValue(mockData)
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getLineup(123)
      
      expect(mockGet).toHaveBeenCalledWith('/fixtures/lineups', {
        params: {
          fixture: 123,
        },
      })
      expect(result).toEqual(mockData.data.response[0])
    })

    it('should return null when lineup not found', async () => {
      const mockData = {
        data: {
          response: [
            {
              team: { id: 999 },
              formation: '4-4-2',
            },
          ],
        },
      }

      const mockGet = jest.fn().mockResolvedValue(mockData)
      mockedAxios.create.mockReturnValue({ get: mockGet } as any)

      const result = await getLineup(123)
      expect(result).toBeNull()
    })
  })
})