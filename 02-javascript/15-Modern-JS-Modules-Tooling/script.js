// Importing Module
console.log('Importing Module');

///////////////////////////////////////
/* Exporting and Importing Modules */
// Custom Import
import { addToCart, cart } from './shoppingCart.js';
addToCart('Shoes', 2);
console.log(cart);
addToCart('Shirt', 3);
addToCart('bag', 1);
console.log(cart);

// Import All
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('shoes', 5);
// console.log(ShoppingCart.shoppingCost);

///////////////////////////////////////
/* The Module Pattern 

// Using IIFE
const shoppingCart2 = (function () {
  const totalQuantity = 13;
  const totalPrice = 237;

  const shoppingCost = 10;
  const cart = [];

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart.
    Shipping cost = ${shoppingCost}`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('apple', 5);
shoppingCart2.addToCart('pizza', 3);
console.log(shoppingCart2);
console.log(shoppingCart2.totalPrice);
console.log(shoppingCart2.shoppingCost);
*/

///////////////////////////////////////
/* CommonJS Modules

// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart.
  Shipping cost = ${shoppingCost}`);
};

// Import
const { addToCart } = import.requier('./shoppingCart.js')
*/

///////////////////////////////////////
/* Introduction to npm */

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateCloneDeep = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone); // shallow copy
console.log(stateCloneDeep); // deep copy

if (module.hot) {
  module.hot.accept();
}
