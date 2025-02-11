import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CalendarDay } from '@/components/calendar/CalendarDay'
import { ModalViewDay } from '@/components/modal/ModalViewDay'
import type { CalendarViewProps } from './CalendarView.types'
import './CalendarView-styles.css'

export function CalendarView({ weeks }: CalendarViewProps) {
  return (
    <>
      <Card elevation={2}>
        <CardContent className="CalendarView-card-content">
          <div className={'CalendarView-container'}>
            {weeks.map((week, index) => (
              <div
                key={`week-${index}`}
                data-testid={`week-${index}`}
                className="CalendarView-week-container">
                {week.map((day) => (
                  <CalendarDay
                    key={`${day.day}-${day.dayName}-${
                      day.currentMonth ? 'active' : ''
                    }`}
                    calendarDay={day}
                  />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ModalViewDay />
    </>
  )
}
