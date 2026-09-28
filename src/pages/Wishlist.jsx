import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import CarCard from "../components/CarCard";
import { useShowroom } from "../context/ShowroomContext";
import { clearWishlist } from "../redux/wishlistSlice";

export default function Wishlist() {
  const ids = useSelector((s) => s.wishlist);
  const dispatch = useDispatch();
  const { cars } = useShowroom();
  const saved = cars.filter((c) => ids.includes(c.id));

  return (
    <section className="wrap">
      <SectionTitle kicker="Saved" title="Your wishlist" />
      {saved.length === 0 ? (
        <div className="empty"><h3>No favourites yet</h3><Link className="btn" to="/cars">Explore cars</Link></div>
      ) : (
        <>
          <div className="grid">{saved.map((c) => <CarCard key={c.id} car={c} />)}</div>
          <button className="btn ghost" style={{ marginTop: 24 }} onClick={() => dispatch(clearWishlist())}>Clear wishlist</button>
        </>
      )}
    </section>
  );
}