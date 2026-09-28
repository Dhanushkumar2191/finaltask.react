import SectionTitle from "../components/SectionTitle";

const values = [
  ["🔍", "Transparent pricing", "No hidden charges — what you see is what you pay."],
  ["🛠️", "Certified service", "Factory-trained technicians for every brand we sell."],
  ["🤝", "Lifetime support", "From first test drive to your tenth service."],
];
const timeline = [["2010", "Opened our first showroom in Thrissur"], ["2018", "Crossed 5,000 happy customers"], ["2024", "Launched our electric vehicle division"], ["2026", "Digital showroom goes live"]];

export default function About() {
  return (
    <section className="wrap">
      <SectionTitle kicker="Our story" title="About Apex Motors">
        We started with one belief: buying a car should feel as good as driving one.
      </SectionTitle>
      <div className="grid">
        {values.map(([i, t, d]) => <div className="panel" key={t}><div className="big-icon">{i}</div><h3>{t}</h3><p className="muted">{d}</p></div>)}
      </div>
      <h3 style={{ margin: "40px 0 16px" }}>Milestones</h3>
      <ul className="timeline">{timeline.map(([y, t]) => <li key={y}><b>{y}</b><span>{t}</span></li>)}</ul>
    </section>
  );
}