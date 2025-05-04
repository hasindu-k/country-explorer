import React, { useEffect, useState } from "react";
import { getAllCountries } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "favorites")
      );
      const codes = snapshot.docs.map((doc) => doc.id);

      const all = await getAllCountries();
      const favs = all.filter((c) => codes.includes(c.cca3));

      setFavoriteCountries(favs);
      setLoading(false);
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  const toggleFavorite = async (code) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "favorites", code));
    setFavoriteCountries((prev) => prev.filter((c) => c.cca3 !== code));
  };

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return (
      <p className="text-center text-red-600 py-8">
        Please login to view favorites.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Favorite Countries
      </h1>

      {favoriteCountries.length === 0 ? (
        <p className="text-center text-gray-600">You have no favorites yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onClick={(code) => navigate(`/country/${code}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
