export const FORECAST_DATE_LOCALE = 'en-US'
export const FORECAST_CURRENCY = 'USD'

export const FORECAST_FIELD_KEYS = {
  revenue: ['revenue', 'total_revenue', 'totalRevenue', 'amount', 'forecast_revenue'],
  sales: ['sales', 'total_sales', 'totalSales', 'orders', 'deals', 'quantity'],
  growth: ['growth', 'growth_pct', 'growthPercent', 'growth_percentage', 'yoy_growth'],
  period: ['period', 'quarter', 'forecast_period', 'month'],
  group: ['region', 'segment', 'territory', 'market'],
  label: ['label', 'name', 'account', 'customer', 'date', 'month'],
}

export const FORECAST_FALLBACK_LABELS = {
  period: 'Current period',
  groupPrefix: 'Group',
  rowPrefix: 'row',
}

export const FORECAST_METRIC_TYPES = {
  revenue: 'currency',
  sales: 'integer',
  growth: 'percent',
}

export const FORECAST_CARD_IDS = {
  revenue: 'revenue',
  sales: 'sales',
  growth: 'growth',
}

export const DEFAULT_FORECAST_FILTERS = {
  region: 'all',
  period: 'all',
}

export const DEFAULT_FORECAST_VIEW_OPTIONS = {
  sortBy: 'revenue',
  topN: 'all',
}

export const FORECAST_FILTER_OPTIONS = {
  regionLabel: 'All regions',
  periodLabel: 'All periods',
  sortBy: [
    { label: 'Revenue', value: 'revenue' },
    { label: 'Growth', value: 'growth' },
    { label: 'Sales', value: 'sales' },
  ],
  topN: [
    { label: 'All', value: 'all' },
    { label: 'Top 3', value: '3' },
    { label: 'Top 5', value: '5' },
  ],
}

export const FORECAST_CHART_CONFIG = {
  revenue: {
    eyebrow: 'Revenue View',
    title: 'Revenue by region',
    dataKey: 'revenue',
    color: '#0f766e',
    grid: 'rgba(148, 163, 184, 0.25)',
    cursor: 'rgba(14, 165, 233, 0.08)',
  },
  growth: {
    eyebrow: 'Growth View',
    title: 'Growth by region',
    dataKey: 'growth',
    color: '#1d4ed8',
    grid: 'rgba(148, 163, 184, 0.25)',
    cursor: 'rgba(15, 118, 110, 0.2)',
  },
}

export const FORECAST_KPI_CARD_CONTENT = {
  revenue: {
    title: 'Total Revenue',
    subtitle: (period) => `Filtered forecast for ${period}`,
    trend: (visibleRows, formatInteger) => `${formatInteger(visibleRows)} visible rows`,
  },
  sales: {
    title: 'Total Sales',
    subtitle: 'Combined volume for the active filters',
    trend: (_, __, totals) => totals.growthFormatted,
  },
  growth: {
    title: 'Growth %',
    subtitle: 'Average growth across the filtered forecast',
    trend: (visibleRows) =>
      visibleRows > 0 ? 'Synced with charts and insights' : 'No rows in view',
  },
}

export const FORECAST_UI_COPY = {
  headerEyebrow: 'Forecast Control Center',
  headerTitle: 'Interactive forecasting with reusable filters and product-ready data views.',
  headerDescription:
    'The dashboard centralises filtering, chart data and KPI updates in the data layer so the UI stays focused on communication.',
  visiblePeriodLabel: 'Visible Period',
  lastUpdatedLabel: 'Last Updated',
  filtersEyebrow: 'Global Filters',
  filtersTitle: 'Refine the forecast story in one place',
  filtersDescription: 'Every KPI, chart and highlight reacts to the active selection.',
  filtersResetLabel: 'Reset filters',
  visibleRowsLabel: (count) => `${count} rows visible`,
  syncedWithFiltersLabel: 'Synced with active filters',
  highlightsEyebrow: 'Executive Highlights',
  highlightsTitle: 'Signals worth tracking now',
  rankingEyebrow: 'Visible Breakdown',
  rankingTitle: 'Filtered ranking',
  rankingCaption: (visibleRows, totalRows) =>
    `Showing ${visibleRows} of ${totalRows} available forecast rows.`,
  loadingTitle: 'Preparing the forecast workspace',
  loadingDescription:
    'We are assembling KPIs, chart series and highlight narratives from the latest dataset.',
  appLoadingTitle: 'Loading application shell',
  appLoadingDescription: 'Preparing routes, shared providers and dashboard structure.',
  errorTitle: 'We could not load the dashboard data.',
  errorDescription:
    'Check the API connection and try again. The retry action reuses the shared refetch flow from the data hook.',
  errorAction: 'Try again',
  emptyTitle: 'No forecast data available',
  emptyDescription:
    'Connect a dataset with revenue and sales fields to unlock KPIs, charts and insights.',
  filteredEmptyTitle: 'No results for the active filters',
  filteredEmptyDescription:
    'Try another region or period to reveal the related KPIs and charts.',
}
