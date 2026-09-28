import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useShowroom } from "../context/ShowroomContext";
import { categories, price } from "../data/cars";

const blank = {
  name: "",
  brand: "",
  category: "SUV",
  fuel: "Petrol",
  price: "",
  power: "",
  year: 2026,
  img: "",
  desc: "",
};

export default function Admin() {
  const { cars, dispatch } = useShowroom();
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const nameRef = useRef();
  useEffect(() => nameRef.current?.focus(), [editId]);

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Model name required";
    if (!form.brand.trim()) err.brand = "Brand required";
    if (!(+form.price > 0)) err.price = "Price must be above 0";
    if (!(+form.power > 0)) err.power = "Power must be above 0";
    if (+form.year < 2000 || +form.year > 2027) err.year = "Year 2000–2027";
    if (form.desc.trim().length < 10)
      err.desc = "Description needs 10+ characters";
    setErrors(err);
    if (Object.keys(err).length) return;
    const car = {
      ...form,
      price: +form.price,
      power: +form.power,
      year: +form.year,
    };
    dispatch(
      editId
        ? { type: "UPDATE_CAR", car: { ...car, id: editId } }
        : { type: "ADD_CAR", car },
    );
    setForm(blank);
    setEditId(null);
  };

  const edit = (c) => {
    setForm(c);
    setEditId(c.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const Err = ({ k }) =>
    errors[k] ? <small className="err">⚠ {errors[k]}</small> : null;

  return (
    <section className="wrap">
      <SectionTitle kicker="Dashboard" title="Manage inventory">
        Add, edit or remove cars. Changes update the whole site.
      </SectionTitle>
      <form className="panel form-grid" onSubmit={submit} noValidate>
        <label>
          Model
          <input ref={nameRef} name="name" value={form.name} onChange={set} />
          <Err k="name" />
        </label>
        <label>
          Brand
          <input name="brand" value={form.brand} onChange={set} />
          <Err k="brand" />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={set}>
            {categories.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Fuel
          <select name="fuel" value={form.fuel} onChange={set}>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </label>
        <label>
          Price (Lakh)
          <input type="number" name="price" value={form.price} onChange={set} />
          <Err k="price" />
        </label>
        <label>
          Power (HP)
          <input type="number" name="power" value={form.power} onChange={set} />
          <Err k="power" />
        </label>
        <label>
          Year
          <input type="number" name="year" value={form.year} onChange={set} />
          <Err k="year" />
        </label>
        <label className="full">
          Image URL (optional, overrides the Wikipedia photo)
          <input
            name="img"
            value={form.img}
            onChange={set}
            placeholder="https://…"
          />
        </label>
        <label className="full">
          Description
          <textarea name="desc" rows="2" value={form.desc} onChange={set} />
          <Err k="desc" />
        </label>
        <div className="row full">
          <button className="btn">{editId ? "Save changes" : "Add car"}</button>
          {editId && (
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setEditId(null);
                setForm(blank);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table">
        {cars.map((c) => (
          <div className="trow" key={c.id}>
            <b>
              {c.brand} {c.name}
            </b>
            <span className="muted">
              {c.category} · {c.fuel}
            </span>
            <span>{price(c.price)}</span>
            <span className="row">
              <button className="btn ghost sm" onClick={() => edit(c)}>
                Edit
              </button>
              <button
                className="btn ghost sm danger"
                onClick={() =>
                  window.confirm(`Delete ${c.name}?`) &&
                  dispatch({ type: "DELETE_CAR", id: c.id })
                }
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
      <button
        className="btn ghost sm"
        style={{ marginTop: 16 }}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset sample data
      </button>
    </section>
  );
}
