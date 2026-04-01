import { renderHook, waitFor, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useForecastData from './useForecastData'
import { forecastApiRows } from '../test/fixtures/forecastFixtures'

vi.mock('../services/forecastService', () => ({
  fetchForecastSummary: vi.fn(),
}))

import { fetchForecastSummary } from '../services/forecastService'

describe('useForecastData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads forecast data and exposes the derived dashboard model', async () => {
    fetchForecastSummary.mockResolvedValue(forecastApiRows)

    const { result } = renderHook(() => useForecastData())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBeNull()
    expect(result.current.data.cards).toHaveLength(3)
    expect(result.current.data.meta.totalRows).toBe(3)
  })

  it('updates filters without re-fetching the api', async () => {
    fetchForecastSummary.mockResolvedValue(forecastApiRows)

    const { result } = renderHook(() => useForecastData())

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.updateFilter('region', 'Europe')
    })

    expect(fetchForecastSummary).toHaveBeenCalledTimes(1)
    expect(result.current.filters.region).toBe('Europe')
    expect(result.current.data.records).toHaveLength(1)
    expect(result.current.data.records[0].group).toBe('Europe')
  })

  it('surfaces api failures as error state', async () => {
    fetchForecastSummary.mockRejectedValue(new Error('Network unavailable'))

    const { result } = renderHook(() => useForecastData())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('Network unavailable')
    expect(result.current.data).toBeNull()
  })
})
