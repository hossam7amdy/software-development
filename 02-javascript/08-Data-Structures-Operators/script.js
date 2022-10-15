'use strict';

/*//// 01- Destructing Arrays:
/**
 * Destructing Array
 * Switching variables
 * Receive # of return values from a function
 * Nested destructuring
 * Default values
 */

/*//// 02- Destructing Objects:
/**
 * Same as Destructing Array
 * Mutating variables
  let a = 111;
  let b = 999;
  const obj = { a: 23, b: 7, c: 14 };
  ({ a, b } = obj);
 */

/*//// 03- The Spread Operator(...):
/**
 * Copy array
 * Join 2 Arrays
 * Iterables: arrays, strings, maps, sets. NOT objects
 */

/*//// 04- Rest Pattern and Parameters:
/**
 * 1) Destructuring
 * SPREAD, because on RIGHT side of =
 const arr = [1, 2, ...[3, 4]];

 * REST, because on LEFT side of =
 const [a, b, ...others] = [1, 2, 3, 4, 5];

 * 2) Functions
  const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
  };
 */

/*//// 05- Short Circiting (&& and ||):
/**
 * Use ANY data type, return ANY data type, short-circuiting
 * 
 * Logical AND (&&): 
 *  returns the value of the first falsy operand encountered when evaluating from left to right, 
 *  or the value of the last operand if they are all truthy.
 * 
 * Logical OR (||):
 *  returns the value of the first truthy operand encountered when evaluating from left to right,
 *  or the value of the last operand if they are all falsy.
 */

/*//// 06- Nullish operator: (??):
/**
 * The Nullish Coalescing Operator
 * Nullish: null and undefined (NOT 0 or '')
 */

/*//// 07- Logical Assignment Operator:
/**
 * Logical Assignment Operators (=)
 * OR assignment operator (||)
 * nullish assignment operator (null or undefined)
 * AND assignment operator
 */

/*//// 08- Looping Arrays: The for-of Loop:
/**
 * 
 */

/*//// 09- Enhanced Object Literals:
/**
 * 
 */

/*//// 10- Optional Chaining (?.):
/**
 * The (?.) operator is like the (.) chaining operator, 
 * except that instead of causing an error if a reference is nullish (null or undefined), 
 * the expression short-circuits with a return value of undefined. 
 * When used with function calls, 
 * it returns undefined if the given function does not exist.
 */

/*//// 11- Looping Objects: Object Keys, Values, and Entries:
/**
 * 
 */

/*//// 12- Sets:
/**
 * 1- unique values
 * 2- iterable = work with <spread>
 * 3- <new> key word
 * 4- methods = add, has, size, delete, clear
 */

/*//// 13- Maps: Fundamentals:
/**
 * 1- <key,value> pairs
 * 2- <new> key word
 * 3- stores any kind of <key,value> pair types
 * 4- chain of entries
 * 5- methods = set, get, has, delete, size, clear
 */

/*//// 14- Maps: Iteration
/**
 * 1- Create Questions Map
 * 2- Quiz app
 * 3- Convert Map to Array
 */

/*//// 15- Summay: Which Data Structure to Use?:
/**
 * 1) Arrays:
 *    1- Ordered list of values
 *    2- When need to manipulate data
 * 
 * 2) Sets
 *    1- Unique values
 *    2- need high-performance
 *    3- Eliminate duplicates
 * 
 * 3) Objects
 *    1- Easier to read and access
 *    2- When need to include methods
 *    3- When working with JSON
 * 
 * 4) Maps
 *    1- Better performance
 *    2- Keys can be of ANY type
 *    3- Easy to iterate and compute size
 */

/*//// 16- Working With Strings
/**
 * Methods: (return new string)
 *  01- length
 *  02- indexOf()
 *  03- lastIndexOf()
 *  04- slice():
 *    - length of resulting string = (endIndex - startIndex)
 *    - endIndex NOT included in answer
 *  05- toLowerCase()
 *  06- toUpperCase()
 *  07- trim() = remove white spaces
 *  08- replace('','')
 *  09- BOOLEAN Methods:
 *    - include('')
 *    - startsWith('string')
 *    - endsWith('')
 *  10- split('dividor string')
 *  11- join()
 *  13- padStart()
 *  14- padEnd()
 *  15- repeat()
 */
