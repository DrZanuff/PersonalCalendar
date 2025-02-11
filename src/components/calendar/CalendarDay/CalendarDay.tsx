import { memo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import { EventTag } from '@/components/EventTag'
import { useSetAtom } from 'jotai'
import {
  viewDayModalStatusAtom,
  currentEditingCalendarDayAtom,
} from '@/atoms/global-atoms'

import type { CalendarDayProps } from './CalendarDay.types'
import './CalendarDay-styles.css'
import { compareAsc, parseISO } from 'date-fns'

export const CalendarDay = memo(function CalendarDay({
  calendarDay,
}: CalendarDayProps) {
  const setCurrentDayModalOpen = useSetAtom(viewDayModalStatusAtom)
  const setCurrentEditingDay = useSetAtom(currentEditingCalendarDayAtom)

  const handleOpenCurrentDay = () => {
    setCurrentEditingDay(calendarDay)
    setCurrentDayModalOpen(true)
  }

  const renderEventsInfo = () => {
    const eventsSize = calendarDay.events.length
    if (eventsSize === 0) {
      return null
    }

    return (
      <span className="CalendarDay-events-info">{`${eventsSize} event${
        eventsSize > 1 ? 's' : ''
      }`}</span>
    )
  }

  const getDayClassNames = () => {
    const className = 'CalendarDay-container'

    if (!calendarDay.currentMonth) {
      return `${className} off-month`
    }

    if (calendarDay.isWeekend) {
      return `${className} is-weekend`
    }
    return className
  }

  return (
    <Card
      data-testid={calendarDay.currentMonth ? `test-id-${calendarDay.day}` : ''}
      elevation={calendarDay.currentMonth ? 3 : 1}
      className="CalendarDay-card"
      sx={{
        opacity: calendarDay.currentMonth ? 1 : 0.4,
        pointerEvents: calendarDay.currentMonth ? 'all' : 'none',
      }}>
      <CardActionArea
        className="CalendarDay-action-container"
        onClick={handleOpenCurrentDay}>
        <CardContent className="CalendarDay-card-container">
          <div
            className={getDayClassNames()}
            data-testid={`day-${calendarDay.day}-${calendarDay.dayName}-${calendarDay.monthName}`}>
            <span className="day-radius">{calendarDay.day}</span>

            {renderEventsInfo()}
          </div>
          {calendarDay.events
            .sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
            .slice(0, 2)
            .map((calendarEvent, index) => (
              <EventTag
                key={`${index}-${calendarEvent.date}`}
                event={calendarEvent}
                type="compact"
              />
            ))}
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
