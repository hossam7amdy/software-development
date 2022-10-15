// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*//// Developer Tools /////
  1- Install prettier
  2- Onstall TODO Highlight
  3- Install Live Server
*/

/*//// Developer Skills /////
  1- Learn How To Code:
    - SMART Goals
    - Don't copy-paste Code
    - Challenge yourself
    - practice, practice, practice
    - You will never know everything
    - Don't Isolate yourself "share goals with others"
  
  2- Think like a Developer (problem-solver SKILLS):
    - Ask the right questions
    - Divide and conquer
    - Do your research
    - write pseudo-code
  
  3- Learn How to debug:
    - IDENTIFY: "Becoming aware that there is a bug"
    - FIND: "Isolating where exactly the bug is happening in code"
    - FIX: "Correct the bug"
    - PREVENT: "Preventing it from happening again"
*/

/*///// Coding Challenge #1 /////
Given an array of forecasted maximum temperatures, the thermometer displays a 
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a 
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up 
into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]
*/

function printForecast(arr) {
  let result = "...";
  for (let i = 0; i < arr.length; i++) {
    result += ` ${arr[i]}°C in ${i + 1} days ...`;
  }

  console.log(result);
}

const temps1 = [17, 21, 23];
const temps2 = [12, 5, -5, 0, 4];

printForecast(temps1);
printForecast(temps2);
