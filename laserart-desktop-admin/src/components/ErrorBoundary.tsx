import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#0a0a0a', color: '#ef4444', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '10px' }}>Something went wrong.</h1>
          <p style={{ color: '#71717a', marginBottom: '20px' }}>{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
