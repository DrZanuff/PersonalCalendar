import { useMemo } from 'react'
import { parseISO, isSameDay, compareAsc } from 'date-fns'
import Spinner from '@mui/material/CircularProgress'
import { useCurrentUserEvents } from '@/hooks/useCurrentUserEvents'
import { EventTag } from '@/components/EventTag'
import { currentEditingCalendarDayAtom } from '@/atoms/global-atoms'
import { useAtomValue } from 'jotai'
import './CalendarEventList-styles.css'

export function CalendarEventList() {
  const { events, loading } = useCurrentUserEvents()
  const currentCalendarDay = useAtomValue(currentEditingCalendarDayAtom)

  const currentDayCalendarEvents = useMemo(() => {
    return events
      .filter((calendarEvent) => {
        const eventDate = parseISO(calendarEvent.date)
        const currentDate = new Date(
          currentCalendarDay.year,
          currentCalendarDay.month - 1,
          currentCalendarDay.day
        )
        return isSameDay(eventDate, currentDate)
      })
      .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
  }, [events, currentCalendarDay])

  return (
    <div className={'CalendarEventList-container'}>
      {loading ? (
        <Spinner size={40} color="info" />
      ) : (
        currentDayCalendarEvents.map((calendarEvent, index) => (
          <EventTag
            key={index}
            event={calendarEvent}
            index={index}
            type="large"
          />
        ))
      )}
    </div>
  )
}
