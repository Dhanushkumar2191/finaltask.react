import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [["/", "Home"], ["/cars", "Cars"], ["/categories", "Categories"], ["/test-drive", "Test Drive"], ["/about", "About"], ["/contact", "Contact"], ["/admin", "Admin"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector((s) => s.wishlist.length);
  return (
    <header className="nav">
      <Link to="/" className="logo">APEX<span>MOTORS</span></Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? "✕" : "☰"}</button>
      <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
        ))}
        <NavLink to="/wishlist" className="wish">♥ {count > 0 && <i>{count}</i>}</NavLink>
      </nav>
    </header>
  );
}