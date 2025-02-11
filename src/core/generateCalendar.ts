import { IconName } from '@/hooks/useWeatherIcon'
import {
  addDays,
  endOfMonth,
  startOfMonth,
  subDays,
  getDay,
  getMonth,
  isSameDay,
} from 'date-fns'

/**
 * Enum representing the days of the week in English.
 */
enum DayName {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

/**
 * Enum representing the days of the week in English.
 * This enum maps numeric days (0 for Sunday, 1 for Monday, etc.) to their corresponding string representations.
 */
enum MonthName {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

/**
 * Represents a wheater.
 */
export type Weather = {
  icon: IconName
  description: string
}

/**
 * Represents an event in the calendar.
 */
type CalendarEvent = {
  /** The event description */
  text: string
  /** The city where the event takes place */
  city: string
  /** The date of the event (ISO string format) */
  date: string
  /** Current wehater of the event */
  weather: Weather
  /** UUID */
  eventId?: string
}

/**
 * Represents a single day's information in the calendar.
 */
type CalendarDay = {
  /** Numeric representation of the day */
  day: number
  /** Numeric representation of the years */
  year: number
  /** Numeric representation of the month */
  month: number
  /** Whether the day belongs to the current month */
  currentMonth: boolean
  /** Whether this day is today's date */
  currentDate: boolean
  /** Whether this day is a weekend (Saturday or Sunday) */
  isWeekend: boolean
  /** Name of the day of the week */
  dayName: DayName
  /** Name of the day of the week */
  monthName: MonthName
  /** Weather information */
  weather: Weather | null
  /** List of events occurring on this day */
  events: CalendarEvent[]
}

type Weeks = CalendarDay[][]

/**
 * Generates a calendar structure for a given month, including events.
 *
 * @param {Date} date - The reference date for the month to generate.
 * @param {Event[]} events - A list of events to include in the calendar.
 * @returns {Weeks} An array containing 6 weeks, each consisting of 7 days.
 */
const generateCalendar = (date: Date, events: CalendarEvent[]): Weeks => {
  const startOfCurrentMonth = startOfMonth(date)
  const endOfCurrentMonth = endOfMonth(date)

  let currentDay = subDays(startOfCurrentMonth, getDay(startOfCurrentMonth))
  let weeks: CalendarDay[][] = []
  let week: CalendarDay[] = []

  while (weeks.length < 6) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = events.filter((event) =>
        isSameDay(new Date(event.date), currentDay)
      )

      week.push({
        day: currentDay.getDate(),
        year: currentDay.getFullYear(),
        month: currentDay.getMonth() + 1,
        currentMonth:
          currentDay >= startOfCurrentMonth && currentDay <= endOfCurrentMonth,
        currentDate: isSameDay(currentDay, new Date()),
        isWeekend: getDay(currentDay) === 0 || getDay(currentDay) === 6,
        dayName: Object.values(DayName)[getDay(currentDay)],
        monthName: Object.values(MonthName)[getMonth(currentDay)],
        weather: null,
        events: dayEvents,
      })

      currentDay = addDays(currentDay, 1)
    }

    weeks.push(week)
    week = []

    // We need to guarantee that months with fewer days will still have exactly six weeks
    if (currentDay > endOfCurrentMonth && weeks.length === 5) {
      while (weeks.length < 6) {
        for (let i = 0; i < 7; i++) {
          week.push({
            day: currentDay.getDate(),
            year: currentDay.getFullYear(),
            month: currentDay.getMonth() + 1,
            currentMonth: false,
            currentDate: false,
            isWeekend: getDay(currentDay) === 0 || getDay(currentDay) === 6,
            dayName: Object.values(DayName)[getDay(currentDay)],
            monthName: Object.values(MonthName)[getMonth(currentDay)],
            weather: null,
            events: [],
          })

          currentDay = addDays(currentDay, 1)
        }

        weeks.push(week)
        week = []
      }
    }
  }

  return weeks
}

export { generateCalendar, DayName, MonthName }
export type { CalendarEvent, CalendarDay, Weeks }
