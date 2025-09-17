import { Component } from 'react';
import ErrorDisplay from './ErrorDisplay';

import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="p-6">
          <ErrorDisplay
            error={this.state.error}
            title="Something went wrong"
            variant="error"
            onRetry={this.handleRetry}
            retryText="Reload Component"
          />
          
          {import.meta.env.DEV && this.state.errorInfo && (
            <details className="mt-4 p-3 bg-gray-100 rounded text-sm">
              <summary className="cursor-pointer font-medium">
                Error Details (Development Mode)
              </summary>
              <pre className="mt-2 text-xs overflow-auto">
                {this.state.error && this.state.error.stack}
                {'\n\nComponent Stack:'}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.elementType
};

export default ErrorBoundary;