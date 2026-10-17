import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import MealDetails from "./pages/MealDetails";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Recipe Finder · Powered by TheMealDB
      </footer>
    </div>
  );
}

export default App;