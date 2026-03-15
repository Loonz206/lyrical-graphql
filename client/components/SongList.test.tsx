/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import SongList from "./SongList";

const mockUseQuery = jest.fn();

jest.mock("@apollo/client", () => ({
  gql: (strings: TemplateStringsArray) => strings.join(""),
  useQuery: () => mockUseQuery(),
}));

describe("SongList", () => {
  beforeEach(() => {
    mockUseQuery.mockReset();
  });

  it("renders a loading indicator while the query is in flight", () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: true });

    render(<SongList />);

    expect(screen.getByText("Loading....")).toBeInTheDocument();
  });

  it("renders a list of songs after loading", () => {
    mockUseQuery.mockReturnValue({
      data: {
        songs: [
          { id: "1", title: "Song A" },
          { id: "2", title: "Song B" },
        ],
      },
      loading: false,
    });

    render(<SongList />);

    expect(screen.getByText("Song A")).toBeInTheDocument();
    expect(screen.getByText("Song B")).toBeInTheDocument();
  });

  it("renders an empty list when songs data is absent", () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: false });

    const { container } = render(<SongList />);

    const list = container.querySelector("ul.collection");
    expect(list).toBeInTheDocument();
    expect(list?.childElementCount).toBe(0);
  });

  it("calls onSongSelected with the correct song when a button is clicked", () => {
    const onSongSelected = jest.fn();
    mockUseQuery.mockReturnValue({
      data: { songs: [{ id: "1", title: "Song A" }] },
      loading: false,
    });

    render(<SongList onSongSelected={onSongSelected} />);

    fireEvent.click(screen.getByText("Song A"));

    expect(onSongSelected).toHaveBeenCalledWith({ id: "1", title: "Song A" });
  });

  it("does not throw when onSongSelected is not provided and a song is clicked", () => {
    mockUseQuery.mockReturnValue({
      data: { songs: [{ id: "1", title: "Song A" }] },
      loading: false,
    });

    render(<SongList />);

    expect(() => fireEvent.click(screen.getByText("Song A"))).not.toThrow();
  });
});
