import { extractResultObject } from '@/helpers/extractResultObject'
import { generatePrompt } from '@/helpers/generatePrompt'
import { model } from '@/services/geminiApi'
import { debounce } from 'lodash'
import { useState, useCallback } from 'react'

type FetchStatus = 'idle' | 'fetching'

type CitySuggestions = {
  suggestions: string[]
}

export function useCitySearch() {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [fetchingStatus, setFetchingStatus] = useState<FetchStatus>('idle')

  const fetchCitySuggestions = async (query: string) => {
    setFetchingStatus('fetching')

    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY

    if (!geminiApiKey) {
      setFetchingStatus('idle')
      return
    }

    const prompt = generatePrompt(query)

    const result = await model.generateContent(prompt)

    if (!result?.response) {
      console.error('ERROR: 3xA', { result })
      setFetchingStatus('idle')
      return
    }

    const resultText = result.response.text()

    const extractedObject = extractResultObject<CitySuggestions>(resultText)

    if (!extractedObject) {
      console.error('ERROR: 3xB', { extractedObject, resultText })
      setFetchingStatus('idle')
      return
    }

    const { suggestions } = extractedObject

    console.log(`Fetching city suggestions for: ${suggestions}`)
    setSuggestions(suggestions)
    setFetchingStatus('idle')
  }

  const debouncedFetch = useCallback(
    debounce((query: string) => fetchCitySuggestions(query), 500),
    []
  )

  const resetCityInput = () => {
    setCity('')
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value
    setCity(newCity)
    debouncedFetch(newCity)
  }

  return {
    city,
    setCity,
    handleCityChange,
    suggestions,
    fetchingStatus,
    resetCityInput,
  }
}
