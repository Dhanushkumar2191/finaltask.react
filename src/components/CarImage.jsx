import { useState } from "react";
import { ICONS } from "../data/cars";
import { useWikiImage } from "../hooks/useWikiImage";

export default function CarImage({ car }) {
  const wiki = useWikiImage(car.img ? null : car.wiki);
  const [broken, setBroken] = useState(false);
  const src = car.img || wiki.src;

  if (!car.img && wiki.loading) return <div className="img-skeleton" />;
  if (!src || broken) {
    return (
      <div className="img-fallback">
        <span>{ICONS[car.category] || "🚗"}</span>
        <small>{car.brand} {car.name}</small>
      </div>
    );
  }
  return (
    <img className="car-img" src={src} alt={`${car.brand} ${car.name}`} loading="lazy" onError={() => setBroken(true)} />
  );
}