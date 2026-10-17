import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <p className="tag">ERROR 404</p>
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find the page you requested.</p>

      <Link to="/" className="primary-btn">
        ← Back to Home
      </Link>
    </section>
  );
}

export default NotFound;   