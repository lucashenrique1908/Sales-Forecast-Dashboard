import { useCallback } from 'react'
import ChartSection from '../components/dashboard/ChartSection'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import HighlightsSection from '../components/dashboard/HighlightsSection'
import KPISection from '../components/dashboard/KPISection'
import DashboardFilters from '../components/filters/DashboardFilters'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import LoadingState from '../components/ui/LoadingState'
import { FORECAST_UI_COPY } from '../constants/forecast'
import { useDataContext } from '../contexts/DataContext'
import { dashboardTheme } from '../styles/dashboardTheme'

function DashboardPage() {
  const {
    data,
    loading,
    error,
    filters,
    viewOptions,
    updateFilter,
    updateViewOption,
    resetFilters,
    refetch,
  } = useDataContext()

  const handleRetry = useCallback(() => {
    refetch()
  }, [refetch])

  if (loading) {
    return (
      <section className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
        <LoadingState
          title={FORECAST_UI_COPY.loadingTitle}
          description={FORECAST_UI_COPY.loadingDescription}
        />
      </section>
    )
  }

  if (error) {
    return (
      <section className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
        <ErrorState
          title={FORECAST_UI_COPY.errorTitle}
          message={error.message}
          description={FORECAST_UI_COPY.errorDescription}
          actionLabel={FORECAST_UI_COPY.errorAction}
          onAction={handleRetry}
        />
      </section>
    )
  }

  return (
    <section className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
      <DashboardHeader data={data} />

      <DashboardFilters
        filters={filters}
        viewOptions={viewOptions}
        filterOptions={data.filterOptions}
        feedback={{
          summary: data.meta.summary,
          activeFilterLabels: data.meta.activeFilterLabels,
        }}
        onFilterChange={updateFilter}
        onViewOptionChange={updateViewOption}
        onReset={resetFilters}
      />

      {!data.meta.hasRawData ? (
        <EmptyState
          title={data.emptyState.title}
          description={data.emptyState.description}
          actionLabel={FORECAST_UI_COPY.errorAction}
          onAction={handleRetry}
        />
      ) : (
        <>
          <KPISection cards={data.cards} />

          <ChartSection
            revenueChartData={data.revenueChartData}
            growthChartData={data.growthChartData}
            meta={data.meta}
          />

          <HighlightsSection
            highlights={data.highlights}
            records={data.records}
            meta={data.meta}
          />
        </>
      )}
    </section>
  )
}

export default DashboardPage
