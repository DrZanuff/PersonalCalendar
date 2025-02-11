import { useMemo } from 'react'
import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { CalendarView } from '@/components/calendar/CalendarView'
import { generateCalendar } from '@/core/generateCalendar'
import { useCurrentUserEvents } from '@/hooks/useCurrentUserEvents'
import { useAtom } from 'jotai'
import { currentDateAtom } from '@/atoms/global-atoms'
import './Calendar-styles.css'

export function Calendar() {
  const { events } = useCurrentUserEvents()

  const [currentDate, setCurrentDate] = useAtom(currentDateAtom)

  const calendar = useMemo(() => {
    return generateCalendar(currentDate, events)
  }, [currentDate, events])

  const navigateMonth = (direction: 'next' | 'previous') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <div className={'Calendar-container'}>
      <CalendarHeader onNavigate={navigateMonth} />
      <CalendarView weeks={calendar} />
    </div>
  )
}
