import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  recipesArray: [],
  recipeInput: {
    name: undefined,
    variety: undefined,
    desc: undefined,
    price: undefined,
    image: undefined,
  },
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    LoginStart(state, action) {
      state.loading = true;
    },
    LoginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    LoginError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    AddRceipesToArray(state, action) {
      state.recipesArray = action.payload;
    },
  },
});

export const { LoginStart, LoginSuccess, LoginError, AddRceipesToArray } =
  apiSlice.actions;
export default apiSlice;
