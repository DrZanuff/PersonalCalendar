export function extractResultObject<T>(input: string) {
  const match = input.match(/<object>([\s\S]*?)<\/object>/)

  if (match) {
    const jsonString = match[1].trim() // Extract the content and trim any whitespace
    try {
      return JSON.parse(jsonString) as T
    } catch (error) {
      console.error('Failed to parse JSON:', error, { input })
      return null
    }
  } else {
    console.error('No object tag found.', { input })
    return null
  }
}
