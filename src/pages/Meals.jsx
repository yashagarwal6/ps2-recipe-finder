
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MealCard from "../components/MealCard";

function Meals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const [search, setSearch] = useState(query);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getMeals() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        if (!cancelled) {
          setMeals(data.meals || []);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load recipes. Please try again.");
          setMeals([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getMeals();

    return () => {
      cancelled = true;
    };
  }, [query]);

  function handleSearch(e) {
    e.preventDefault();

    const dish = search.trim();
    setSearchParams(dish ? { search: dish } : {});
  }

  return (
    <div className="container">
      <div className="page-heading">
        <p className="tag">EXPLORE & DISCOVER</p>
        <h1>Explore Recipes</h1>
        <p>Find something delicious to cook today.</p>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search chicken, pasta, cake..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" className="primary-btn">
          Search
        </button>
      </form>

      {loading && (
        <p className="message">Loading recipes...</p>
      )}

      {error && (
        <p className="message error">{error}</p>
      )}

      {!loading && !error && meals.length === 0 && (
        <div className="empty-state">
          <h2>No recipe found</h2>
          <p>Try searching for another dish.</p>
        </div>
      )}

      {!loading && !error && meals.length > 0 && (
        <>
          <p className="result-count">
            {meals.length} recipes found
          </p>

          <div className="meal-grid">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Meals;
