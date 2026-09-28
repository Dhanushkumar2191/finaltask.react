export default function SectionTitle({ kicker, title, children }) {
  return (
    <div className="section-title">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {children && <p className="muted">{children}</p>}
    </div>
  );
}