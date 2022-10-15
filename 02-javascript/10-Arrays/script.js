'use strict';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// 1) Simple Array Methods
/**
 *
 */
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// slice: return new array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));

// splice: mutate original array
arr.splice(-1);
console.log(arr);
arr.splice(2, 1); // from 2 delete 1 element
console.log(arr);

// reverse: mutate original array
let arr2 = ['a', 'b', 'c', 'd', 'e', 'f'];
arr2.reverse();
console.log(arr2);

// concat: return new array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same result (spread operator)

// join: return string
console.log(letters.join(' - '));

// The new at Methods
const dummy = [23, 16, 25];
console.log(dummy[0]);
console.log(dummy.at(0));
// access last element
console.log(dummy[dummy.length - 1]);
console.log(dummy.at(-1));

/////////////////////////////////////////////////
// 2) Looping Arrays: forEach
/**
 *
 */
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log('----- Normal Looping -----');
for (const [idx, ele] of movements2.entries()) {
  if (ele > 0) {
    console.log(`Movement ${idx + 1}: You Deposited ${ele}`);
  } else {
    console.log(`Movement ${idx + 1}: You Withdraw ${Math.abs(ele)}`);
  }
}
console.log('----- USING forEach -----');
// using callback function technique
movements2.forEach(function (ele, idx) {
  if (ele > 0) {
    console.log(`Movement ${idx + 1}: You Deposited ${ele}`);
  } else {
    console.log(`Movement ${idx + 1}: You Withdraw ${Math.abs(ele)}`);
  }
});
console.log('----- WITH Arrow Function -----');
movements2.forEach((ele, idx) => {
  if (ele > 0) {
    console.log(`Movement ${idx + 1}: You Deposited ${ele}`);
  } else {
    console.log(`Movement ${idx + 1}: You Withdraw ${Math.abs(ele)}`);
  }
});

/////////////////////////////////////////////////
// 3) forEach with maps & sets
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// maps
currencies2.forEach(function (value, key) {
  console.log(`${key}: ${value}`);
});

// sets
const uniqueCurrencies = new Set([
  'EGP',
  'EUR',
  'UDS',
  'GBP',
  'EGP',
  'EUR',
  'UDS',
  'GBP',
]);
uniqueCurrencies.forEach(function (val) {
  console.log(val);
});

///////////////////////////////////////////////////////
/** ///// 4) Coding Challenge #1:
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
  1. Julia found out that the owners of the first and the last two dogs actually have 
    cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
    ages from that copied array (because it's a bad practice to mutate function parameters)
  2. Create an array with both Julia's (corrected) and Kate's data
  3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
    is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy ")
  4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const allDogs = [...dogsJulia.slice(1, -2), ...dogsKate];

  allDogs.forEach(function (dog, idx) {
    console.log(
      `Dog number ${idx + 1} is ${
        dog >= 3 ? `an adult, and is ${dog} years old` : 'still a puppy 🐶'
      }.`
    );
  });
};

console.log('------------ Test 1 ------------');
const dataJulia = [3, 5, 2, 12, 7];
const dataKate = [4, 1, 15, 8, 3];
checkDogs(dataJulia, dataKate);

console.log('------------ Test 2 ------------');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////////////////////
/** ///// 5) The map Method:
 * map returns a new array containing the results of applying an operation on all original array elements.
 */

const eurToUSD = 1.1;
// USING function expression
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });
// USING Arrow function
const movementsUSD = movements.map(mov => mov * eurToUSD);

console.log(movements); // doesn't mutate original array
console.log(movementsUSD);

const movementsDescription = movementsUSD.map(
  mov,
  idx =>
    `Movement ${idx + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${abs(mov)}`
);
console.log(movementsDescription);

///////////////////////////////////////////////////////
/** ///// 6) The filter Method:
 * filter returns a new array containing the array elements that passed a specified test condition.
 */

const deposit = account1.movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawal = account1.movements.filter(mov => mov < 0);
console.log(withdrawals);

///////////////////////////////////////////////////////
/** ///// 7) The reduce Method:
 * reduce boils (“reduces”) all array elements down to one single value (e.g. adding all elements together).
 */
// accumulator -> SNOWBALL
const balance = movements.reduce((acc, curVal) => acc + curVal, 0);
console.log(balance);

// Calculate Max value
// Expression function
const maxVal = movements.reduce(function (acc, mov) {
  if (mov > acc) acc = mov;
  return acc;
}, 0);
// Arrow function
const maxVal2 = movements.reduce(
  (acc, mov) => (acc = mov > acc ? mov : acc),
  movements[0]
);
console.log(maxVal);
console.log(maxVal2);

