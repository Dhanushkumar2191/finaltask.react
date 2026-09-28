import { NavLink, Outlet } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { categories } from "../data/cars";

export default function Categories() {
  return (
    <section className="wrap">
      <SectionTitle kicker="Browse" title="Categories">Choose a body style.</SectionTitle>
      <nav className="tabs">
        <NavLink end to="/categories">Overview</NavLink>
        {categories.map((c) => <NavLink key={c.name} to={`/categories/${c.name}`}>{c.icon} {c.name}</NavLink>)}
      </nav>
      <Outlet />
    </section>
  );
}