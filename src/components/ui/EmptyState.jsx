function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}) {
  return (
    <section
      className={`ui-feedback-state ui-feedback-state--empty${compact ? ' ui-feedback-state--compact' : ''}`}
    >
      <span className="eyebrow">Empty State</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {onAction ? (
        <button type="button" className="secondary-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}

export default EmptyState