//////////////////////////////////////////////////////////////////////////////////////////////

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

for (const flight of flights.split('+')) {
  const [status, from, to, time] = flight.trim().replace('_', '').split(';');
  const output = `${status.startsWith('Delayed') ? '🛑' : ''} ${status.replace(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`;

  console.log(`${output.padStart(45)}`);
}

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
//////////////////////////////////////////////////////////////////////////////////////////////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* /// Coding Challenge #1 ///
We're building a football betting app!
Suppose we get data from a web service about a certain game ('game' variable on 
next page). In this challenge we're gonna work with that data.
/// YOUR TASK ///
1. Create one player array for each team (variables 'players1' and 'players2')
2. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
  and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. Create a new array ('players1Final') containing all the original team1 players plus
  'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
  names (not an array) and prints each of them to the console, along with the
  number of goals that were scored in total (number of player names passed in)
  TEST DATA: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
  Then, call the function again with players from game.scored
7. The team with the lower odd is more likely to win. Print to the console which
  team is more likely to win, without using an if/else statement or the ternary operator.
*/

// 1.
const [player1, player2] = game.players; // Destructing Arrays
console.log(player1, player2);

// 2.
const [gk, ...fieldPlayers] = player1; // REST
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...player1, ...player2]; // Join 2 Arrays = SPREAD
console.log(allPlayers);

// 4.
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...player1];
console.log(players1Final);

// 5.
const {
  odds: { team1, x: draws, team2 }, // NESTED DESTRUCTING
} = game;
console.log(team1, draws, team2);

// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored); // SPREAD

// 7.
(team1 > team2 && console.log('Team1 is more likely to win.')) ||
  (team2 > team1 && console.log('Team2 is more likely to win.'));
//////////////////////////////////////////////////////////////////////////////////////////////

/*  /// Coding Challenge #2 ///
Let's continue with our football betting app! Keep using the 'game' variable frombefore.
Your TASKs:
1. Loop over the game.scored array and print each player name to the console,
  along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already 
  studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
  Odd of victory Bayern Munich: 1.33
  Odd of draw: 3.25
  Odd of victory Borrussia Dortmund: 6.5
  Get the team names directly from the game object, don't hardcode them 
  (except for "draw"). Hint: Note how the odds and the game objects have the 
  same property names.
4. Bonus: Create an object called 'scorers' which contains the names of the 
  players who scored as properties, and the number of goals as the value. In this 
  game, it will look like this:
  {
  Gnarby: 1,
  Hummels: 1,
  Lewandowski: 2
  }
*/

// 1.
for (const [i, name] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${name}`);

// 2.
let sum = 0;
const odds = Object.values(game.odds);
for (const value of odds) sum += value;
console.log(sum / odds.length);

// 3.
for (const [key, value] of Object.entries(game.odds))
  console.log(`Odd of ${game[key] || 'Draw'}: ${value}`);

// 4.
const scorers = {};
for (const name of game.scored)
  scorers[name] ? scorers[name]++ : (scorers[name] = 1);
console.log(scorers);
//////////////////////////////////////////////////////////////////////////////////////////////

/*  ///// Coding Challenge #3 /////
Let's continue with our football betting app! This time, we have a map called 
'gameEvents' (see below) with a log of the events that happened during the 
game. The values are the events themselves, and the keys are the minutes in which 
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 
  was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on 
  average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking 
  whether it's in the first half or second half (after 45 min) of the game, like this:
  [FIRST HALF] 17: ⚽ GOAL
*/

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, 'Substitution'],
  [47, '⚽ GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, 'Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
const time = Math.max(...gameEvents.keys()); // Get real match duration
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4.
for (const [minute, event] of gameEvents)
  console.log(
    `[${minute <= 45 ? 'FIRST' : 'SECOND'} HALF] ${minute}: ${event}`
  );
//////////////////////////////////////////////////////////////////////////////////////////////

/*  ///// Coding Challenge #4 /////
Write a program that receives a list of variable names written in underscore_case 
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to 
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable 
 calculate_AGE
delayed_departure
*/

// Create textarea
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const flights = text.split('\n');

  for (const [i, item] of flights.entries()) {
    const [first, second] = item.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20)} ${'✅'.repeat(i + 1)}`);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
