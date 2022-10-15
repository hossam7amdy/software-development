'use strict';

/* ///// 1) Default Parameters:
/**
 * 
 */
const bookings = [];

const createBooking = function (flightNumber, numPassengers = 1, price = 200) {
  // ES5
  // flightNumber ??= '';
  // numPassengers ??= 1;
  // price ??= 0;

  const booking = {
    flightNumber,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('ES100');
createBooking('ES100', undefined, 10);
createBooking('ES100', 100, 10);
/////////////////////////////////////////////////////////////////////////

/* ///// 2) How passing arguments Works: Value vs. Reference
/**
 * 1- In JavaScript parameters only passed by value
 * 2- For Object: it is two pointers to the same Object on Heap
 */
const flight = 'EU125';

const hossam = {
  name: 'Hossam Hamdy',
  passportNum: 901011995,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'US129';
  passenger.name = 'Mr. ' + passenger.name;

  // if (passenger.passportNum === 901011995) alert('Checked In');
  // else alert('Worng Passport Number');
};

checkIn(flight, hossam);

console.log(flight);
console.log(hossam);
/////////////////////////////////////////////////////////////////////////

/* ///// 3) Functions Accepting Callback Functions:
/**
 * Why JS using callback all the time?
 *  - Allow to divide code to small reusable pieces.
 *  - Allow to create Abstraction.
 * 
 */
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str, oneWord) {
  const [first, ...other] = str;
  return `${first.toUpperCase()}${oneWord([...other].join(' '))}`;
};

const Transform = function (arr, upperFirstWord) {
  return upperFirstWord(arr, oneWord);
};

const arr = ['ahmed', 'hossam', 'emad', 'doaa', true];
console.log(Transform(arr, upperFirstWord));
/////////////////////////////////////////////////////////////////////////

/* ///// 4) Functions Returning Functions:
/**
 * 
 */
// Using Traditional Function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greetByHey = greet('Hey');
greetByHey('Ahmed');

// Using Arrow Function
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hello')('Hossam');
/////////////////////////////////////////////////////////////////////////

/* ///// 5) The call and apply Methods:
/**
 * 
 */
const egypt = {
  airline: 'Egypt',
  iataCode: 'EG',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ Passenger: name, flightNumber: flightNum });
  },
};

egypt.book(125, 'Hossam');
console.log(egypt.bookings);

const emirates = {
  airline: 'Emirates',
  iataCode: 'EM',
  bookings: [],
};

const book = egypt.book;

// Call method
book.call(emirates, 159, 'Ahmed');
console.log(emirates.bookings);

// Apply method = accept array as parameter
const passenger = [199, 'Emad'];
book.apply(egypt, passenger);
console.log(egypt.bookings);

// Can use Call with unpacking technique
book.call(emirates, ...passenger);
console.log(emirates.bookings);
/////////////////////////////////////////////////////////////////////////

/* ///// 6) The bind Method:
/**
 * 
 */

// With Event Listener
egypt.planes = 125;

egypt.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

egypt.buyPlane();

document.body
  .querySelector('.buy')
  .addEventListener('click', egypt.buyPlane.bind(egypt));

const addTax = (tax, value) => value + value * tax;
console.log(addTax(0.1, 200));

// Using bind
const addVAT = addTax.bind(null, 0.2);
console.log(addVAT(300));

// Using function return function
const addTax2 = function (tax) {
  return function (value) {
    return value + value * tax;
  };
};
const addVAT2 = addTax2(0.25);
console.log(addVAT2(250));
/////////////////////////////////////////////////////////////////////////

/* ///// 7) Coding Challenge #1:
/**
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an 
array with the number of replies for each option. This data is stored in the starter 
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The 
  method does 2 things:
  1.1. Display a prompt window for the user to input the number of the 
  selected option. The prompt should look like this:
  What is your favourite programming language?
  0: JavaScript
  1: Python
  2: Rust
  3: C++
  (Write option number)
  1.2. Based on the input number, update the 'answers' array property. For 
  example, if the option is 3, increase the value at position 3 of the array by one
    1. Make sure to check if the input is a number and if the number makes 
    sense (e.g. answer 52 wouldn't make sense, right?)
    2. Call this method whenever the user clicks the "Answer poll" button.
    3. Create a method 'displayResults' which displays the poll results. The 
    method takes a string as an input (called 'type'), which can be either 'string'
    or 'array'. If type is 'array', simply display the results array as it is, using 
    console.log(). This should be the default option. If type is 'string', display a 
    string like "Poll results are 13, 2, 4, 1".
    4. Run the 'displayResults' method at the end of each 
    'registerNewAnswer' method call.
    5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test 
    data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll 
    object! So what should the this keyword look like in this situation?

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    const input = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );

    if (0 <= input && input <= 3) {
      this.answers[input]++;
    } else {
      alert('Wrong Input. Try again!!');
    }

    this.displayResults();
    this.displayResults('string');
  },

  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document.body
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
/////////////////////////////////////////////////////////////////////////

/* ///// 8) Immediately Invoked Function Expressions (IIFE):
/**
 * IIFE: functions that called once.
 */

(function () {
  console.log('This function excuted only once. BYE 😊');
})();

(() => console.log('This function ALSO excuted only once. BYE 😊'))();
/////////////////////////////////////////////////////////////////////////

/* ///// 9) Closures:
/**
 * A function has access to the variable environment (VE) of the execution context in which it was created
 * Closure: VE attached to the function, exactly as it was at the time and place the function was created
 * 
 * A closure is the closed-over variable environment of the execution context in which a function was created, 
 *  even after that execution context is gone;
 * A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The 
 *  function keeps a reference to its outer scope, which preserves the scope chain throughout time.
 * A closure makes sure that a function doesn’t loose connection to variables that existed at the function’s birth place.
 * A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were 
 *  present in the environment where the function was created.
 */
// EXAMPLE 1
const parent = function () {
  let counter = 0;

  return function () {
    counter++;
    console.log(counter);
  };
};

const child = parent();
child();
child();
child();

// EXAMPLE 2
let f;
const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 125;

  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
h(); // re-assign f
f();
console.dir(f);

// EXAMPLE 3
const boardPassenger = function (wait, n) {
  const group = n / 3;

  setTimeout(function () {
    console.log(`We are bordering ${n} passengers now`);
    console.log(`There are 3 groups, each with ${group} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
const group = 100; // lower priority
boardPassenger(2, 180);
/////////////////////////////////////////////////////////////////////////

/* ///// 10) Coding Challenge #2
This is more of a thinking challenge than a coding challenge
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that 
changes the color of the selected h1 element ('header') to blue, each time 
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all 
the time you need. Think about when exactly the callback function is executed, 
and what that means for the variables involved in this example.
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
/////////////////////////////////////////////////////////////////////////
