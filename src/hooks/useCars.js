import { useEffect, useMemo, useState } from "react";
import { useShowroom } from "../context/ShowroomContext";


export function useCars({ q = "", sort = "name", fuel = "", category = "" } = {}) {
  const { cars } = useShowroom();
  return useMemo(() => {
    const list = cars.filter(
      (c) =>
        (!category || c.category === category) &&
        (!fuel || c.fuel === fuel) &&
        `${c.brand} ${c.name}`.toLowerCase().includes(q.toLowerCase())
    );
    const sorters = {
      name: (a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    };
    return list.sort(sorters[sort] || sorters.name);
  }, [cars, q, sort, fuel, category]);
}

export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let alive = true;
    setState({ data: null, loading: true, error: null });
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error("Failed"); return r.json(); })
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((e) => alive && setState({ data: null, loading: false, error: e.message }));
    return () => { alive = false; };
  }, [url]);
  return state;
}