import { renderHook } from '@testing-library/react'
import type { CalendarEvent } from '@/core/generateCalendar'
import { useWeatherIcon } from './useWeatherIcon'

vi.mock('@/assets/wheater/mono/snow.svg', () => ({
  default: 'snow-mono-icon',
}))
vi.mock('@/assets/wheater/color/snow.svg', () => ({
  default: 'snow-color-icon',
}))
vi.mock('@/assets/wheater/color/snow-showers-day.svg', () => ({
  default: 'snow-showers-day-color-icon',
}))

describe('useWeatherIcon', () => {
  const mockEvent: CalendarEvent = {
    text: 'Event 1',
    city: 'City 1',
    date: '2025-02-08',
    weather: {
      icon: 'snow',
      description: 'Snowy',
    },
  }

  it('should return the correct icon path for mono type', () => {
    const { result } = renderHook(() => useWeatherIcon('mono', mockEvent))

    expect(result.current).toBe('snow-mono-icon')
  })

  it('should return the correct icon path for color type', () => {
    const { result } = renderHook(() => useWeatherIcon('color', mockEvent))

    expect(result.current).toBe('snow-color-icon')
  })

  it('should return the correct icon path for "showers-day" with color type', () => {
    const mockEventShowersDay: CalendarEvent = {
      text: 'Event 2',
      city: 'City 2',
      date: '2025-02-08',
      weather: {
        icon: 'snow-showers-day',
        description: 'Showers and snow during the day',
      },
    }

    const { result } = renderHook(() =>
      useWeatherIcon('color', mockEventShowersDay)
    )

    expect(result.current).toBe('snow-showers-day-color-icon')
  })
})
