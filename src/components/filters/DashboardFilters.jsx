import { memo } from 'react'
import { FORECAST_FILTER_OPTIONS, FORECAST_UI_COPY } from '../../constants/forecast'

function DashboardFilters({
  filters,
  viewOptions,
  filterOptions,
  feedback,
  onFilterChange,
  onViewOptionChange,
  onReset,
}) {
  return (
    <section className="dashboard-filters panel" aria-label="Dashboard filters">
      <div className="dashboard-filters__copy">
        <span className="eyebrow">{FORECAST_UI_COPY.filtersEyebrow}</span>
        <h3>{FORECAST_UI_COPY.filtersTitle}</h3>
        <p>{FORECAST_UI_COPY.filtersDescription}</p>
        <div className="dashboard-filters__feedback" aria-live="polite">
          <strong>{feedback.summary}</strong>
          {feedback.activeFilterLabels.length ? (
            <div className="filter-chip-list">
              {feedback.activeFilterLabels.map((label) => (
                <span key={label} className="filter-chip">
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="dashboard-filters__controls">
        <label className="filter-field">
          <span>Region</span>
          <select
            value={filters.region}
            className={filters.region !== 'all' ? 'filter-field__control filter-field__control--active' : 'filter-field__control'}
            onChange={(event) => onFilterChange('region', event.target.value)}
          >
            <option value="all">{FORECAST_FILTER_OPTIONS.regionLabel}</option>
            {filterOptions.regions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Period</span>
          <select
            value={filters.period}
            className={filters.period !== 'all' ? 'filter-field__control filter-field__control--active' : 'filter-field__control'}
            onChange={(event) => onFilterChange('period', event.target.value)}
          >
            <option value="all">{FORECAST_FILTER_OPTIONS.periodLabel}</option>
            {filterOptions.periods.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Sort by</span>
          <select
            value={viewOptions.sortBy}
            className="filter-field__control"
            onChange={(event) => onViewOptionChange('sortBy', event.target.value)}
          >
            {filterOptions.sortBy.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Top results</span>
          <select
            value={viewOptions.topN}
            className="filter-field__control"
            onChange={(event) => onViewOptionChange('topN', event.target.value)}
          >
            {filterOptions.topN.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" className="secondary-button" onClick={onReset}>
        {FORECAST_UI_COPY.filtersResetLabel}
      </button>
    </section>
  )
}

export default memo(DashboardFilters)
