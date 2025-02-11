import { useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import SaveIcon from '@mui/icons-material/Save'
import Stack from '@mui/material/Stack'
import TrashIcon from '@mui/icons-material/DeleteForever'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import { format, parse } from 'date-fns'
import { useCitySearch } from '@/hooks/useCitySearch'
import { currentEditingCalendarDayAtom } from '@/atoms/global-atoms'
import { useAtomValue } from 'jotai'
import { useCurrentUserEvents } from '@/hooks/useCurrentUserEvents'
import toast from 'react-hot-toast'
import type { ChangeEvent } from 'react'
import { FormEventProps, CalendarEvent } from './FormEvent.types'
import './FormEvent-styles.css'
import { Divider } from '@mui/material'

export function FormEvent({ calendarEvent, handleCallback }: FormEventProps) {
  const { saveEvent, updateEvent, deleteEvent } = useCurrentUserEvents()
  const currentCalendarDay = useAtomValue(currentEditingCalendarDayAtom)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [time, setTime] = useState<Date | null | undefined>(new Date())

  const {
    city,
    setCity,
    handleCityChange,
    suggestions,
    fetchingStatus,
    resetCityInput,
  } = useCitySearch()

  // Memoize city value to ensure referential stability
  // https://mui.com/material-ui/react-autocomplete/#controlled-states
  const selectedCity = useMemo(() => city, [city])

  const cityOptions = useMemo(() => {
    return suggestions.map((option, index) => ({
      label: option,
      id: index,
    }))
  }, [suggestions])

  useEffect(() => {
    if (calendarEvent) {
      setCity(calendarEvent.city)
      setTitle(calendarEvent.text)
      setTime(new Date(calendarEvent.date))
    }
  }, [])

  const handleSubmit = async () => {
    if (!title || !city || !time) return

    setIsLoading(true)
    try {
      const dateStr = `${currentCalendarDay.year}-${currentCalendarDay.month}-${
        currentCalendarDay.day
      } ${format(time, 'HH:mm')}`

      const newDate = parse(dateStr, 'yyyy-MM-dd HH:mm', new Date())

      const newEvent: CalendarEvent = {
        city,
        date: newDate.toISOString(),
        text: title,
        weather: {
          description: 'Sunny day',
          icon: 'clear-day',
        },
      }

      if (calendarEvent && calendarEvent.eventId) {
        await updateEvent(calendarEvent.eventId, newEvent)
      } else {
        await saveEvent(newEvent)
      }
      toast.success('Event saved!')
    } catch (error) {
      toast.error('Error saving, try again...')
      console.warn('We could not save the event, try again.', { error })
    }

    setTitle('')
    setTime(null)
    resetCityInput()
    setIsLoading(false)
    handleCallback?.()
  }

  const handleDelete = async () => {
    setIsLoading(true)
    const success = await deleteEvent(calendarEvent?.eventId || '')

    if (!success) {
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    toast.success('Event deleted...')
    handleCallback?.()
  }

  const isFormValid = title.length > 0 && city.length > 0 && time !== null

  return (
    <div className="FormEvent-container">
      <TextField
        label="Title (max 30 characters)"
        data-testid="form-event-title"
        color="info"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value.substring(0, 30))}
        slotProps={{ htmlInput: { maxLength: 30 } }}
        fullWidth
        required
      />

      <Autocomplete
        options={cityOptions}
        freeSolo
        value={selectedCity}
        onInputChange={(_, newValue) =>
          handleCityChange({
            target: { value: newValue },
          } as ChangeEvent<HTMLInputElement>)
        }
        loading={fetchingStatus === 'fetching'}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            data-testid="form-event-city"
            color="info"
            fullWidth
            required
            size="small"
          />
        )}
      />

      <TimeField
        label="Time"
        data-testid="form-event-time"
        value={time}
        color="info"
        onChange={setTime}
        size="small"
      />

      <Button
        variant="contained"
        color="info"
        startIcon={<SaveIcon />}
        loading={isLoading}
        onClick={handleSubmit}
        disabled={!isFormValid}>
        Save Event
      </Button>

      {calendarEvent && (
        <>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Button
              color="warning"
              variant="contained"
              size="small"
              loading={isLoading}
              startIcon={<ArrowBackIcon />}
              onClick={handleCallback}>
              Close
            </Button>

            <Button
              color="error"
              variant="contained"
              size="small"
              loading={isLoading}
              startIcon={<TrashIcon />}
              onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </>
      )}
    </div>
  )
}
