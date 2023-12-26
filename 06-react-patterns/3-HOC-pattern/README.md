# HOC Patterns

A Higher Order Component (HOC) is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.

It allows us to reuse component logic throughout our application.

## Composing

We can also compose multiple Higher Order Components. Let’s say that we also want to add functionality that shows a Hovering! text box when the user hovers over the DogImages list.

## Hooks

In some cases, we can replace the HOC pattern with React Hooks.

Generally speaking, React Hooks don’t replace the HOC pattern.

_“In most cases, Hooks will be sufficient and can help reduce nesting in your tree.”_ - [React Docs](https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

As the React docs tell us, using Hooks can reduce the depth of the component tree. Using the HOC pattern, it’s easy to end up with a deeply nested component tree.

```html
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

Using Higher Order Components makes it possible to provide the same logic to many components, while keeping that logic all in one single place. Hooks allow us to add custom behavior from within the component, which could potentially increase the risk of introducing bugs compared to the HOC pattern if multiple components rely on this behavior.

### Best use-cases for a HOC:

The same, _uncustomized_ behavior needs to be used by many components throughout the application.
The component can work standalone, without the added custom logic.

### Best use-cases for Hooks:

The behavior has to be customized for each component that uses it.
The behavior is not spread throughout the application, only one or a few components use the behavior.
The behavior adds many properties to the component

## Pros

- Using the Higher Order Component pattern allows us to keep logic that we want to re-use all in one place.
- Reduces the risk of accidentally spreading bugs throughout the application by duplicating code over and over, potentially introducing new bugs each time.
- By keeping the logic all in one place, we can keep our code DRY and easily enforce separation of concerns.

## Cons

- The name of the prop that a HOC can pass to an element, can cause a _naming collision_.
- With multiple composed HOCs that all pass props to the element that’s wrapped within them, it can be difficult to figure out _which HOC is responsible for which prop_. This can hinder debugging and scaling an application easily.

## References

- [Higher-Order Components - React](https://reactjs.org/docs/higher-order-components.html)
