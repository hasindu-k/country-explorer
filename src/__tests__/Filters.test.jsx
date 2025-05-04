import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/Filters";
import { describe, it, expect, vi } from "vitest";

describe("Filters Component", () => {
  it("renders all inputs and selects", () => {
    render(
      <Filters
        searchTerm=""
        region=""
        language=""
        sortBy="name-asc"
        setSearchTerm={() => {}}
        setRegion={() => {}}
        setLanguage={() => {}}
        setSortBy={() => {}}
      />
    );

    expect(
      screen.getByPlaceholderText(/search for a country/i)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Regions")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Languages")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Name (A-Z)")).toBeInTheDocument();
  });

  it("calls setSearchTerm on input", () => {
    const setSearchTerm = vi.fn();
    render(
      <Filters
        searchTerm=""
        region=""
        language=""
        sortBy="name-asc"
        setSearchTerm={setSearchTerm}
        setRegion={() => {}}
        setLanguage={() => {}}
        setSortBy={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: "test" } });
    expect(setSearchTerm).toHaveBeenCalledWith("test");
  });

  it("calls setRegion and clears others on region change", () => {
    const setRegion = vi.fn();
    const setLanguage = vi.fn();
    const setSearchTerm = vi.fn();

    render(
      <Filters
        searchTerm=""
        region=""
        language=""
        sortBy="name-asc"
        setSearchTerm={setSearchTerm}
        setRegion={setRegion}
        setLanguage={setLanguage}
        setSortBy={() => {}}
      />
    );

    fireEvent.change(screen.getByDisplayValue("All Regions"), {
      target: { value: "Asia" },
    });

    expect(setRegion).toHaveBeenCalledWith("Asia");
    expect(setLanguage).toHaveBeenCalledWith("");
    expect(setSearchTerm).toHaveBeenCalledWith("");
  });
});
