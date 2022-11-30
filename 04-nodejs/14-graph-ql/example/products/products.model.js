const products = [
  {
    id: "redshoe",
    title: "Red Shoe",
    price: 42.12,
    reviews: [],
  },
  {
    id: "bluejean",
    title: "Blue Jeans",
    price: 55.55,
    reviews: [],
  },
];

const getAllProducts = () => {
  return products;
};

const getProductsByPrice = (min, max) => {
  return products.filter(
    (product) => min <= product.price && product.price <= max
  );
};

const getProductsById = (id) => {
  return products.find((product) => product.id === id);
};

const addNewProduct = (id, title, price) => {
  const newProduct = {
    id,
    title,
    price,
    reviews: [],
  };

  products.push(newProduct);
  return newProduct;
};

const addNewProductReview = (id, rating, comment) => {
  const existProduct = getProductsById(id);

  if (!existProduct) return;

  const review = {
    rating,
    comment,
  };

  existProduct.reviews.push(review);
  return review;
};

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductsById,
  addNewProduct,
  addNewProductReview,
};
