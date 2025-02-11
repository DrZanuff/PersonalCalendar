export const prompt = `
Based on my input, return a list of up to 5 city name suggestions.
I don't need any extra descriptions—only the city names.

The expected response format is as follows:

Example 1:
Input:
Riach Fnd

Output:
<object>
{
"suggestions": [
"Riacho Fundo 1, Brasília",
"Riacho Fundo 2, Brasília"
]
}
</object>

Example 2:
Input:
bu

Output:
<object>
{
"suggestions": [
"Buenos Aires, Argentina",
"Bujaru, Pará"
]
}
</object>

Example 3:
Input:
Houston

Output:
<object>
{
"suggestions": [
"Houston, Texas"
]
}
</object>

Please always wrap the results within <object></object>.
---
Input:
`
