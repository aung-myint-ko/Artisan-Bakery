import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  allVarietyRecipes: [],
  recipeInfo: {},
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    AddingCakes(state, action) {
      state.recipes = action.payload;
    },
    AddingBread(state, action) {
      state.recipes = action.payload;
    },
    AddingBurger(state, action) {
      state.recipes = action.payload;
    },
    AddingCookie(state, action) {
      state.recipes = action.payload;
    },
    AddingDonuts(state, action) {
      state.recipes = action.payload;
    },
    AddingDrink(state, action) {
      state.recipes = action.payload;
    },
    AddingAllVarietyRecipes(state, action) {
      state.allVarietyRecipes = action.payload;
    },
    CleaningAllVarietyRecipes(state) {
      state.allVarietyRecipes = [];
    },
    CleaningRecipes(state) {
      state.recipes = [];
    },
    AddingRecipeInfo(state, action) {
      state.recipeInfo = action.payload;
    },
    CleanigRecipeInfo(state) {
      state.recipeInfo = {};
    },
  },
});

export const {
  AddingCakes,
  AddingBread,
  AddingBurger,
  AddingCookie,
  AddingDonuts,
  AddingDrink,
  AddingRecipeInfo,
  CleanigRecipeInfo,
  AddingAllVarietyRecipes,
  CleaningRecipes,
  CleaningAllVarietyRecipes,
} = recipeSlice.actions;

export default recipeSlice;
