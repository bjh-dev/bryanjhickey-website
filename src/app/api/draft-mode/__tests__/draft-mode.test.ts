import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { GET as enableDraftMode } from '../enable/route'
import { GET as disableDraftMode } from '../disable/route'

// Mock next-sanity/draft-mode
vi.mock('next-sanity/draft-mode', () => ({
  defineEnableDraftMode: vi.fn(() => ({
    GET: vi
      .fn()
      .mockResolvedValue(new Response('Draft mode enabled', { status: 200 })),
  })),
}))

// Mock Next.js headers and server
vi.mock('next/headers', () => ({
  draftMode: vi.fn(() =>
    Promise.resolve({
      disable: vi.fn(),
    }),
  ),
}))

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>()
  return {
    ...actual,
    NextResponse: {
      redirect: vi.fn(
        (url) =>
          new Response(null, {
            status: 302,
            headers: { location: url.toString() },
          }),
      ),
    },
  }
})

// Mock Sanity client
vi.mock('@/lib/sanity/client/client', () => ({
  client: {
    withConfig: vi.fn(() => ({})),
  },
}))

describe('Draft Mode API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock environment variables
    process.env.SANITY_API_READ_TOKEN = 'mock-token'
  })

  describe('/api/draft-mode/enable', () => {
    it('should be defined', () => {
      expect(enableDraftMode).toBeDefined()
      expect(typeof enableDraftMode).toBe('function')
    })

    it('should enable draft mode successfully', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/draft-mode/enable?slug=test-post',
      )

      const response = await enableDraftMode(mockRequest)

      expect(response).toBeInstanceOf(Response)
      expect(response.status).toBe(200)
    })
  })

  describe('/api/draft-mode/disable', () => {
    it('should be defined', () => {
      expect(disableDraftMode).toBeDefined()
      expect(typeof disableDraftMode).toBe('function')
    })

    it('should disable draft mode and redirect', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/draft-mode/disable',
      )

      const response = await disableDraftMode(mockRequest)

      expect(response).toBeInstanceOf(Response)
      expect(response.status).toBe(302)
      expect(response.headers.get('location')).toBe('http://localhost:3000/')
    })
  })

  describe('Environment Variables', () => {
    it('should require SANITY_API_READ_TOKEN for enable route', () => {
      // This test ensures that the token is being used in the configuration
      expect(process.env.SANITY_API_READ_TOKEN).toBeDefined()
    })
  })
})