///////////////////////////////////////////////////////
/** ///// 8) Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: 
  If the dog is <= 2 years old, humanAge = 2 * dogAge
  If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old.
3. Calculate the average human age of all adult dogs
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age > 18);
  const average = adults.reduce((acc, age) => acc + age) / adults.length;
  return average;
};
// PIPLINE / CHAINING
const calcAverageHumanAge2 = function (ages) {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, idx, arr) => acc + age / arr.length, 0);

  // (2+3)/2 = 2.5 === (2/2) + (3/2) = 2.5
};
// Arrow function + Chaining
const calcAverageHumanAge3 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, idx, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));
console.log(calcAverageHumanAge3([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////////////////////
///// 9) include, some, every Methods:

// include: check for EQUALITY
console.log(movements.includes(200));

// some: certain CONDITION
console.log(movements.some(mov => mov > 0));

// every: all of them
console.log(movements.every(mov => mov > 0));

///////////////////////////////////////////////////////
///// 10) flat Array Method:

const arr2D = [1, 2, [3, 4], 5, [6, 7]];
console.log(arr2D.flat());

const arrDeep = [1, 2, [3, 4, [5, 6]], 7, [(8)[(9, 10)]]];
console.log(arrDeep.flat(2)); // how deep is it ?

///////////////////////////////////////////////////////
///// 11) Sorting Arrays:
/**
 * Defualt: sort is a string based,
 *          to sort numbers you need to pass in callback function
 *
 * Sort: mutates the array and returns a reference to the same array.
 */

const names = ['Ziad', 'Hossam', 'Emad', 'Ahmed'];
console.log(names.sort()); // ['Ahmed', 'Emad', 'Hossam', 'Ziad']

const numbers = [...movements];

numbers.sort((a, b) => a - b); // Ascending
console.log(numbers);

numbers.sort((a, b) => b - a); // Descending
console.log(numbers);

///////////////////////////////////////////////////////
///// 12) More Ways of Creating and Filling Arrays:

// 1) new keywork
const x = new Array(10);
x.fill(23, 3, 7);
console.log(x); // [empty × 3, 23, 23, 23, 23, empty × 3]

const y = new Array(10).fill(0);
console.log(y);

// 3) from
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const rand = Array.from({ length: 50 }, () =>
  Math.trunc(Math.random() * 100 + 1)
);
console.log(rand);

///////////////////////////////////////////////////////
///// 13) Arrays Methods Practice:

// 1- How much has been deposited in total in the bank
const allDeposited = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(allDeposited); // 25180

// 2- How many deposits with at least 1000$
const countDeposits1 = accounts
  .flatMap(account => account.movements)
  .reduce((count, mov) => (count += mov >= 1000), 0);

const countDeposits2 = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov >= 1000).length;

console.log(countDeposits1, countDeposits2); // 6 6

// 3- Calculate the sum of deposits and withdrawals
const summary = accounts
  .flatMap(account => account.movements)
  .reduce(
    (summary, mov) => {
      summary[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return summary;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(summary); // {deposits: 25180, withdrawals: -7340}

const [deposits, withdrawals] = accounts
  .flatMap(account => account.movements)
  .reduce(
    (arr, mov) => {
      arr[mov > 0 ? 0 : 1] += mov;
      return arr;
    },
    [0, 0]
  );
console.log(deposits, withdrawals); // 25180 -7340

// 4- Only deposits with at least 1000$
const deposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((array, mov) => {
    if (mov >= 1000) array.push(mov);
    return array;
  }, new Array());
console.log(deposits1000);

// 5- Convert to title
const toTitleCase = function (title) {
  const exeptions = [
    'and',
    'as',
    'but',
    'for',
    'if',
    'nor',
    'or',
    'so',
    'yet',
    'a',
    'an',
    'the',
    'as',
    'at',
    'by',
    'for',
    'in',
    'of',
    'off',
    'on',
    'per',
    'to',
    'up',
    'via',
  ];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exeptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(toTitleCase('this is a nice title.'));
console.log(toTitleCase('this is a LONG title, but not too long.'));
console.log(toTitleCase('and here is another title with an EXAMPLE.'));

///////////////////////////////////////////////////////
/** ///// 14) Coding Challenge #2
Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the 
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% 
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate 
  the recommended food portion and add it to the object as a new property. Do 
  not create a new array, simply loop over the array. Forumla: 
  recFood = weight ** 0.75 * 28. (The result is in grams of 
  food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too 
  little. Hint: Some dogs have multiple owners, so you first need to find Sarah in 
  the owners array, and so this one is a bit tricky (on purpose)
3. Create an array containing all owners of dogs who eat too much 
  ('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
  ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and 
  Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat 
  too little!"
5. Log to the console whether there is any dog eating exactly the amount of food 
  that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food 
  (just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try 
  to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food 
  portion in an ascending order (keep in mind that the portions are inside the 
  array's objects
*/

// Test Data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(
  curDog => (curDog.recFood = Math.round(curDog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2.
const dogSarah = dogs.find(curDog => curDog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3.
const [ownersEatTooMuch, ownersEatTooLittle] = dogs.reduce((array, curDog) => {
  const index = curDog.curFood > curDog.recFood ? 0 : 1;
  array[index] = array[index].concat(curDog.owners);

  return array;
}, new Array([], []));
console.log(ownersEatTooLittle, ownersEatTooMuch);

// 4.
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

// 5.
console.log(
  dogs.some(
    curDog =>
      curDog.recFood === curDog.curFood && curDog.curFood === curDog.recFood
  )
);

// 6.
const checkEatingOk = curDog =>
  curDog.recFood * 0.9 < curDog.curFood &&
  curDog.curFood < curDog.recFood * 1.1;
console.log(dogs.some(checkEatingOk)); // callback

// 7.
console.log(dogs.filter(checkEatingOk)); // callback

// 8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
