import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary a intercepté une erreur : ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#ffebee', color: '#c62828', minHeight: '100vh', fontFamily: 'system-ui' }}>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>Oups, l'application a planté !</h1>
          <p>L'erreur suivante s'est produite lors du rendu React :</p>
          <pre style={{ background: '#ffcdd2', padding: '1rem', marginTop: '1rem', overflowX: 'auto', borderRadius: '4px' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
