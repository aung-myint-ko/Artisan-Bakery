import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastRoute: null,
  isError: false,
  errorMessage: null,
  currentUser: null,
  totalQuantity: 0,
  finalTotalPrice: 0,
  quantity: 1,
  orderLists: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    IncreaseQuantity(state) {
      state.quantity = state.quantity + 1;
    },
    DecreaseQuantity(state) {
      if (state.quantity === 1) {
        state.quantity = 1;
      } else {
        state.quantity = state.quantity - 1;
      }
    },
    ResetQuantity(state) {
      state.quantity = 1;
    },
    CartIncreaseQuantity(state, action) {
      const { id, price } = action.payload;
      const orderItem = state.orderLists.find((order) => order.id === id);
      orderItem.orderQuantity++;
      state.totalQuantity++;
      orderItem.totalPrice = price * orderItem.orderQuantity;
    },
    CartDecreaseQuantity(state, action) {
      const { id, price, quantity } = action.payload;
      const orderItem = state.orderLists.find((order) => order.id === id);
      if (orderItem.orderQuantity === 1) {
        const remainOrder = state.orderLists.filter((order) => order.id !== id);
        state.orderLists = remainOrder;
        state.totalQuantity -= quantity;
        orderItem.totalPrice = 0;
      } else {
        orderItem.orderQuantity--;
        state.totalQuantity--;
        orderItem.totalPrice = price * orderItem.orderQuantity;
      }
    },
    AddToCart(state, action) {
      const user = sessionStorage.getItem("user");
      if (!user) {
        state.isError = true;
      } else {
        const { recipeInfo, quantity } = action.payload;
        // checking Order existing in cart
        const ExistingOrder = state.orderLists.find(
          (order) => order.id === recipeInfo._id
        );

        if (ExistingOrder) {
          ExistingOrder.totalPrice += recipeInfo.price * quantity;
          ExistingOrder.orderQuantity += quantity;
          state.totalQuantity += quantity;
        } else {
          state.totalQuantity += quantity;
          state.orderLists.push({
            id: recipeInfo._id,
            name: recipeInfo.name,
            imageUrl: recipeInfo.imageUrl,
            variety: recipeInfo.variety,
            slug: recipeInfo.slug,
            originalPrice: recipeInfo.price,
            totalPrice: recipeInfo.price * quantity,
            orderQuantity: quantity,
          });
        }
        toast.success(`${recipeInfo.name} : Qty (${quantity}) is added.`);
      }
    },
    RemoveFromCart(state, action) {
      const { id, quantity } = action.payload;
      const remainOrder = state.orderLists.filter((order) => order.id !== id);
      state.orderLists = remainOrder;
      state.totalQuantity -= quantity;
    },
    CleaningCart(state) {
      state.orderLists = [];
      state.totalQuantity = 0;
      state.finalTotalPrice = 0;
    },
    CloseMessage(state) {
      state.isError = false;
    },
    AddingCurrentUserInfo(state, action) {
      state.currentUser = action.payload;
    },
    RemovingCurrentUserInfo(state) {
      state.currentUser = null;
    },
    AddingErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    CleaningErrorMessage(state) {
      state.errorMessage = null;
    },
    UpdatingRoute(state, action) {
      state.pastRoute = action.payload;
    },
  },
});

export const {
  IncreaseQuantity,
  DecreaseQuantity,
  ResetQuantity,
  CartIncreaseQuantity,
  CartDecreaseQuantity,
  AddToCart,
  RemoveFromCart,
  CleaningCart,
  CloseMessage,
  AddingCurrentUserInfo,
  RemovingCurrentUserInfo,
  AddingErrorMessage,
  CleaningErrorMessage,
  UpdatingRoute,
} = cartSlice.actions;
export default cartSlice;
