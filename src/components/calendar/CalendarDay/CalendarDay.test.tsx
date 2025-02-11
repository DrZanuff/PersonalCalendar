import { render } from '@testing-library/react'
import { CalendarDay } from './CalendarDay'
import type { CalendarDayProps } from './CalendarDay.types'
import { DayName, MonthName } from '@/core/generateCalendar'

describe('CalendarDay Component', () => {
  const mockCalendarDay: CalendarDayProps['calendarDay'] = {
    day: 8,
    month: 1,
    year: 2025,
    currentMonth: true,
    currentDate: false,
    isWeekend: false,
    dayName: DayName.Monday,
    monthName: MonthName.February,
    weather: {
      icon: 'snow',
      description: 'Snowy',
    },
    events: [
      {
        text: 'Event 1',
        city: 'City 1',
        date: '2025-02-08',
        weather: { icon: 'snow', description: 'Snowy' },
      },
    ],
  }

  const mockCalendarDayWithTwoEvents: CalendarDayProps['calendarDay'] = {
    ...mockCalendarDay,
    events: [
      {
        text: 'Event 1',
        city: 'City 1',
        date: '2025-02-08',
        weather: { icon: 'snow', description: 'Snowy' },
      },
      {
        text: 'Event 2',
        city: 'City 1',
        date: '2025-02-08',
        weather: { icon: 'snow', description: 'Snowy' },
      },
    ],
  }

  const mockCalendarDayWithThreeEvents: CalendarDayProps['calendarDay'] = {
    ...mockCalendarDay,
    events: [
      {
        text: 'Event 1',
        city: 'City 1',
        date: '2025-02-08',
        weather: { icon: 'snow', description: 'Snowy' },
      },
      {
        text: 'Event 2',
        city: 'City 1',
        date: '2025-02-08',
        weather: { icon: 'snow', description: 'Snowy' },
      },
    ],
  }

  it('should render the CalendarDay component', () => {
    const { getByTestId } = render(
      <CalendarDay calendarDay={mockCalendarDay} />
    )

    const dayElement = getByTestId(
      `day-${mockCalendarDay.day}-${mockCalendarDay.dayName}-${mockCalendarDay.monthName}`
    )
    expect(dayElement).toBeInTheDocument()
    expect(dayElement).toHaveTextContent('8')
  })

  it('should display the correct event count', () => {
    const { getByText } = render(<CalendarDay calendarDay={mockCalendarDay} />)

    expect(getByText('1 event')).toBeInTheDocument()
  })

  it('should display the correct event count if there are more than one event', () => {
    const { getByText } = render(
      <CalendarDay calendarDay={mockCalendarDayWithTwoEvents} />
    )

    expect(getByText('2 events')).toBeInTheDocument()
  })

  it('should not display event count if there are no events', () => {
    const noEventMock = { ...mockCalendarDay, events: [] }
    const { queryByText } = render(<CalendarDay calendarDay={noEventMock} />)

    expect(queryByText('event')).toBeNull()
  })

  it('should not render more than two events', () => {
    const { getAllByTestId } = render(
      <CalendarDay calendarDay={mockCalendarDayWithThreeEvents} />
    )

    const eventTags = getAllByTestId('event-tag')
    expect(eventTags.length).toBe(2)
  })

  it('should render EventTag for each event', () => {
    const { getAllByTestId } = render(
      <CalendarDay calendarDay={mockCalendarDay} />
    )

    const eventTags = getAllByTestId('event-tag')
    expect(eventTags.length).toBe(mockCalendarDay.events.length)
  })
})
