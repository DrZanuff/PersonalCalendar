import type { CalendarEvent } from '@/core/generateCalendar'

type FormEventProps = {
  calendarEvent?: CalendarEvent
  handleCallback?: () => void
}

export type { FormEventProps, CalendarEvent }
