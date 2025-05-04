import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../services/api";
import Loader from "../components/Loader";

export const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCountryByCode(code)
      .then((data) => {
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError("Country not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load country details");
        setLoading(false);
      });
  }, [code]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-600">{country?.name?.common}</span>
      </nav>

      {/* Flag */}
      <div className="flex justify-center mb-6">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-60 h-40 object-contain border rounded-lg"
        />
      </div>

      {/* Name & Info */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        {country.name.common}
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <p>
          <strong>Official Name:</strong> {country.name.official}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Subregion:</strong> {country.subregion || "N/A"}
        </p>
        <p>
          <strong>Area:</strong> {country.area.toLocaleString()} km²
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Timezones:</strong> {country.timezones.join(", ")}
        </p>
        <p>
          <strong>Top Level Domain:</strong> {country.tld?.join(", ")}
        </p>
        <p>
          <strong>Country Codes:</strong> {country.cca2} / {country.cca3}
        </p>
        <p>
          <strong>Currency:</strong>{" "}
          {country.currencies
            ? Object.values(country.currencies)
                .map((cur) => `${cur.name} (${cur.symbol})`)
                .join(", ")
            : "N/A"}
        </p>
        <p className="sm:col-span-2">
          <strong>Languages:</strong>{" "}
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>
        <p className="sm:col-span-2">
          <strong>Borders:</strong>{" "}
          {country.borders?.length ? country.borders.join(", ") : "None"}
        </p>
        <p className="sm:col-span-2">
          <strong>Google Maps:</strong>{" "}
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Google Maps
          </a>
        </p>
      </div>
    </div>
  );
};

export default CountryDetails;
