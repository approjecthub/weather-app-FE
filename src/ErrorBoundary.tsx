import React, { Component, ReactNode } from "react";
import { Container, Alert, Button, Collapse } from "react-bootstrap";
import { Location } from "react-router-dom";

interface Props extends Location {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  showDetails: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.pathname !== this.props.pathname) {
      this.setState({ hasError: false, showDetails: false });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>
              Something went wrong, but we will fix it
            </Alert.Heading>
            <p>
              An unexpected error has occurred. Please try again later or
              contact support if the problem persists. Don't look into the error
              details if you are not a developer!!
            </p>
            <Button variant="outline-light" onClick={this.toggleDetails}>
              {this.state.showDetails ? "Hide Details" : "Show Details"}
            </Button>
            <Collapse in={this.state.showDetails}>
              <div>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            </Collapse>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
