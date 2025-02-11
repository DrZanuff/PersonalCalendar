import { render, screen, within } from '@testing-library/react'
import { CalendarView } from './CalendarView'
import { generateCalendar } from '@/core/generateCalendar'

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

describe('CalendarView', () => {
  const mockWeeks = generateCalendar(new Date(), [])

  it('should render the correct number of weeks and days', () => {
    render(<CalendarView weeks={mockWeeks} />)

    const weeks = screen.getAllByTestId(/week-/)
    expect(weeks).toHaveLength(mockWeeks.length)

    weeks.forEach((week) => {
      const days = within(week).getAllByTestId(/day-/)
      expect(days).toHaveLength(7)
    })
  })

  it('should render the correct day and dayName for each day', () => {
    render(<CalendarView weeks={mockWeeks} />)

    const firstDayOfFirstWeek = mockWeeks[0][0]
    const firstDayOfFirstWeekTestId = `day-${firstDayOfFirstWeek.day}-${firstDayOfFirstWeek.dayName}-${firstDayOfFirstWeek.monthName}`
    const firstDayOfSecondWeek = mockWeeks[1][0]
    const firstDayOfSecondWeekId = `day-${firstDayOfSecondWeek.day}-${firstDayOfSecondWeek.dayName}-${firstDayOfSecondWeek.monthName}`
    const lastDayOfLastWeek = mockWeeks[5][6]
    const lastDayOfLastWeekId = `day-${lastDayOfLastWeek.day}-${lastDayOfLastWeek.dayName}-${lastDayOfLastWeek.monthName}`

    const firstDay = screen.getByTestId(firstDayOfFirstWeekTestId)
    expect(firstDay).toHaveTextContent(`${firstDayOfFirstWeek.day}`)

    const secondDay = screen.getByTestId(firstDayOfSecondWeekId)
    expect(secondDay).toHaveTextContent(`${firstDayOfSecondWeek.day}`)

    const lastDay = screen.getByTestId(lastDayOfLastWeekId)
    expect(lastDay).toHaveTextContent(`${lastDayOfLastWeek.day}`)
  })

  // TODO - Add tests to check for events
})
