import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MealDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getMeal() {
      setLoading(true);
      setError("");
      setMeal(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!response.ok) {
          throw new Error("Could not load recipe");
        }

        const data = await response.json();

        if (!cancelled) {
          setMeal(data.meals?.[0] || null);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load recipe. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getMeal();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="message">Loading recipe...</p>;
  }

  if (error) {
    return (
      <div className="message">
        <p>{error}</p>
        <Link to="/meals">Back to recipes</Link>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="message">
        <h2>Recipe not found</h2>
        <Link to="/meals">Explore recipes</Link>
      </div>
    );
  }
const ingredients = [];

for (let i = 1; i <= 20; i++) {
  const ingredient = meal[`strIngredient${i}`];
  const measure = meal[`strMeasure${i}`];

  if (ingredient && ingredient.trim() !== "") {
    ingredients.push({
      id: i,
      ingredient: ingredient.trim(),
      measure: measure ? measure.trim() : "",
    });
  }
}

  return (
    <article className="container detail">
      <Link to="/meals" className="back-link">
        ← Back to recipes
      </Link>

      <div className="detail-top">
        <img src={meal.strMealThumb} alt={meal.strMeal} />

        <div>
          <p className="tag">
            {meal.strArea || "International"} Cuisine
          </p>

          <h1>{meal.strMeal}</h1>

          <p>Category: {meal.strCategory || "Recipe"}</p>
        </div>
      </div>

      <section className="recipe-section">
        <h2>Ingredients</h2>

        <ul className="ingredients">
          {ingredients.map((item) => (
            <li key={item.id}>
              <span>{item.ingredient}</span>
              <span>{item.measure}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Instructions</h2>

        <p className="instructions">
          {meal.strInstructions || "Instructions unavailable."}
        </p>
      </section>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noreferrer"
          className="primary-btn youtube-link"
        >
          Watch on YouTube ↗
        </a>
      )}
    </article>
  );
}
 
export default MealDetails;