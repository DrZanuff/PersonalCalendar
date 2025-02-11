import { describe, expect, test } from 'vitest'
import {
  generateCalendar,
  CalendarEvent,
  DayName,
} from '@/core/generateCalendar'
import type { Weeks } from '@/core/generateCalendar'

const findDay = (weeks: Weeks, targetDay: number) =>
  weeks.flat().find((day) => day.day === targetDay)

describe('generateCalendar', () => {
  test('should generate a 6-week calendar', () => {
    const date = new Date(2025, 1, 1)
    const events: CalendarEvent[] = []

    const weeks = generateCalendar(date, events)

    expect(weeks).toHaveLength(6)
    expect(weeks[0]).toHaveLength(7)
  })

  test('should correctly mark the current date', () => {
    const today = new Date()
    const weeks = generateCalendar(today, [])

    const foundDay = findDay(weeks, today.getDate())
    expect(foundDay).toBeDefined()
    expect(foundDay!.currentDate).toBe(true)
  })

  test('should correctly identify weekends', () => {
    const date = new Date(2025, 1, 1)
    const weeks = generateCalendar(date, [])

    const saturdays = weeks
      .flat()
      .filter((day) => day.dayName === DayName.Saturday)
    const sundays = weeks.flat().filter((day) => day.dayName === DayName.Sunday)

    expect(saturdays.every((day) => day.isWeekend)).toBe(true)
    expect(sundays.every((day) => day.isWeekend)).toBe(true)
  })

  test('should correctly mark days from previous and next month', () => {
    const date = new Date(2025, 1, 1)
    const weeks = generateCalendar(date, [])

    const firstWeek = weeks[0]
    const lastWeek = weeks[5]

    expect(firstWeek.some((day) => !day.currentMonth)).toBe(true)
    expect(lastWeek.some((day) => !day.currentMonth)).toBe(true)
  })

  test('should assign events to correct days', () => {
    const date = new Date(2025, 1, 1)
    const eventDate = '2025-02-14T10:00:00Z'
    const events: CalendarEvent[] = [
      {
        text: "Valentine's Day",
        city: 'New York',
        date: eventDate,
        weather: {
          icon: 'snow',
          description: 'Snowy day',
        },
      },
    ]

    const weeks = generateCalendar(date, events)
    const eventDay = findDay(weeks, 14)

    expect(eventDay).toBeDefined()
    expect(eventDay!.events).toHaveLength(1)
    expect(eventDay!.events[0].text).toBe("Valentine's Day")
  })

  test('should not assign events to incorrect days', () => {
    const date = new Date(2025, 1, 1)
    const eventDate = '2025-02-14T10:00:00Z'
    const events: CalendarEvent[] = [
      {
        text: "Valentine's Day",
        city: 'New York',
        date: eventDate,
        weather: {
          icon: 'snow',
          description: 'Snowy day',
        },
      },
    ]

    const weeks = generateCalendar(date, events)
    const randomDay = findDay(weeks, 10)

    expect(randomDay).toBeDefined()
    expect(randomDay!.events).toHaveLength(0)
  })
})
