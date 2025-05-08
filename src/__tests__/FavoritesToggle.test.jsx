import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FavoritesToggle from "../components/FavoritesToggle";

describe("FavoritesToggle Component", () => {
  it("renders checkbox and label", () => {
    render(
      <FavoritesToggle
        showOnlyFavorites={false}
        setShowOnlyFavorites={() => {}}
      />
    );

    expect(screen.getByLabelText(/show only favorites/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles checkbox and calls handler", () => {
    const setShowOnlyFavorites = vi.fn();

    render(
      <FavoritesToggle
        showOnlyFavorites={false}
        setShowOnlyFavorites={setShowOnlyFavorites}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(setShowOnlyFavorites).toHaveBeenCalledWith(true);
  });

  it("passes correct value when already checked", () => {
    const setShowOnlyFavorites = vi.fn();

    render(
      <FavoritesToggle
        showOnlyFavorites={true}
        setShowOnlyFavorites={setShowOnlyFavorites}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(setShowOnlyFavorites).toHaveBeenCalledWith(false);
  });
});
