import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DashboardFilters from './DashboardFilters'

const baseProps = {
  filters: { region: 'all', period: 'all' },
  viewOptions: { sortBy: 'revenue', topN: 'all' },
  filterOptions: {
    regions: [
      { label: 'North America', value: 'North America' },
      { label: 'Europe', value: 'Europe' },
    ],
    periods: [{ label: 'Q2 2026', value: 'Q2 2026' }],
    sortBy: [{ label: 'Revenue', value: 'revenue' }],
    topN: [{ label: 'All', value: 'all' }],
  },
  feedback: {
    summary: 'Showing all 3 forecast rows',
    activeFilterLabels: [],
  },
  onFilterChange: vi.fn(),
  onViewOptionChange: vi.fn(),
  onReset: vi.fn(),
}

describe('DashboardFilters', () => {
  it('renders filter feedback and triggers region changes', () => {
    const onFilterChange = vi.fn()

    render(
      <DashboardFilters
        {...baseProps}
        onFilterChange={onFilterChange}
        feedback={{
          summary: '1 filter applied',
          activeFilterLabels: ['Region: Europe'],
        }}
      />,
    )

    expect(screen.getByText('1 filter applied')).toBeInTheDocument()
    expect(screen.getByText('Region: Europe')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Region'), {
      target: { value: 'Europe' },
    })

    expect(onFilterChange).toHaveBeenCalledWith('region', 'Europe')
  })

  it('allows resetting all filters', async () => {
    const onReset = vi.fn()

    render(<DashboardFilters {...baseProps} onReset={onReset} />)

    fireEvent.click(screen.getByRole('button', { name: /reset filters/i }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
