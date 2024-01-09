import React, { createContext, useState } from "react";

const initialState = [
  {
    id: "p1",
    title: "Red Scarf",
    description: "A pretty red scarf.",
    isFavorite: false,
  },
  {
    id: "p2",
    title: "Blue T-Shirt",
    description: "A pretty blue t-shirt.",
    isFavorite: false,
  },
  {
    id: "p3",
    title: "Green Trousers",
    description: "A pair of lightly green trousers.",
    isFavorite: false,
  },
  {
    id: "p4",
    title: "Orange Hat",
    description: "Street style! An orange hat.",
    isFavorite: false,
  },
];

export const ProductsContext = createContext({
  products: [],
  toggleFavoraite: (id) => {},
});

export default (props) => {
  const [productsList, setProductsList] = useState(initialState);

  const toggleFavoraiteHandler = (id) => {
    const updatedProductList = productsList.map((product) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        isFavorite:
          product.id === id ? !product.isFavorite : product.isFavorite,
      };
    });

    setProductsList(updatedProductList);
  };

  const productsContext = {
    productsList,
    toggleFavoraite: toggleFavoraiteHandler,
  };

  return (
    <ProductsContext.Provider value={productsContext}>
      {props.children}
    </ProductsContext.Provider>
  );
};
