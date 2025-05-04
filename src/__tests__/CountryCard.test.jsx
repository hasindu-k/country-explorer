import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../components/CountryCard";

describe("CountryCard - Favorites Toggle", () => {
  const mockCountry = {
    cca3: "BWA",
    name: { common: "Botswana" },
    capital: ["Gaborone"],
    region: "Africa",
    population: 2351625,
    flags: {
      svg: "https://flagcdn.com/bw.svg",
    },
  };

  it("calls onToggleFavorite when heart icon is clicked", () => {
    const toggleMock = vi.fn();
    const clickMock = vi.fn();

    render(
      <CountryCard
        country={mockCountry}
        isFavorite={false}
        onToggleFavorite={toggleMock}
        onClick={clickMock}
      />
    );

    // Click the favorite button
    const heartBtn = screen.getByTitle("Add to favorites");
    fireEvent.click(heartBtn);

    expect(toggleMock).toHaveBeenCalledWith("BWA");
  });

  it("shows filled heart if favorite", () => {
    render(
      <CountryCard
        country={mockCountry}
        isFavorite={true}
        onToggleFavorite={() => {}}
        onClick={() => {}}
      />
    );

    expect(screen.getByTitle("Remove from favorites")).toBeInTheDocument();
  });
});
