import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ErrorState from './ErrorState'

describe('ErrorState', () => {
  it('renders the error copy and executes the recovery action', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <ErrorState
        title="Unable to load dashboard"
        message="Mock API failed"
        description="Try again in a few seconds."
        actionLabel="Retry"
        onAction={onAction}
      />,
    )

    expect(screen.getByText('Unable to load dashboard')).toBeInTheDocument()
    expect(screen.getByText('Mock API failed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Retry' }))

    expect(onAction).toHaveBeenCalledTimes(1)
  })
})
