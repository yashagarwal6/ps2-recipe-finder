import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">✳</span>
        Recipe Finder
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/meals">Explore Recipes</Link>
      </nav>
    </header>
  );
}

export default Navbar; 