import { Component, type ReactNode } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <ErrorState
          message="Something went wrong loading this section."
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }
    return this.props.children;
  }
}

interface ErrorStateProps {
  message?: string;
  type?: "generic" | "network" | "empty";
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  type = "generic",
  onRetry,
}: ErrorStateProps) {
  const icons = {
    generic: AlertTriangle,
    network: WifiOff,
    empty: AlertTriangle,
  };
  const Icon = icons[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[var(--muted-foreground)]" />
      </div>
      <p className="text-[var(--muted-foreground)] mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-[var(--muted-foreground)]" />
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] mb-4 max-w-xs">{description}</p>
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
