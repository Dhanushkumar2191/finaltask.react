import { createSlice } from "@reduxjs/toolkit";

const saved = () => { try { return JSON.parse(localStorage.getItem("wishlist")) || []; } catch { return []; } };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: saved(),
  reducers: {
    toggle: (state, { payload }) =>
      state.includes(payload) ? state.filter((id) => id !== payload) : [...state, payload],
    clearWishlist: () => [],
  },
});
export const { toggle, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;