import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import CarCard from "../components/CarCard";
import { useShowroom } from "../context/ShowroomContext";
import { categories } from "../data/cars";

export default function Home() {
  const { cars } = useShowroom();
  const featured = cars.filter((c) => [45, 22, 37].includes(c.id)); // 911, Thar, Nexon EV
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="kicker">New 2026 line-up</span>
          <h1>DRIVE THE <em>EXTRAORDINARY</em></h1>
          <p className="muted">Explore premium SUVs, sedans, electric cars and sports machines — book a test drive in under a minute.</p>
          <div className="row"><Link className="btn" to="/cars">Browse cars</Link><Link className="btn ghost" to="/test-drive">Book test drive</Link></div>
          <div className="stats">
            <div><b>{cars.length}+</b><span>Cars in stock</span></div>
            <div><b>{categories.length}</b><span>Categories</span></div>
            <div><b>24h</b><span>Test drive booking</span></div>
          </div>
        </div>
      </section>

      <section className="wrap">
        <SectionTitle kicker="Featured" title="Handpicked for you">Our showroom favourites this month.</SectionTitle>
        <div className="grid">{featured.map((c) => <CarCard key={c.id} car={c} />)}</div>
      </section>

      <section className="wrap">
        <SectionTitle kicker="Categories" title="Find your type" />
        <div className="grid cat-grid">
          {categories.map((c) => (
            <Link key={c.name} to={`/categories/${c.name}`} className="cat-tile">
              <span>{c.icon}</span><h3>{c.name}</h3><small className="muted">{c.tag}</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}