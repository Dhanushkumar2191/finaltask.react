import { Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Categories from "./pages/Categories";
import CategoryCars from "./pages/CategoryCars";
import Wishlist from "./pages/Wishlist";
import TestDrive from "./pages/TestDrive";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/categories" element={<Categories />}>
            <Route index element={<p className="muted">Pick a category above to see its cars.</p>} />
            <Route path=":category" element={<CategoryCars />} />
          </Route>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/test-drive" element={<TestDrive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<div className="wrap empty"><h2>404 – Wrong turn</h2><Link className="btn" to="/">Back to showroom</Link></div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}