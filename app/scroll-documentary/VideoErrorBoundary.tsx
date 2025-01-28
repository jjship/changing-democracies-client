// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { VideoSourceError } from "./videoSource";
import VideoSourceErrorFallback from "./VideoSourceErrorFallback";
import VideoPlayerFallback from "./VideoPlayerFallback";

interface Props {
  children: ReactNode;
  fallback?:
    | ReactNode
    | ((props: { error: Error; retry: () => void }) => ReactNode);
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      // If custom fallback is provided, use it
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback({
            error: this.state.error,
            retry: this.handleRetry,
          });
        }
        return this.props.fallback;
      }

      // Use specific error fallbacks based on error type
      if (this.state.error instanceof VideoSourceError) {
        return (
          <VideoSourceErrorFallback
            error={this.state.error}
            onRetry={this.handleRetry}
          />
        );
      }

      // Default video player error fallback
      return (
        <VideoPlayerFallback
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
