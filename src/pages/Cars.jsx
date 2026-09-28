import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import CarCard from "../components/CarCard";
import { useCars } from "../hooks/useCars";
import { categories } from "../data/cars";

const PAGE = 12;

export default function Cars() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const sort = params.get("sort") || "name";
  const fuel = params.get("fuel") || "";
  const category = params.get("category") || "";
  const cars = useCars({ q, sort, fuel, category });
  const [visible, setVisible] = useState(PAGE);

  useEffect(() => setVisible(PAGE), [q, sort, fuel, category]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <section className="wrap">
      <SectionTitle kicker="Inventory" title="All cars">{cars.length} vehicles found</SectionTitle>
      <div className="toolbar four">
        <input placeholder="Search brand or model…" value={q} onChange={(e) => update("q", e.target.value)} />
        <select value={category} onChange={(e) => update("category", e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <select value={fuel} onChange={(e) => update("fuel", e.target.value)}>
          <option value="">All fuels</option><option>Petrol</option><option>Diesel</option><option>Electric</option>
        </select>
        <select value={sort} onChange={(e) => update("sort", e.target.value)}>
          <option value="name">Name A–Z</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option>
        </select>
      </div>
      {cars.length ? (
        <>
          <div className="grid">{cars.slice(0, visible).map((c) => <CarCard key={c.id} car={c} />)}</div>
          {visible < cars.length && (
            <div className="center"><button className="btn ghost" onClick={() => setVisible(visible + PAGE)}>Load more ({cars.length - visible} left)</button></div>
          )}
        </>
      ) : (
        <div className="empty"><h3>No cars match your filters</h3></div>
      )}
    </section>
  );
}