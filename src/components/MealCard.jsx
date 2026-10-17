import { Link } from "react-router-dom";

function MealCard({ meal }) {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="meal-card">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        loading="lazy"
      />

      <div className="meal-card-info">
        <p className="meal-category">
          {meal.strArea || "International"} cuisine
        </p>

        <h3>{meal.strMeal}</h3>

        <span className="view-recipe">
          View recipe →
        </span>
      </div>
    </Link>
  );
}

export default MealCard;