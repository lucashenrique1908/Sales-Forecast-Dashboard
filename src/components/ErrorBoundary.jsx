import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error captured by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="app-error-boundary">
          <p>Something went wrong.</p>
          <h1>We could not render the dashboard.</h1>
          <span>Please refresh the page or review the latest change.</span>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
