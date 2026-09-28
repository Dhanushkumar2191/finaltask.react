import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../redux/wishlistSlice";
import { price } from "../data/cars";
import CarImage from "./CarImage";

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const liked = useSelector((s) => s.wishlist.includes(car.id));
  return (
    <article className="card">
      <div className="car-art">
        <CarImage car={car} />
        <span className="badge">{car.category}</span>
        <button className={`heart ${liked ? "on" : ""}`} onClick={() => dispatch(toggle(car.id))} aria-label="Toggle wishlist">
          {liked ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body">
        <small className="muted">{car.brand} · {car.year}</small>
        <h3>{car.name}</h3>
        <p className="muted">{car.fuel} · {car.power} HP</p>
        <div className="card-foot">
          <strong>{price(car.price)}*</strong>
          <Link className="btn sm" to={`/cars/${car.id}`}>Details →</Link>
        </div>
      </div>
    </article>
  );
}