import { Link } from "react-router-dom";

const Products = () => {
  return (
    <section>
      <h1>The Product page</h1>
      <ul>
        <Link to={"p1"}>
          <li>A Book</li>
        </Link>
        <Link to={"p2"}>
          <li>A Carpet</li>
        </Link>
        <Link to={"p3"}>
          <li>An Online Course</li>
        </Link>
      </ul>
    </section>
  );
};

export default Products;
