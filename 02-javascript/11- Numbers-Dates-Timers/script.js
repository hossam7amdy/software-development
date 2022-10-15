'use strict';

////////////////////////////////////////////////
/** ///// 1) Converting and Checking Numbers
 *
 */

// 1- Conversion
console.log(+'23');
console.log(Number('23'));
console.log(+'30px'); // NaN

// 2- Parsing
console.log(Number.parseInt('18px', 10));
console.log(Number.parseInt('e30', 10)); // error

console.log(Number.parseFloat('2.8rem'));
console.log(Number.parseFloat('   2.8rem   '));

// Check if value is a number (best way)
console.log(Number.isFinite(10));
console.log(Number.isFinite(102));
console.log(Number.isFinite('10'));

////////////////////////////////////////////////
/** ///// 2) Math and Rounding
 *
 */

// 1- sqrt
console.log(Math.sqrt(16)); // 4
console.log(16 ** (1 / 2)); // 4
console.log(8 ** (1 / 3)); // 2

// 2- max & min
console.log(Math.max(1, 4, 9, 2, 10)); // 10
console.log(Math.max(...[9, 3, 7, 11])); // 11

console.log(Math.min(1, 4, 9, 2, 10)); // 1
console.log(Math.min(...[9, 3, 7, 11])); // 3

// 3- PI
console.log(Math.PI);

// 4- random: between min...max
// 5- Rounding Integers => round - ceil - floor
const randomInt = (mn, mx) => Math.floor(Math.random() * (mx - mn) + 1) + mn;
console.log(randomInt(6, 10));

// 6- Rounding decimals => toFixed
console.log((1 / 3).toFixed(2));

////////////////////////////////////////////////
/** ///// 3) Remainder Operator
 *
 */
// How many odd numbers
const oddsCount = function (n) {
  let res = 0;
  for (let i = 1; i <= n; ++i) res += i % 2 !== 0;
  return res;
};
console.log(oddsCount(10));

////////////////////////////////////////////////
/** ///// 4) Numeric Separators
 *
 */
const price = 109_99;
console.log(price); // 10999

const PI = 3.14_13;
console.log(PI); // 3.1413

const fee1 = 15_00;
const fee2 = 150_0;
console.log(fee1, fee2); // 1500 1500

////////////////////////////////////////////////
/** ///// 5) Working with BigInt
 *
 */

console.log(2 ** 52 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// BigInt notation
console.log(832594379719327585730129859234751039n);

// Operations
console.log(7324873289n ** 2n);
console.log(8735783218952n * 481327483217n);
// console.log(843271327732891n / 3); // error
console.log(843271327732891n / 3n); // works

////////////////////////////////////////////////
/** ///// 6) Dates
 *
 */

// Create Dates: 4 ways
// 1.
const now = new Date();
console.log(now);

// 2.
// not reliable if not parsed by JS
console.log(new Date('Agu 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

// works fine as by JS
console.log(new Date(account1.movementsDates[0]));

// 3.
console.log(new Date(2022, 12, 13, 14, 15, 16)); // Zero based
console.log(new Date(2037, 2, 31)); // will be fixed

// 4.
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
console.log(3 * 24 * 60 * 60 * 1000); // timestamp

// Working with dates
const future = new Date(2030, 0, 1, 12, 30);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // zero based
console.log(future.getDate()); // day of the month
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString()); // JS format
console.log(future.getTime()); // 1893493800000 from now (timestamp)

console.log(new Date(1893493800000)); // same as above
console.log(Date.now()); // 1657186054098 (timestamp)

future.setFullYear(2022);
console.log(future);

////////////////////////////////////////////////
/** ///// 7) Operations with Dates
 *
 */

// Calculate How many dayes Passed
const calcDaysPassed = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

const days = calcDaysPassed(new Date(1995, 1, 1), new Date(2022, 7, 7));
console.log(days);

////////////////////////////////////////////////
/** ///// 8) Internationalizing Dates (INTL)
 *
 */

// INTL API
// const now = new Date();
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const curDateTime = new Intl.DateTimeFormat('en-US', options).format(now);
console.log(curDateTime);

////////////////////////////////////////////////
/** ///// 9) Internationalizing Numbers (INTL)
 *
 */
const num = 18793200.123;

const currencyOptions = {
  style: 'currency',
  currency: 'USD',
};

console.log('US', new Intl.NumberFormat('en-US', options).format(num));
console.log('DE', new Intl.NumberFormat('de-DE').format(num));
console.log('JP', new Intl.NumberFormat('ja-JP').format(num));

////////////////////////////////////////////////
/** ///// 10) Timers: setTimeout and setInterval
 *
 */
// setTimeout
const ingredient = ['Cheese', 'Spanich', 'Falafel'];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) => {
    console.log(`time to eat pizza with ${ing1}, ${ing2}, and ${ing3} 🍕.`);
  },
  3000,
  ...ingredient
);

console.log('Waiting...');
if (ingredient.includes('spanich')) clearTimeout(pizzaTimer);

// setInterval
setInterval(() => {
  const now = new Date();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  const second = `${now.getSeconds()}`.padStart(2, 0);
  console.log(`${hour}:${minute}:${second}`);
}, 1000);
