import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import FullApp from './FullApp.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <FullApp />
    </ErrorBoundary>
  </React.StrictMode>
)
