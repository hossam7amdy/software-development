const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'hossam' },
  { value: -45, description: 'Groceries 🥑', user: 'hossam' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'hossam' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'hossam' },
  { value: -1100, description: 'New iPhone 📱', user: 'hossam' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'hossam' },
]);

const limits = Object.freeze({
  hossam: 1500,
  matilda: 100,
});

const getLimit = user => limits?.[user] ?? 0;

// Pure function = no side effects
const addExpense = function (state, value, description, user = 'hossam') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, 200, 'Stuff', 'Jay');

console.log(newBudget3);

// Pure function
const checkExpense = function (state) {
  return state.map(entry =>
    entry.value < -getLimit(entry.user) ? { ...entry, flag: 'limit' } : entry
  );
};
const finalBudget = checkExpense(newBudget3);
console.log(finalBudget);

// Impure function = side effect
const bigExpenses = function (state, bigLimit) {
  const output = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  console.log(output);
};

console.log(budget);
bigExpenses(finalBudget, 500);
