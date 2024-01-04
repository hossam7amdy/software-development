# Overview of React.js

React helps build complex and tricky interfaces by organizing your interface into three key concepts— components, props, and state.

Because React is composition-focused, it can, perfectly map to the elements of your design system. So, in essence, designing for React actually rewards you for thinking in a modular way. It allows you to design individual components before putting together a page or view, so you fully understand each component’s scope and purpose—a process referred to as componentization.

### 1. JSX

JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to React.createElement() calls which return plain JavaScript objects called “React elements”. JSX is optional and not required to use React. But it is recommended to use JSX because it is a concise and familiar syntax for defining tree structures with attributes.

## 2. Components

Components are the building blocks of React. They are the individual pieces of your interface that are composed together to create a view. Components can be as simple as a button or as complex as a form. They can be reused throughout your application and even shared with other developers.

## 3. Props

Props are a short form for properties, and they simply refer to the internal data of a component in React. They are written inside component calls and are passed into components. They also use the same syntax as HTML attributes, e.g.\_ prop=“value”. Two things that are worth remembering about props; Firstly, we determine the value of a prop and use it as part of the blueprint before the component is built. Secondly, the value of a prop will never change, i.e. props are read-only once they are passed into components.

## 4. State

State is an object that holds some information that may change over the lifetime of the component. Meaning it is just the current snapshot of data stored in a component’s Props. The data can change over time, so techniques to manage the way that data changes become necessary to ensure the component looks the way engineers want it to, at just the right time — this is called State management.

## 5. Lifecycle

Every react component goes through three stages; mounting, rendering, and dismounting. The series of events that occur during these three stages can be referred to as the component’s lifecycle.

When the component is created or removed:

`componentDidMount()` runs after the component output has been rendered to the DOM.
`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed
When the props or states get updated:

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received.
`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

## References

[Overview of React.js](https://www.patterns.dev/react)
