const redux = require("redux");

/*
1- create store
2- create reducer function (pure function - no side effect)
3- create subscribers
4- subscribe & got recent updates
*/

const counterReducer = (state = { counter: 0 }, action = null) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const lastState = store.getState();
  console.log(lastState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
store.dispatch({ type: "decrement" });
