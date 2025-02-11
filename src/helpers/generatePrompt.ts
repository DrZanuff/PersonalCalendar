import { prompt } from '@/helpers/prompt'

export function generatePrompt(input: string) {
  return `
  ${prompt}
  ${input}
  `
}
