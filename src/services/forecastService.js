// A pasta services concentra integracoes e chamadas de dados para isolar a camada de acesso a API.
const forecastSummary = {
  period: 'Q2 2026',
  cards: [
    {
      id: 'revenue',
      title: 'Projected Revenue',
      value: '$1.84M',
      subtitle: 'Compared with $1.62M in Q1',
      trend: '+13.6%',
      series: [118, 124, 129, 137, 145, 153],
    },
    {
      id: 'pipeline',
      title: 'Pipeline Coverage',
      value: '3.4x',
      subtitle: 'Healthy ratio for the upcoming quarter',
      trend: '+0.4x',
      series: [2.3, 2.6, 2.8, 3.0, 3.1, 3.4],
    },
    {
      id: 'win-rate',
      title: 'Expected Win Rate',
      value: '31.8%',
      subtitle: 'Driven by enterprise renewals',
      trend: '+2.1%',
      series: [24, 26, 27, 29, 30, 31.8],
    },
  ],
  highlights: [
    'Enterprise segment should represent 48% of expected revenue.',
    'North America remains the strongest region by conversion speed.',
    'Upsell opportunities are concentrated in the top 12 active accounts.',
  ],
}

export function getForecastSummary() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(forecastSummary), 300)
  })
}
