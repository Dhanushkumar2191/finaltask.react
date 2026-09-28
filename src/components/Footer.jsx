import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div><div className="logo">APEX<span>MOTORS</span></div><p className="muted">Drive the extraordinary. Premium showroom, Thrissur, Kerala.</p></div>
        <div><h4>Explore</h4><Link to="/cars">All Cars</Link><Link to="/categories">Categories</Link><Link to="/wishlist">Wishlist</Link></div>
        <div><h4>Company</h4><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/test-drive">Test Drive</Link></div>
      </div>
      <p className="copy">Car images via Wikipedia / Wikimedia Commons (various free licences). Prices are approximate starting ex-showroom figures.</p>
      <p className="copy">© 2026 Apex Motors. All rights reserved.</p>
    </footer>
  );
}