# Hooks Pattern

## Class components

Before Hooks were introduced in React, we had to use class components in order to add state and lifecycle methods to components. A typical class component in React can look something like:

```jsx
class MyComponent extends React.Component {
  /* Adding state and binding custom methods */
  constructor() {
    super()
    this.state = { ... }

    this.customMethodOne = this.customMethodOne.bind(this)
    this.customMethodTwo = this.customMethodTwo.bind(this)
  }

  /* Lifecycle Methods */
  componentDidMount() { ...}
  componentWillUnmount() { ... }

  /* Custom methods */
  customMethodOne() { ... }
  customMethodTwo() { ... }

  render() { return { ... }}
}
```

## Understanding ES2015 classes

Since class components were the only component that could handle state and lifecycle methods before React Hooks, we often ended up having to refactor functional components into a class components, in order to add the extra functionality.

## Restructuring

The common way to share code among several components, is by using the _Higher Order Component_ or _Render Props pattern_. Although both patterns are valid and a good practice, adding those patterns at a later point in time requires you to restructure your application.

Besides having to restructure your app, which is trickier the bigger your components are, having many wrapping components in order to share code among deeper nested components can lead to something that’s best referred to as a wrapper hell.

## Complexity

As we add more logic to class components, the size of the component increases fast. Logic within that component can get **tangled** and **unstructured**, which can make it difficult for developers to understand where certain logic is used in the class component. This can make debugging and optimizing performance more difficult.

## Hooks

It’s quite clear that class components aren’t always a great feature in React. In order to solve the common issues that React developers can run into when using class components, React introduced React Hooks. React Hooks are functions that you can use to manage a components state and lifecycle methods. React Hooks make it possible to:

add state to a functional component
manage a component’s lifecycle without having to use lifecycle methods such as componentDidMount and componentWillUnmount
reuse the same stateful logic among multiple components throughout the app

## Effect Hook

With the useEffect hook, we can “hook into” a components lifecycle. The useEffect hook effectively combines the componentDidMount, componentDidUpdate, and componentWillUnmount lifecycle methods.

```jsx
componentDidMount() { ... }
useEffect(() => { ... }, [])

componentWillUnmount() { ... }
useEffect(() => { return () => { ... } }, [])

componentDidUpdate() { ... }
useEffect(() => { ... })
```

## Custom Hooks

Besides the built-in hooks that React provides (useState, useEffect, useReducer, useRef, useContext, useMemo, useImperativeHandle, useLayoutEffect, useDebugValue, useCallback), we can easily create our own custom hooks.

You may have noticed that all hooks start with use. It’s important to start your hooks with use in order for React to check if it violates the [rules of Hooks](https://reactjs.org/docs/hooks-rules.html).

## Additional Hooks guidance

Like other components, there are special functions that are used when you want to add Hooks to the code you have written. Here’s a brief overview of some common Hook functions:

### useState

The useState Hook enables developers to update and manipulate state inside function components without needing to convert it to a class component. One advantage of this Hook is that it is simple and does not require as much complexity as other React Hooks.

### useEffect

The useEffect Hook is used to run code during major lifecycle events in a function component. The main body of a function component does not allow mutations, subscriptions, timers, logging, and other side effects. If they are allowed, it could lead to confusing bugs and inconsistencies within the UI. The useEffect hook prevents all of these “side effects” and allows the UI to run smoothly. It is a combination of componentDidMount , componentDidUpdate , and componentWillUnmount, all in one place.

### useContext

The useContext Hook accepts a context object, which is the value returned from React.createcontext, and returns the current context value for that context. The useContext Hook also works with the React Context API in order to share data throughout the app without the need to pass your app props down through various levels.

It should be noted that the argument passed to the useContext hook must be the context object itself and any component calling the useContext always re-renders whenever the context value changes.

### useReducer

The useReducer Hook gives an alternative to setState and is especially preferable to it when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. It takes on a reducer function and an initial state input and returns the current state and a dispatch function as output by means of array destructuring. useReducer also optimizes the performance of components that trigger deep updates.

## Pros

- Fewer lines of code
- Simplifies complex components
- Reusing stateful logic

## Cons

- Have to respect its rules, without a linter plugin, it is difficult to know which rule has been broken.
- Need a considerable time practicing to use properly (Exp: useEffect).
- Be aware of the wrong use (Exp: useCallback, useMemo).

## References

- [Hooks Pattern](https://www.patterns.dev/react/hooks-pattern)
