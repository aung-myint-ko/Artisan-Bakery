import { createSlice } from "@reduxjs/toolkit";
import ShopLists from "../components/Shop/ShopLists";

const initialState = {
  clicked: false,
  shopDetails: null,
  totalShops: ShopLists,
};

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    GiveShopDetails(state, action) {
      state.shopDetails = action.payload;
    },
    ActivateClicked(state) {
      state.clicked = true;
    },
    DeActivateClicked(state) {
      state.clicked = false;
    },
  },
});

export const { GiveShopDetails, ActivateClicked, DeActivateClicked } =
  shopSlice.actions;
export default shopSlice;
