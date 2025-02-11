import { CalendarEvent } from '@/core/generateCalendar'
import { useAtomValue, useAtom } from 'jotai'
import { v4 } from 'uuid'
import { useEffect, useState, useCallback } from 'react'
import { currentUserAtom, userEventsAtom } from '@/atoms/global-atoms'
import { fetchWeather } from '@/services/fetchWeather'
import toast from 'react-hot-toast'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore'

const db = getFirestore()

export function useCurrentUserEvents() {
  const currentUser = useAtomValue(currentUserAtom)
  const [localEvents, setLocalEvents] = useAtom(userEventsAtom) // <Record<string, CalendarEvent>>
  const [events, setEvents] = useState<Record<string, CalendarEvent>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            setEvents(userSnap.data().calendarEvents || {})
          } else {
            setEvents({})
          }
        } catch (error) {
          console.error('Failed to fetch events', error)
          setEvents({})
        }
      } else {
        setEvents(localEvents)
      }
      setLoading(false)
    }

    fetchEvents()
  }, [currentUser, localEvents])

  const saveEvent = useCallback(
    async (newEvent: CalendarEvent) => {
      const eventId = newEvent.eventId ?? v4()
      const { weather } = await fetchWeather(newEvent.city, newEvent.date)
      const newCalendarEvent: CalendarEvent = { ...newEvent, eventId, weather }

      if (currentUser) {
        setLoading(true)
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          await setDoc(
            userRef,
            { calendarEvents: { [eventId]: newCalendarEvent } },
            { merge: true }
          )
        } catch (error) {
          toast.error('Error creating the event.')
          console.error('Failed to save event', error)
          setLoading(false)
          return false
        }
      }

      setEvents((prev) => ({ ...prev, [eventId]: newCalendarEvent }))
      setLocalEvents((prev) => ({ ...prev, [eventId]: newCalendarEvent }))

      setLoading(false)
      return true
    },
    [currentUser, setLocalEvents]
  )

  const updateEvent = useCallback(
    async (eventId: string, updatedEvent: Partial<CalendarEvent>) => {
      if (!events[eventId]) {
        toast.error(`Event with ID ${eventId} not found.`)
        return false
      }
      const { weather } = await fetchWeather(
        updatedEvent.city || events[eventId].city,
        updatedEvent.date || events[eventId].date
      )
      const updatedCalendarEvent = {
        ...events[eventId],
        ...updatedEvent,
        weather,
      }

      if (currentUser) {
        setLoading(true)
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userRef, {
            [`calendarEvents.${eventId}`]: updatedCalendarEvent,
          })
        } catch (error) {
          toast.error('Error updating the event.')
          setLoading(false)
          return false
        }
      }

      setEvents((prev) => ({ ...prev, [eventId]: updatedCalendarEvent }))
      setLocalEvents((prev) => ({ ...prev, [eventId]: updatedCalendarEvent }))

      setLoading(false)
      return true
    },
    [currentUser, events, setLocalEvents]
  )

  const deleteEvent = useCallback(
    async (eventId: string) => {
      if (!events[eventId]) return false

      if (currentUser) {
        setLoading(true)
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          await updateDoc(userRef, {
            [`calendarEvents.${eventId}`]: deleteField(),
          })
        } catch (error) {
          toast.error('Error deleting the event.')
          setLoading(false)
          return false
        }
      }

      setEvents((prev) => {
        const newEvents = { ...prev }
        delete newEvents[eventId]
        return newEvents
      })

      setLocalEvents((prev) => {
        const newEvents = { ...prev }
        delete newEvents[eventId]
        return newEvents
      })

      setLoading(false)
      return true
    },
    [currentUser, setLocalEvents, events]
  )

  return {
    events: Object.values(events),
    loading,
    saveEvent,
    updateEvent,
    deleteEvent,
  }
}
