// Exporting Module
console.log('Exporting Module');

// Blocking Code => Top Level await
// console.log('Start Fetching');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish Fetching');

const totalQuantity = 13;
const totalPrice = 237;

export const shoppingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.`);
};
