import React, { useContext } from "react";
import { ProductsContext } from "../../context/products-context";

import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { toggleFavoraite } = useContext(ProductsContext);

  const toggleFavHandler = () => {
    toggleFavoraite(props.id);
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
