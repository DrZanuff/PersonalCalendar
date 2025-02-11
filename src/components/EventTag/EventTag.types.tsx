import type { CalendarEvent } from '@/core/generateCalendar'

export interface EventTagProps {
  event: CalendarEvent
  type: 'compact' | 'large'
  index?: number
}
