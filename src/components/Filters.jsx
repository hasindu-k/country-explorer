import React from "react";
import { FaSearch } from "react-icons/fa";

const Filters = ({
  searchTerm,
  region,
  language,
  sortBy,
  setSearchTerm,
  setRegion,
  setLanguage,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
      <div className="relative w-full sm:w-1/3">
        <FaSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          aria-label="Search"
        />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setRegion("");
            setLanguage("");
          }}
          className="w-full pl-10 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <select
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
          setLanguage("");
          setSearchTerm("");
        }}
        className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          setRegion("");
          setSearchTerm("");
        }}
        className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Languages</option>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="arabic">Arabic</option>
        <option value="chinese">Chinese</option>
        <option value="russian">Russian</option>
        <option value="hindi">Hindi</option>
        <option value="sinhala">Sinhala</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="population-asc">Population (Low to High)</option>
        <option value="population-desc">Population (High to Low)</option>
      </select>
    </div>
  );
};

export default Filters;
