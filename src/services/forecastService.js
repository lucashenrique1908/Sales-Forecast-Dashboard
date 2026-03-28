// services: concentra acesso a APIs, adaptadores externos e regras de comunicacao com dados do backend.
export function fetchForecastSummary() {
  return {
    status: 'Connected to fake API',
    cards: [
      {
        title: 'Projected revenue',
        value: '$1.28M',
        change: '+12.4% vs. last quarter',
        tone: 'positive',
      },
      {
        title: 'Forecast accuracy',
        value: '94.2%',
        change: '+1.8 p.p. after model tuning',
        tone: 'neutral',
      },
      {
        title: 'Risk exposure',
        value: 'Low',
        change: '3 accounts flagged for review',
        tone: 'warning',
      },
    ],
  }
}
