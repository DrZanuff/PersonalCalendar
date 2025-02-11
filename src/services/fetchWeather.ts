import { parseISO, format } from 'date-fns'
import get from 'lodash/get'
import type { IconName } from '@/hooks/useWeatherIcon'
import type { Weather } from '@/core/generateCalendar'

type FetchWeatherResponse = {
  weather: Weather
  data: any
}

export const fetchWeather = async (
  city: string,
  date: string
): Promise<FetchWeatherResponse> => {
  const formattedDate = format(parseISO(date), 'yyyy-MM-dd')
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedDate}?iconSet=icons2&key=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    const weatherData = get(data, 'days[0]')
    const iconName: IconName = get(weatherData, 'icon')

    return {
      weather: {
        icon: iconName,
        description: weatherData.conditions,
      },
      data,
    }
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
    return {
      weather: { icon: 'default', description: 'Weather data unavailable' },
      data: {},
    }
  }
}
