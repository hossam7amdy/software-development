# Container/Presentational Pattern

**Presentational Components** focus on displaying data without modifying it, handling how data is shown, including styles.

**Container Components** manage what data is shown, passing it to presentational components, usually without containing styles.

**Hooks** in React can replace this pattern by adding statefulness directly to components, eliminating the need for a container component.

**Pros** of the pattern include encouraging separation of concerns, ease of reusability, and straightforward testing of presentational components.

**Cons** involve Hooks making it possible to achieve similar results without the pattern, potentially leading to overcomplication in smaller applications.

Ultimately, while the pattern promotes a clear separation of concerns, Hooks offer a simpler alternative without the need for a separate container component.

## References

- [Container/Presentational Pattern](https://www.patterns.dev/react/presentational-container-pattern)
- [Presentational and Container Components - Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
