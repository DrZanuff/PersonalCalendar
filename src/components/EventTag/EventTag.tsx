import { memo, useCallback } from 'react'
import Button from '@mui/material/Button'
import type { EventTagProps } from './EventTag.types'
import { useWeatherIcon } from '@/hooks/useWeatherIcon'
import { useSetAtom } from 'jotai'
import {
  currentEditingCalendarEventAtom,
  viewCalendarEventModalAtom,
} from '@/atoms/global-atoms'
import { parseISO, format } from 'date-fns'
import './EventTag-styles.css'
import Tooltip from '@mui/material/Tooltip'

export const EventTag = memo(function EventTag({
  event,
  type,
  index,
}: EventTagProps) {
  const iconPath = useWeatherIcon('color', event)
  const setCurrentCalendarEvent = useSetAtom(currentEditingCalendarEventAtom)
  const setViewCalendarEventModal = useSetAtom(viewCalendarEventModalAtom)

  const buttonSize = type === 'compact' ? 'small' : 'large'
  const iconSize = type === 'compact' ? '20px' : '30px'
  const className =
    type === 'compact' ? 'EventTag-button' : 'EventTag-button large'
  const filter =
    index && (index + 1) % 2 === 0
      ? { filter: 'brightness(0.95)' }
      : { filter: 'brightness(1.1)' }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setCurrentCalendarEvent(event)
      setViewCalendarEventModal(true)
    },
    [event, setCurrentCalendarEvent, setViewCalendarEventModal]
  )

  const renderEventText = () => {
    if (event.text.length > 14 && type === 'compact') {
      return `${event.text.substring(0, 14)}...`
    }

    if (type === 'large') {
      const isoDate = event.date
      const formattedTime = format(parseISO(isoDate), 'HH:mm')
      const weather = event.weather.description
      return `${formattedTime} - ${event.text} - Forecast: ${weather}`
    }

    return event.text
  }

  return (
    <Tooltip title={event.weather.description} placement="right">
      <Button
        href="#"
        onClick={handleClick}
        sx={filter}
        data-testid="event-tag"
        data-testid-title={type === 'large' ? event.text : ''}
        variant="contained"
        LinkComponent={'a'}
        size={buttonSize}
        className={className}
        color={'primary'}
        startIcon={
          <img
            alt="Weather Icon"
            height={iconSize}
            width={iconSize}
            src={iconPath}
          />
        }>
        {renderEventText()}
      </Button>
    </Tooltip>
  )
})
