/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Child content</div>;
};

describe("ErrorBoundary", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
    expect(screen.queryByText("Fallback")).not.toBeInTheDocument();
  });

  it("renders the fallback when a child throws", () => {
    render(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Fallback")).toBeInTheDocument();
    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
  });

  it("logs an error via componentDidCatch", () => {
    render(
      <ErrorBoundary fallback={<div>Fallback</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("warns when no fallback is provided", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "ErrorBoundary fallback not set!",
    );
  });

  it("renders null children and null fallback by default", () => {
    const { container } = render(<ErrorBoundary />);
    expect(container.firstChild).toBeNull();
  });

  it("getDerivedStateFromError returns hasError:true when called with an error", () => {
    const state = ErrorBoundary.getDerivedStateFromError(new Error("oops"));
    expect(state).toEqual({ hasError: true });
  });

  it("getDerivedStateFromError returns hasError:false via the defensive else-branch when error is falsy", () => {
    // Exercising the defensive else-branch in getDerivedStateFromError
    const state = ErrorBoundary.getDerivedStateFromError(
      null as unknown as Error,
    );
    expect(state).toEqual({ hasError: false });
  });
});
