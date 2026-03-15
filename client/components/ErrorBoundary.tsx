import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    const { fallback } = props;
    if (fallback === undefined) {
      console.warn("ErrorBoundary fallback not set!");
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const message = `Unable to render: ${error} ${String(errorInfo)}`;
    console.error(message);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children = null, fallback = null } = this.props;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
