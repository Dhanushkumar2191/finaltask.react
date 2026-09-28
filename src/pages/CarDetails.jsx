import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useShowroom } from "../context/ShowroomContext";
import { toggle } from "../redux/wishlistSlice";
import { price } from "../data/cars";
import CarImage from "../components/CarImage";
import CarCard from "../components/CarCard";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars } = useShowroom();
  const dispatch = useDispatch();
  const car = cars.find((c) => c.id === Number(id));
  const liked = useSelector((s) => s.wishlist.includes(Number(id)));

  if (!car) return <div className="wrap empty"><h2>Car not found</h2><Link className="btn" to="/cars">Back to cars</Link></div>;

  const similar = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);
  const specs = [["Brand", car.brand], ["Category", car.category], ["Fuel", car.fuel], ["Power", `${car.power} HP`], ["Year", car.year]];

  return (
    <section className="wrap details">
      <button className="link" onClick={() => navigate(-1)}>← Back</button>
      <div className="details-grid">
        <div className="big-art"><CarImage car={car} /></div>
        <div>
          <span className="kicker">{car.brand}</span>
          <h1>{car.name}</h1>
          <p className="price">{price(car.price)} <small>approx. ex-showroom (starting)</small></p>
          <p className="muted">{car.desc}</p>
          <ul className="specs">{specs.map(([k, v]) => <li key={k}><span>{k}</span><b>{v}</b></li>)}</ul>
          <div className="row">
            <Link className="btn" to={`/test-drive?car=${car.id}`}>Book test drive</Link>
            <button className="btn ghost" onClick={() => dispatch(toggle(car.id))}>{liked ? "♥ In wishlist" : "♡ Add to wishlist"}</button>
          </div>
        </div>
      </div>
      {similar.length > 0 && (
        <>
          <h3 style={{ margin: "48px 0 16px" }}>Similar {car.category} cars</h3>
          <div className="grid">{similar.map((c) => <CarCard key={c.id} car={c} />)}</div>
        </>
      )}
    </section>
  );
}