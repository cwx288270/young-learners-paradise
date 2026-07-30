import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.hash = '#/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div
          className="h-full flex flex-col items-center justify-center px-6"
          style={{ background: 'var(--color-bg)' }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4"
            style={{ background: 'var(--color-primary-light)' }}
          >
            😅
          </div>
          <p className="text-xl text-gray-600 mb-2 text-center">出了一点小问题</p>
          <p className="text-sm text-gray-400 mb-6 text-center">
            点击下方按钮重新试试吧
          </p>
          <button
            onClick={this.handleReset}
            className="btn-child px-4 text-white font-bold"
            style={{ background: 'var(--color-primary)' }}
          >
            再试一次
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
