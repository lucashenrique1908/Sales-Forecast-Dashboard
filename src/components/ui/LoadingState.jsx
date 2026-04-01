function LoadingState({
  title = 'Loading content',
  description = 'Preparing the next view.',
  compact = false,
}) {
  if (compact) {
    return (
      <div className="ui-loading-state ui-loading-state--compact" role="status" aria-live="polite">
        <div className="ui-skeleton-line ui-skeleton-line--short" />
        <div className="ui-skeleton-line" />
        <span>{description}</span>
      </div>
    )
  }

  return (
    <section className="ui-loading-state dashboard-skeleton" role="status" aria-live="polite">
      <div className="ui-loading-state__copy">
        <span className="eyebrow">Loading State</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="ui-loading-state__grid">
        <div className="skeleton-block skeleton-block--hero" />
        <div className="skeleton-stack">
          <div className="skeleton-block skeleton-block--metric" />
          <div className="skeleton-block skeleton-block--metric" />
        </div>
      </div>
    </section>
  )
}

export default LoadingState
