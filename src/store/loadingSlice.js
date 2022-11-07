import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipiesDetialsLoading: false,
  menuLoading: false,
  authLoading: false,
  pageTransition: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    RecipiesDetialsLoadingStart(state) {
      state.recipiesDetialsLoading = true;
    },
    RecipiesDetialsLoadingStop(state) {
      state.recipiesDetialsLoading = false;
    },
    MenuLoadingStart(state) {
      state.menuLoading = true;
    },
    MenuLoadingStop(state) {
      state.menuLoading = false;
    },
    AuthLoadingStart(state) {
      state.authLoading = true;
    },
    AuthLoadingStop(state) {
      state.authLoading = false;
    },
    PageTransitionStart(state) {
      state.pageTransition = true;
    },
    PageTransitionStop(state) {
      state.pageTransition = false;
    },
  },
});

export const {
  RecipiesDetialsLoadingStart,
  RecipiesDetialsLoadingStop,
  MenuLoadingStart,
  MenuLoadingStop,
  AuthLoadingStart,
  AuthLoadingStop,
  PageTransitionStart,
  PageTransitionStop,
} = loadingSlice.actions;
export default loadingSlice;
