import React from "react";
import CountryCard from "./CountryCard";

const CountryGrid = ({
  countries,
  favorites,
  onToggleFavorite,
  onNavigate,
}) => {
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Showing {countries.length} countries
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={favorites.includes(country.cca3)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onNavigate(country.cca3)}
          />
        ))}
      </div>
    </>
  );
};

export default CountryGrid;
