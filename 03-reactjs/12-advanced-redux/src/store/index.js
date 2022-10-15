import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./products-slice";
import { cartReducer } from "./cart-slice";
import { uiReducer } from "./ui-slice";

const store = configureStore({
  reducer: { ui: uiReducer, cart: cartReducer, products: productReducer },
});

export default store;
