import { useState, useEffect, useCallback } from "react";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
  getCountriesByLanguage,
} from "../services/api";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

export const useCountries = ({ user, isAuthenticated }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const fetchAll = useCallback(() => {
    setLoading(true);
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setError("");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load countries");
        setLoading(false);
      });
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        fetchAll();
      } else {
        getCountryByName(value)
          .then((data) => {
            setCountries(data);
            setError("");
          })
          .catch(() => {
            setCountries([]);
            setError("No countries found");
          });
      }
    }, 500),
    [fetchAll]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const applySorting = (list) => {
      return [...list].sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.common.localeCompare(b.name.common);
          case "name-desc":
            return b.name.common.localeCompare(a.name.common);
          case "population-asc":
            return a.population - b.population;
          case "population-desc":
            return b.population - a.population;
          default:
            return 0;
        }
      });
    };

    let result = [...countries];

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (region) {
      result = result.filter((c) => c.region === region);
    }
    if (language) {
      result = result.filter(
        (c) =>
          c.languages &&
          Object.values(c.languages).some((lang) =>
            lang.toLowerCase().includes(language.toLowerCase())
          )
      );
    }
    if (showOnlyFavorites) {
      result = result.filter((c) => favorites.includes(c.cca3));
    }

    setFiltered(applySorting(result));
  }, [
    countries,
    searchTerm,
    region,
    language,
    sortBy,
    showOnlyFavorites,
    favorites,
  ]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const loadFavorites = async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "favorites")
      );
      const favCodes = snapshot.docs.map((doc) => doc.id);
      setFavorites(favCodes);
    };

    loadFavorites();
  }, [isAuthenticated, user]);

  const toggleFavorite = async (code) => {
    if (!isAuthenticated || !user) {
      toast.warning("Please login to favorite countries.");
      return;
    }

    const ref = doc(db, "users", user.uid, "favorites", code);

    if (favorites.includes(code)) {
      await deleteDoc(ref);
      setFavorites((prev) => prev.filter((f) => f !== code));
      toast.success("Removed from favorites");
    } else {
      await setDoc(ref, { countryCode: code });
      setFavorites((prev) => [...prev, code]);
      toast.success("Added to favorites");
    }
  };

  return {
    countries: filtered,
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
  };
};
