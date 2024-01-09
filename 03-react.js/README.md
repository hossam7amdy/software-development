# React Docs

## Quick Start

### React Component

- React component names must always start with a capital letter, while HTML tags must be lowercase.

### Rendering lists

- For each item in a list, you should pass a string or a number (key) that uniquely identifies that item among its siblings.

### Sharing data between components

- This is called “lifting state up”. By moving state up, we’ve shared it between components.

## Think in React

### Step 1: Break the UI into a component hierarchy

- Programming—One such technique is the single responsibility principle.
- CSS—consider what you would make class selectors for.
- Design—consider how you would organize the design’s layers.

### Step 2: Build a static version in React

### Step 3: Find the minimal but complete representation of UI state

- **Which of these are state? Identify the ones that are not?**

- Does it remain unchanged over time? If so, it isn’t state.
- Is it passed in from a parent via props? If so, it isn’t state.
- Can you compute it based on existing state or props in your component? If so, it isn’t state.

### Props vs State

**There are two types of “model” data in React: props and state. The two are very different:**

- Props are like arguments you pass to a function. They let a parent component pass data to a child component and customize its appearance. For example, a Form can pass a color prop to a Button.
- State is like a component’s memory. It lets a component keep track of some information and change it in response to interactions. For example, a Button might keep track of isHovered state.

## Notes

**Context API**: is ready to be used for low frequency unlikely updates (lik locale/theme). It's not ready to be used as a replacement for all Flux/redux-like state propagation.
