function ErrorState({
  title,
  message,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <section className="ui-feedback-state ui-feedback-state--error">
      <span className="eyebrow">Error State</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {description ? <p>{description}</p> : null}
      {onAction ? (
        <button type="button" className="primary-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}

export default ErrorState
