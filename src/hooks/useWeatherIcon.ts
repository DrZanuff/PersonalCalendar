import { useMemo } from 'react'
import snowMonoIcon from '@/assets/wheater/mono/snow.svg'
import snowColorIcon from '@/assets/wheater/color/snow.svg'
import snowShowersDayMonoIcon from '@/assets/wheater/mono/snow-showers-day.svg'
import snowShowersDayColorIcon from '@/assets/wheater/color/snow-showers-day.svg'
import snowShowersNightMonoIcon from '@/assets/wheater/mono/snow-showers-night.svg'
import snowShowersNightColorIcon from '@/assets/wheater/color/snow-showers-night.svg'
import thunderRainMonoIcon from '@/assets/wheater/mono/thunder-rain.svg'
import thunderRainColorIcon from '@/assets/wheater/color/thunder-rain.svg'
import thunderShowersDayMonoIcon from '@/assets/wheater/mono/thunder-showers-day.svg'
import thunderShowersDayColorIcon from '@/assets/wheater/color/thunder-showers-day.svg'
import thunderShowersNightMonoIcon from '@/assets/wheater/mono/thunder-showers-night.svg'
import thunderShowersNightColorIcon from '@/assets/wheater/color/thunder-showers-night.svg'
import rainMonoIcon from '@/assets/wheater/mono/rain.svg'
import rainColorIcon from '@/assets/wheater/color/rain.svg'
import showersDayMonoIcon from '@/assets/wheater/mono/showers-day.svg'
import showersDayColorIcon from '@/assets/wheater/color/showers-day.svg'
import showersNightMonoIcon from '@/assets/wheater/mono/showers-night.svg'
import showersNightColorIcon from '@/assets/wheater/color/showers-night.svg'
import fogMonoIcon from '@/assets/wheater/mono/fog.svg'
import fogColorIcon from '@/assets/wheater/color/fog.svg'
import windMonoIcon from '@/assets/wheater/mono/wind.svg'
import windColorIcon from '@/assets/wheater/color/wind.svg'
import cloudyMonoIcon from '@/assets/wheater/mono/cloudy.svg'
import cloudyColorIcon from '@/assets/wheater/color/cloudy.svg'
import partlyCloudyDayMonoIcon from '@/assets/wheater/mono/partly-cloudy-day.svg'
import partlyCloudyDayColorIcon from '@/assets/wheater/color/partly-cloudy-day.svg'
import partlyCloudyNightMonoIcon from '@/assets/wheater/mono/partly-cloudy-night.svg'
import partlyCloudyNightColorIcon from '@/assets/wheater/color/partly-cloudy-night.svg'
import clearDayMonoIcon from '@/assets/wheater/mono/clear-day.svg'
import clearDayColorIcon from '@/assets/wheater/color/clear-day.svg'
import clearNightMonoIcon from '@/assets/wheater/mono/clear-night.svg'
import clearNightColorIcon from '@/assets/wheater/color/clear-night.svg'
import defaultIcon from '@/assets/wheater/deafult.svg'
import type { CalendarEvent } from '@/core/generateCalendar'

type IconName =
  | 'snow'
  | 'snow-showers-day'
  | 'snow-showers-night'
  | 'thunder-rain'
  | 'thunder-showers-day'
  | 'thunder-showers-night'
  | 'rain'
  | 'showers-day'
  | 'showers-night'
  | 'fog'
  | 'wind'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'clear-day'
  | 'clear-night'
  | 'default'

const weatherIconPaths = (type: 'mono' | 'color'): Record<IconName, string> => {
  return {
    snow: type === 'color' ? snowColorIcon : snowMonoIcon,
    'snow-showers-day':
      type === 'color' ? snowShowersDayColorIcon : snowShowersDayMonoIcon,
    'snow-showers-night':
      type === 'color' ? snowShowersNightColorIcon : snowShowersNightMonoIcon,
    'thunder-rain':
      type === 'color' ? thunderRainColorIcon : thunderRainMonoIcon,
    'thunder-showers-day':
      type === 'color' ? thunderShowersDayColorIcon : thunderShowersDayMonoIcon,
    'thunder-showers-night':
      type === 'color'
        ? thunderShowersNightColorIcon
        : thunderShowersNightMonoIcon,
    rain: type === 'color' ? rainColorIcon : rainMonoIcon,
    'showers-day': type === 'color' ? showersDayColorIcon : showersDayMonoIcon,
    'showers-night':
      type === 'color' ? showersNightColorIcon : showersNightMonoIcon,
    fog: type === 'color' ? fogColorIcon : fogMonoIcon,
    wind: type === 'color' ? windColorIcon : windMonoIcon,
    cloudy: type === 'color' ? cloudyColorIcon : cloudyMonoIcon,
    'partly-cloudy-day':
      type === 'color' ? partlyCloudyDayColorIcon : partlyCloudyDayMonoIcon,
    'partly-cloudy-night':
      type === 'color' ? partlyCloudyNightColorIcon : partlyCloudyNightMonoIcon,
    'clear-day': type === 'color' ? clearDayColorIcon : clearDayMonoIcon,
    'clear-night': type === 'color' ? clearNightColorIcon : clearNightMonoIcon,
    default: defaultIcon,
  }
}

/**
 * Represents a weather icon type, either 'mono' or 'color'.
 */
type IconType = 'mono' | 'color'

/**
 * Custom hook that returns the path to the weather icon based on the icon type and event weather.
 *
 * @param {IconType} type - The type of the icon ('mono' or 'color').
 * @param {CalendarEvent} event - The event containing the weather data.
 * @returns The path string to the appropriate weather icon.
 */
function useWeatherIcon(type: IconType, event: CalendarEvent): string {
  return useMemo(() => {
    const icons = weatherIconPaths(type)
    return icons[event.weather.icon]
  }, [type, event])
}

export { useWeatherIcon }
export type { IconName }
