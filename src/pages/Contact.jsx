import { useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState("");
  const refs = { name: useRef(), email: useRef(), message: useRef() };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (f.name.trim().length < 2) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email";
    if (f.message.trim().length < 10) err.message = "Message must be 10+ characters";
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) return refs[first].current.focus();
    setSent(f.name); setF({ name: "", email: "", message: "" });
  };
  const bind = (k) => ({ ref: refs[k], value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });

  return (
    <section className="wrap">
      <SectionTitle kicker="Say hello" title="Contact us" />
      <div className="two">
        <div className="panel">
          <h3>Visit the showroom</h3>
          <p className="muted">📍 Round South, Thrissur, Kerala</p>
          <p className="muted">📞 +91 98765 43210</p>
          <p className="muted">✉️ hello@apexmotors.in</p>
          <p className="muted">🕘 Mon–Sat, 9 AM – 7 PM</p>
        </div>
        <form className="panel" onSubmit={submit} noValidate>
          {sent && <div className="ok">Thanks {sent}! We'll get back to you soon.</div>}
          <label>Name<input {...bind("name")} />{errors.name && <small className="err">⚠ {errors.name}</small>}</label>
          <label>Email<input type="email" {...bind("email")} />{errors.email && <small className="err">⚠ {errors.email}</small>}</label>
          <label>Message<textarea rows="5" {...bind("message")} />{errors.message && <small className="err">⚠ {errors.message}</small>}</label>
          <button className="btn">Send message</button>
        </form>
      </div>
    </section>
  );
}