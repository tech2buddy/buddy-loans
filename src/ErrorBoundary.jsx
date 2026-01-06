import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Something went wrong.</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff3cd', border: '1px solid #ffeeba', padding: 12, borderRadius: 8, color: '#856404' }}>
{String(this.state.error)}
          </pre>
          <p style={{ color: '#6c757d' }}>Check the browser console for details.</p>
        </div>
      )
    }
    return this.props.children
  }
}
