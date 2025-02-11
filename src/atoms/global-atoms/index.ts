import {
  CalendarDay,
  CalendarEvent,
  DayName,
  MonthName,
} from '@/core/generateCalendar'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import type { User } from 'firebase/auth'

type CalendarUser = User

export const currentUserAtom = atom<CalendarUser | null>(null)

export const userEventsAtom = atomWithStorage<Record<string, CalendarEvent>>(
  'user-events',
  {}
)

export const viewDayModalStatusAtom = atom(false)

const mockCalendarDay: CalendarDay = {
  currentDate: true,
  currentMonth: true,
  day: new Date().getDate(),
  year: new Date().getFullYear(),
  month: 1,
  dayName: DayName.Monday,
  monthName: MonthName.January,
  events: [],
  isWeekend: false,
  weather: null,
}

export const currentEditingCalendarDayAtom = atom<CalendarDay>(mockCalendarDay)

export const viewCalendarEventModalAtom = atom(false)

const mockCalendarEvent: CalendarEvent = {
  city: '',
  date: '',
  text: '',
  weather: {
    description: '',
    icon: 'clear-day',
  },
}

export const currentEditingCalendarEventAtom =
  atom<CalendarEvent>(mockCalendarEvent)

export const currentDateAtom = atom(new Date())
