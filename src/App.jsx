import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  // Mencari resep berdasarkan nama
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setDetailError("");
    setDetailLoading(false);
    setSelectedRecipe(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data resep.");
      }

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.error(error);
      setError("Gagal memuat resep. Silakan coba lagi.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Mengambil detail resep berdasarkan ID
  const handleViewDetail = async (id) => {
    setDetailLoading(true);
    setDetailError("");
    setSelectedRecipe(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil detail resep.");
      }

      const data = await response.json();
      const meal = data.meals?.[0];

      if (!meal) {
        throw new Error("Detail resep tidak ditemukan.");
      }

      setSelectedRecipe(meal);
    } catch (error) {
      console.error(error);
      setDetailError("Gagal memuat detail resep. Silakan coba lagi.");
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <main className="app">
      <Header />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Status Pencarian */}
      {loading && <p className="status-message">Sedang mencari resep...</p>}

      {error && <p className="status-error">{error}</p>}

      {/* Status Detail Resep */}
      {detailLoading && (
        <p className="status-message">Sedang memuat detail resep...</p>
      )}

      {detailError && <p className="status-error">{detailError}</p>}

      {/* Detail Resep */}
      {!loading && !detailLoading && selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      )}

      {/* Hasil Pencarian */}
      {!loading &&
        !error &&
        !detailLoading &&
        !selectedRecipe &&
        hasSearched &&
        (recipes.length > 0 ? (
          <RecipeList recipes={recipes} onViewDetail={handleViewDetail} />
        ) : (
          <p className="empty-message">
            Resep tidak ditemukan. Coba kata pencarian lain.
          </p>
        ))}
    </main>
  );
}

export default App;
