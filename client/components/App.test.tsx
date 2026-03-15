/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const mockUseQuery = jest.fn();

jest.mock("@apollo/client", () => ({
  gql: (strings: TemplateStringsArray) => strings.join(""),
  useQuery: () => mockUseQuery(),
}));

describe("App", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    mockUseQuery.mockReset();
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("renders the SongList inside a container div", () => {
    mockUseQuery.mockReturnValue({
      data: { songs: [{ id: "1", title: "My Song" }] },
      loading: false,
    });

    const { container } = render(<App />);

    expect(container.querySelector(".container")).toBeInTheDocument();
    expect(screen.getByText("My Song")).toBeInTheDocument();
  });

  it("logs the selected song when a song button is clicked", () => {
    mockUseQuery.mockReturnValue({
      data: { songs: [{ id: "1", title: "My Song" }] },
      loading: false,
    });

    render(<App />);

    fireEvent.click(screen.getByText("My Song"));

    expect(consoleLogSpy).toHaveBeenCalledWith("Song selected:", {
      id: "1",
      title: "My Song",
    });
  });
});
