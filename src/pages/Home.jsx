import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useCountries } from "../hooks/useCountries";
import Filters from "../components/Filters";
import FavoritesToggle from "../components/FavoritesToggle";
import CountryGrid from "../components/CountryGrid";

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    countries,
    loading,
    error,
    searchTerm,
    region,
    language,
    sortBy,
    showOnlyFavorites,
    favorites,
    setSearchTerm,
    setRegion,
    setLanguage,
    setSortBy,
    setShowOnlyFavorites,
    toggleFavorite,
  } = useCountries({ user, isAuthenticated });

  return (
    <div className="container mx-auto px-4 py-8">
      <Filters
        searchTerm={searchTerm}
        region={region}
        language={language}
        sortBy={sortBy}
        setSearchTerm={setSearchTerm}
        setRegion={setRegion}
        setLanguage={setLanguage}
        setSortBy={setSortBy}
      />

      {isAuthenticated && (
        <FavoritesToggle
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
        />
      )}

      {loading && <Loader />}
      {error && <p className="text-center text-red-600 py-4">{error}</p>}

      {!loading && !error && (
        <CountryGrid
          countries={countries}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onNavigate={(code) => navigate(`/country/${code}`)}
        />
      )}
    </div>
  );
};

export default Home;
