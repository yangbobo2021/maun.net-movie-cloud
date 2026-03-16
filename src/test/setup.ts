import { vi } from 'vitest';
import { act } from '@testing-library/react';

// Mock Next.js router - needs to be before component imports

// Helper function to wait for state updates
export const waitForStateUpdate = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => setTimeout(resolve, 50));
  });
};

// Store original render function
let originalRender: any;

// Patch React Testing Library's render to automatically wait for state updates
beforeEach(() => {
  // This will be called before each test
});

afterEach(() => {
  // Cleanup after each test
});
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({ shortPlayId: 'test-123' }),
  useSearchParams: () => ({
    get: vi.fn((key: string) => (key === 'ep' ? '1' : null)),
    toString: () => '',
  }),
  usePathname: () => '/watch/shortmax/test-123',
}));

// Mock hls.js with a spy we can inspect
vi.mock('hls.js', () => {
  let mockVideoInstance: any = null;
  let playRejects = false;

  return {
    default: class MockHLS {
      static isSupported() { return true; }
      static Events = {
        MANIFEST_PARSED: 'MANIFEST_PARSED',
        ERROR: 'ERROR',
      };

      static _setMockVideo(video: any, shouldReject: boolean) {
        mockVideoInstance = video;
        playRejects = shouldReject;
      }

      static _reset() {
        mockVideoInstance = null;
        playRejects = false;
      }

      constructor(config: any) {
        this.config = config;
        this.destroyed = false;
        this.handlers = new Map<string, any>();
      }

      loadSource(url: string) {
        // Simulate MANIFEST_PARSED event after loading
        setTimeout(() => {
          if (!this.destroyed) {
            const handler = this.handlers.get('MANIFEST_PARSED');
            if (handler) {
              act(() => {
                handler();
              });
              // After handler is called, wait for React state updates
              setTimeout(() => {
                // Force another React update cycle
                if (handler) {
                  act(() => {});
                }
              }, 100);
            }
          }
        }, 50);
      }

      attachMedia(video: any) {
        mockVideoInstance = video;
      }

      destroy() {
        this.destroyed = true;
      }

      on(event: string, handler: any) {
        this.handlers.set(event, handler);
      }

      off(event: string, handler?: any) {}
      startLoad() {}
      stopLoad() {}
    },

    // Test helpers
    _test: {
      getMockVideo: () => mockVideoInstance,
      setPlayRejects: (reject: boolean) => { playRejects = reject; },
    },
  };
});

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: {
      success: true,
      shortPlayId: 123,
      title: 'Test Drama',
      totalEpisodes: 1,
    },
    isLoading: false,
    error: null,
  })),
  useInfiniteQuery: vi.fn(),
}));

// Mock the hooks
vi.mock('@/hooks/useShortMax', () => ({
  useShortMaxDetail: vi.fn(() => ({
    data: {
      success: true,
      shortPlayId: 123,
      title: 'Test Drama',
      totalEpisodes: 1,
    },
    isLoading: false,
    error: null,
  })),
  useShortMaxAllEpisodes: vi.fn(() => ({
    data: {
      success: true,
      shortPlayId: 123,
      shortPlayName: 'Test Drama',
      totalEpisodes: 1,
      count: 1,
      episodes: [
        {
          episodeNumber: 1,
          id: 101,
          duration: 120,
          locked: false,
          needDecrypt: false,
          cover: 'https://example.com/cover.jpg',
          videoUrl: {
            video_480: 'https://example.com/video.m3u8',
            video_720: 'https://example.com/video.m3u8',
            video_1080: 'https://example.com/video.m3u8',
          },
        },
      ],
    },
    isLoading: false,
    error: null,
  })),
}));

export {};
