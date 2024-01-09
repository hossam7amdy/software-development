import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.products.products);

  const productItems = products.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productItems}</ul>
    </section>
  );
};

export default Products;
