import { configureStore } from "@reduxjs/toolkit";
import wishlist from "./wishlistSlice";

export const store = configureStore({ reducer: { wishlist } });
store.subscribe(() => localStorage.setItem("wishlist", JSON.stringify(store.getState().wishlist)));