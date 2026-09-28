import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { useShowroom } from "../context/ShowroomContext";
import { useFetch } from "../hooks/useCars";

const empty = { name: "", phone: "", carId: "", date: "", time: "10:00" };

export default function TestDrive() {
  const { cars, bookings, dispatch } = useShowroom();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...empty, carId: params.get("car") || "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const refs = { name: useRef(), phone: useRef(), carId: useRef(), date: useRef() };
  const { data, loading, error } = useFetch("https://api.open-meteo.com/v1/forecast?latitude=10.52&longitude=76.21&current=temperature_2m,precipitation");

  useEffect(() => { refs.name.current?.focus(); }, []);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 3) err.name = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Enter a valid 10-digit mobile number";
    if (!form.carId) err.carId = "Choose a car";
    if (!form.date || new Date(form.date) < new Date(new Date().toDateString())) err.date = "Pick today or a future date";
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) return refs[first].current.focus();
    const car = cars.find((c) => c.id === Number(form.carId));
    dispatch({ type: "BOOK", booking: { ...form, carName: `${car.brand} ${car.name}` } });
    setForm(empty); setDone(true);
  };

  const Err = ({ k }) => errors[k] ? <small className="err">⚠ {errors[k]}</small> : null;

  return (
    <section className="wrap">
      <SectionTitle kicker="Book" title="Test drive">Feel the drive before you decide.</SectionTitle>
      <div className="two">
        <form className="panel" onSubmit={submit} noValidate>
          {done && <div className="ok">✅ Booking confirmed! We'll call you shortly.</div>}
          <label>Full name<input ref={refs.name} name="name" value={form.name} onChange={set} /><Err k="name" /></label>
          <label>Mobile<input ref={refs.phone} name="phone" value={form.phone} onChange={set} maxLength={10} /><Err k="phone" /></label>
          <label>Car
            <select ref={refs.carId} name="carId" value={form.carId} onChange={set}>
              <option value="">Select a car</option>
              {cars.map((c) => <option key={c.id} value={c.id}>{c.brand} {c.name}</option>)}
            </select><Err k="carId" />
          </label>
          <div className="row">
            <label style={{ flex: 1 }}>Date<input ref={refs.date} type="date" name="date" value={form.date} onChange={set} /><Err k="date" /></label>
            <label style={{ flex: 1 }}>Time
              <select name="time" value={form.time} onChange={set}><option>10:00</option><option>12:00</option><option>15:00</option><option>17:00</option></select>
            </label>
          </div>
          <button className="btn">Confirm booking</button>
        </form>

        <aside>
          <div className="panel">
            <span className="kicker">Showroom weather · live</span>
            {loading && <h3>Checking sky…</h3>}
            {error && <h3>Weather unavailable</h3>}
            {data && <h3>{data.current.temperature_2m}°C {data.current.precipitation > 0 ? "🌧️ Rain" : "☀️ Clear"}</h3>}
          </div>
          <div className="panel">
            <h3>Your bookings</h3>
            {bookings.length === 0 ? <p className="muted">No bookings yet.</p> : bookings.map((b) => (
              <div className="booking" key={b.id}>
                <div><b>{b.carName}</b><small className="muted"> {b.date} · {b.time}</small></div>
                <button className="link" onClick={() => dispatch({ type: "CANCEL_BOOKING", id: b.id })}>Cancel</button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}