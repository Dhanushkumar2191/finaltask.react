import { createContext, useContext, useEffect, useReducer } from "react";
import { initialCars } from "../data/cars";

const ShowroomContext = createContext();
export const useShowroom = () => useContext(ShowroomContext);

const KEY = "showroom_v3";

function reducer(state, a) {
  switch (a.type) {
    case "ADD_CAR": return { ...state, cars: [...state.cars, { ...a.car, id: Date.now() }] };
    case "UPDATE_CAR": return { ...state, cars: state.cars.map((c) => (c.id === a.car.id ? a.car : c)) };
    case "DELETE_CAR": return { ...state, cars: state.cars.filter((c) => c.id !== a.id) };
    case "BOOK": return { ...state, bookings: [...state.bookings, { ...a.booking, id: Date.now() }] };
    case "CANCEL_BOOKING": return { ...state, bookings: state.bookings.filter((b) => b.id !== a.id) };
    case "RESET": return { cars: initialCars, bookings: [] };
    default: return state;
  }
}

const init = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || { cars: initialCars, bookings: [] }; }
  catch { return { cars: initialCars, bookings: [] }; }
};

export function ShowroomProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, init);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  return <ShowroomContext.Provider value={{ ...state, dispatch }}>{children}</ShowroomContext.Provider>;
}