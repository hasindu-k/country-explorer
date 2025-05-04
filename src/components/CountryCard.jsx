import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CountryCard = ({ country, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition hover:scale-[1.02]"
      onClick={() => onClick(country.cca3)}
    >
      {onToggleFavorite && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(country.cca3);
          }}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition cursor-pointer"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-600" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </div>
      )}

      <div>
        <div className="h-40 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{country.name.common}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Capital:</span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
