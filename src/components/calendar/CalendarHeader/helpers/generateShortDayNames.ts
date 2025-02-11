import { DayName } from '@/core/generateCalendar'

export const generateShortDayNames = () =>
  Object.values(DayName).map((day) => day.slice(0, 3))
