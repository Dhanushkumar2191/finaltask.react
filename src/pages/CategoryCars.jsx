import { useParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import { useCars } from "../hooks/useCars";

export default function CategoryCars() {
  const { category } = useParams();
  const cars = useCars({ category });
  return cars.length ? (
    <div className="grid">{cars.map((c) => <CarCard key={c.id} car={c} />)}</div>
  ) : (
    <div className="empty"><h3>No {category} cars in stock yet</h3></div>
  );
}