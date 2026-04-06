import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <AlertTriangle size={32} style={{ color: '#DC2626' }} />
          <h2 className="text-lg font-semibold mt-4" style={{ color: '#1F2937' }}>
            Something went wrong
          </h2>
          <p className="text-sm mt-1" style={{ color: '#566573' }}>
            Please refresh the page and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold active:scale-[0.98] transition-transform cursor-pointer"
            style={{ background: '#8CC63F' }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
