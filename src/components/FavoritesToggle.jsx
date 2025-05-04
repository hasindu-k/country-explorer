import React from "react";

const FavoritesToggle = ({ showOnlyFavorites, setShowOnlyFavorites }) => {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
        />
        Show only favorites
      </label>
    </div>
  );
};

export default FavoritesToggle;
