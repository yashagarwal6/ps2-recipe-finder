
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <p>Welcome to Recipe Finder</p>

      <h1>Find Recipes You Love</h1>

      <p>
        Looking for something to cook?
        Search for different recipes and
        find the ingredients and instructions.
      </p>

      <button
        className="primary-btn"
        onClick={() => navigate("/meals")}
      >
        Explore Recipes
      </button>
    </div>
  );
}

export default Home;
