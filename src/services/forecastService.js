const MOCKAROO_API_URL = import.meta.env.VITE_MOCKAROO_API_URL

const fallbackForecastRows = [
  { period: 'Q2 2026', region: 'North America', revenue: 482000, sales: 128, growth: 14.2 },
  { period: 'Q2 2026', region: 'Europe', revenue: 341500, sales: 94, growth: 10.4 },
  { period: 'Q2 2026', region: 'LATAM', revenue: 178900, sales: 61, growth: 8.7 },
  { period: 'Q2 2026', region: 'APAC', revenue: 263400, sales: 79, growth: 12.1 },
]

async function requestForecastSummary() {
  if (!MOCKAROO_API_URL) {
    return fallbackForecastRows
  }

  const response = await fetch(MOCKAROO_API_URL)

  if (!response.ok) {
    throw new Error(`Forecast API request failed with status ${response.status}.`)
  }

  const payload = await response.json()

  if (!Array.isArray(payload)) {
    throw new Error('Forecast API returned an unexpected payload.')
  }

  return payload
}

// Service layer: transport only. Consumers receive the raw API payload.
export async function fetchForecastSummary() {
  return requestForecastSummary()
}
