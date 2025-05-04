import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthContext";
import { server } from "../__mocks__/server";
import { rest } from "msw";

server.use(
  rest.get("https://restcountries.com/v3.1/all", (req, res, ctx) => {
    const fields = req.url.searchParams.get("fields");

    if (fields !== "name,capital,region,population,languages,flags,cca3") {
      return res(ctx.status(400));
    }

    return res(
      ctx.json([
        {
          cca3: "BWA",
          name: { common: "Botswana" },
          capital: ["Gaborone"],
          region: "Africa",
          population: 2351625,
          flags: { svg: "https://flagcdn.com/bw.svg" },
          languages: { eng: "English", tsn: "Tswana" },
        },
      ])
    );
  }),

  rest.get("https://restcountries.com/v3.1/name/botswana", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          cca3: "BWA",
          name: { common: "Botswana" },
          capital: ["Gaborone"],
          region: "Africa",
          population: 2351625,
          flags: { svg: "https://flagcdn.com/bw.svg" },
          languages: { eng: "English", tsn: "Tswana" },
        },
      ])
    );
  })
);

describe("Home Page Integration", () => {
  it("renders filters and loader", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );

    expect(
      screen.getByPlaceholderText(/search for a country/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/all regions/i)).toBeInTheDocument();
  });
  /*
  it("renders country after search", async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: "botswana" } });

    const result = await screen.findByText("Botswana");
    expect(result).toBeInTheDocument();
    expect(await screen.findByText(/Gaborone/)).toBeInTheDocument();
  });
  */
});
