import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const param = useParams();

  console.log(param.productId);

  return (
    <section>
      <h1>A Product Detail</h1>
      <p>{param.productId}</p>
    </section>
  );
};

export default ProductDetail;
