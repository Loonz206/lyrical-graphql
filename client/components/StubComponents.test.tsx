/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import SongDetail from "./SongDetail";
import SongCreate from "./SongCreate";
import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";

describe("Stub components", () => {
  it("SongDetail renders null", () => {
    const { container } = render(<SongDetail />);
    expect(container.firstChild).toBeNull();
  });

  it("SongCreate renders null", () => {
    const { container } = render(<SongCreate />);
    expect(container.firstChild).toBeNull();
  });

  it("LyricList renders null", () => {
    const { container } = render(<LyricList />);
    expect(container.firstChild).toBeNull();
  });

  it("LyricCreate renders null", () => {
    const { container } = render(<LyricCreate />);
    expect(container.firstChild).toBeNull();
  });
});
