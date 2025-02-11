import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { FormEvent } from './FormEvent'
import { useCurrentUserEvents } from '@/hooks/useCurrentUserEvents'
import { useAtomValue } from 'jotai'
import { CalendarEvent } from '@/core/generateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

// Mock hooks
vi.mock('@/hooks/useCurrentUserEvents')
vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>()
  return {
    ...actual,
    useAtomValue: vi.fn(),
  }
})

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn().mockReturnValue({
    collection: vi.fn().mockReturnValue({
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => null }), // Return null or empty object for no data
        set: vi.fn().mockResolvedValue(undefined), // No-op for set
      }),
    }),
  }),
}))

const mockSaveEvent = vi.fn().mockResolvedValue(true)
const mockUpdateEvent = vi.fn().mockResolvedValue(true)
const mockDeleteEvent = vi.fn().mockResolvedValue(true)

describe('FormEvent Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useCurrentUserEvents as Mock).mockReturnValue({
      events: [],
      saveEvent: mockSaveEvent,
      updateEvent: mockUpdateEvent,
      deleteEvent: mockDeleteEvent,
      loading: false,
    })
    ;(useAtomValue as Mock).mockReturnValue({
      year: 2025,
      month: 2,
      day: 10,
    })
  })

  it('should render input fields and buttons', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} />
      </LocalizationProvider>
    )

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument()
    expect(screen.getByText(/Save Event/i)).toBeInTheDocument()
  })

  it('should limit title input to 30 characters', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} />
      </LocalizationProvider>
    )

    const titleInput = screen.getByLabelText(/Title/i)
    fireEvent.change(titleInput, { target: { value: 'A'.repeat(40) } })

    expect((titleInput as HTMLInputElement).value.length).toBe(30)
  })

  it('should allow user to input a city', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} />
      </LocalizationProvider>
    )

    const cityInput = screen.getByLabelText(/City/i)
    fireEvent.change(cityInput, { target: { value: 'New York' } })

    expect((cityInput as HTMLInputElement).value).toBe('New York')
  })

  it('should save an event when valid data is provided', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} />
      </LocalizationProvider>
    )

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Meeting' },
    })
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'Los Angeles' },
    })

    fireEvent.click(screen.getByText(/Save Event/i))

    await waitFor(() => {
      expect(mockSaveEvent).toHaveBeenCalled()
    })
  })

  it('should update an existing event', async () => {
    const calendarEvent: CalendarEvent = {
      eventId: '123',
      text: 'Old Event',
      city: 'San Francisco',
      date: '2025-02-10T10:00:00Z',
      weather: { icon: 'clear-day', description: 'Sunny' },
    }

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} calendarEvent={calendarEvent} />
      </LocalizationProvider>
    )

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Updated Event' },
    })
    fireEvent.click(screen.getByText(/Save Event/i))

    await waitFor(() => {
      expect(mockUpdateEvent).toHaveBeenCalledWith('123', expect.any(Object))
    })
  })

  it('should delete an event', async () => {
    const calendarEvent: CalendarEvent = {
      eventId: '123',
      text: 'Meeting',
      city: 'San Francisco',
      date: '2025-02-10T10:00:00Z',
      weather: { icon: 'clear-day', description: 'Sunny' },
    }

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormEvent handleCallback={vi.fn()} calendarEvent={calendarEvent} />
      </LocalizationProvider>
    )

    fireEvent.click(screen.getByText(/Delete/i))

    await waitFor(() => {
      expect(mockDeleteEvent).toHaveBeenCalledWith('123')
    })
  })
})
