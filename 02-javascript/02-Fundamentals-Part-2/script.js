"use strict";

/*  // TEST STRICT MODE //

let canDrive = false;
const hasLicense = true;

if (hasLicense) canDrives = true;

if (canDrive) console.log("Happy Trip!");
*/

/* // CODING CHALLENGE #1 //
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new 
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so 
one average score per team).
A team only wins if it has at least double the average score of the other team. 
Otherwise, no team wins!
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team 
as parameters ('avgDolphins' and 'avgKoalas'), and then logs the winner 
to the console, together with the victory points, according to the rule above. 
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and 
Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
/

const calcAverage = (a, b, c) => (a + b + c) / 3;

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins > avgKoalas * 2) {
    console.log(`Dolphins wins 🏆 ${avgDolphins} vs. ${avgKoalas}`);
  } else if (avgKoalas > avgDolphins * 2) {
    console.log(`Koalas wins 🏆 ${avgKoalas} vs. ${avgDolphins}`);
  } else {
    console.log("No one wins the Trophy...");
  }
}

// TEST 1
let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);
checkWinner(avgDolphins, avgKoalas);

// TEST 2
avgDolphins = calcAverage(85, 54, 41);
avgKoalas = calcAverage(23, 34, 27);
checkWinner(avgDolphins, avgKoalas);
*/

/*  // CODING CHALLENGE #2 //
Steven is still building his tip calculator, using the same rules as before: Tip 15% of 
the bill if the bill value is between 50 and 300, and if the value is different, the tip is 
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns 
the corresponding tip, calculated based on the rules above (you can check out 
the code from first tip calculator challenge if you need to). Use the function 
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data 
below
3. Create an array 'tips' containing the tip value for each bill, calculated from 
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
/

// Arrow function
const calcTip = (value) =>
  50 <= value && value <= 300 ? value * 0.15 : value * 0.2;

const bills = [125, 555, 44];
console.log(bills);

const tips = [];
tips.push(calcTip(bills[0]));
tips.push(calcTip(bills[1]));
tips.push(calcTip(bills[2]));
console.log(tips);

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);
*/

/*  // Objects //
const Hossam = {
  firstName: "Hossam",
  lastName: "Torad",
  birthYear: 1995,
  job: "Software Engineer",
  hasDriverLicense: false,
  friends: ["Ahmed", "Emad", "Doaa"],

  calcAge: function () {
    this.age = 2022 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old ${
      this.job
    }, and he has ${this.hasDriverLicense ? "a" : "no"} driver license.`;
  },
};

console.log(
  `${Hossam.firstName} has ${Hossam.friends.length} friends, and his best friend is ${Hossam.friends[0]}.`
);

console.log(Hossam.getSummary());
*/

/*  // CODING CHALLENGE #3 //
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to 
implement the calculations! Remember: BMI = mass / height ** 2 = mass 
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and 
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same 
method on both objects). Store the BMI value to a property, and also return it 
from the method
3. Log to the console who has the higher BMI, together with the full name and the 
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m 
tall.
/

const Mark = {
  firstName: "Mark",
  lastName: "Miller",
  weight: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = this.weight / (this.height * this.height);
    return this.BMI;
  },
};

const John = {
  firstName: "John",
  lastName: "Smith",
  weight: 92,
  height: 1.95,

  calcBMI: function () {
    this.BMI = this.weight / (this.height * this.height);
    return this.BMI;
  },
};

Mark.calcBMI();
John.calcBMI();

if (Mark.BMI > John.BMI) {
  console.log(
    `${Mark.firstName} ${Mark.lastName}'s BMI (${Mark.BMI}) is higher than ${John.firstName} ${John.lastName}'s BMI (${John.BMI}).`
  );
} else {
  console.log(
    `${John.firstName} ${John.lastName}'s BMI (${John.BMI}) is higher than ${Mark.firstName} ${Mark.lastName}'s BMI (${Mark.BMI}).`
  );
}
*/

/*  // Coding Challenge #4 //
Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate 
tips and total values (bill + tip) for every bill value in the bills array. Use a for
loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
*/

const calcTip = (value) =>
  50 <= value && value <= 300 ? value * 0.15 : value * 0.2;

function calcAverage(arr) {
  let sum = 0,
    len = arr.length;
  for (let i = 0; i < len; i++) sum += arr[i];

  return sum / len;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];

for (let i = 0; i < bills.length; i++) {
  tips[i] = calcTip(bills[i]);
  total[i] = bills[i] + tips[i];
}

console.log(bills, tips, total);
console.log(`Bill Average = ${calcAverage(bills)}
Tips Average = ${calcAverage(tips)},
Total Average = ${calcAverage(total)}`);
