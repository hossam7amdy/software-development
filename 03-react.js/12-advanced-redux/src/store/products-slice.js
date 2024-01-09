import { createSlice } from "@reduxjs/toolkit";

const initialProducts = {
  products: [
    {
      id: "e1",
      name: "item1",
      price: 6,
      description: "This is a first product - amazing!",
    },
    {
      id: "e2",
      name: "item2",
      price: 9,
      description: "This is a second product - wonderful!",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {
    addNewProduct() {},
  },
});

export const productReducer = productSlice.reducer;
