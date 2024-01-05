# Render Props Pattern

Render props is a pattern that allows us to pass a function as a prop to a component. This function is then called by the component to render its content.

## Example

```jsx
<Title render={() => <h1>I am a render prop!</h1>} />;

const Title = (props) => props.render();
```

## Render props

The name of the prop is `render` but it can be anything. The function passed to the prop is called by the component to render its content.

```jsx
const Title = (props) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);
```

## Children as a function

The name of the prop is `children` but it can be anything. The function passed to the prop is called by the component to render its content.

```jsx
const ParentComponent = (props) => {
  const [value, setValue] = useState("");

  return (
    <div>
      < />
      {props.children(value)}
    </div>
  );
}
```

### Usage

```jsx
<ParentComponent>
  {(value) => (
    <>
      <Child1>{value}</Child1>
      <Child2>{value}</Child2>
    </>
  )}
</ParentComponent>
```

## Hooks

In some cases, we can replace render props with Hooks. For example, the following component uses the `useEffect` hook to fetch data from an API.

```jsx
function RenderProps(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(props.url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [props.url]);

  return <div>{data}</div>;
}
```

## Pros

- **Render Props Ease Sharing**: Render props simplify sharing logic and data among components, enhancing their reusability like HOCs.
- **Avoid Naming Collisions**: Render props prevent naming conflicts by explicitly passing props, unlike HOCs that automatically merge them.
- **Clear Prop Passage**: Render props provide visibility into passed props, ensuring clarity on where specific props originate.
- **Logic-Rendering Separation**: Render props enable separating app logic from rendering components, allowing stateful components to pass data for stateless ones to render.

## Cons

- **Hooks Replace Render Props**: React Hooks have largely replaced the use cases of render props by enhancing reusability and data sharing in components.
- **Limitation of Render Props**: Render props lack lifecycle methods, limiting their usage to components that don't need to modify the data they receive.

## References

- [Render Props Pattern](https://www.patterns.dev/react/render-props-pattern)
- For many cases, they have been replaced by [custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).
