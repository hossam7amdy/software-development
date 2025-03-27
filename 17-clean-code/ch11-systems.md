# Chapter 11: Systems Separation, Abstraction, and Agility

Emphasizes that **systems should be built with a clear separation of concerns and appropriate levels of abstraction, similar to how a city functions**. The chapter argues that **construction (startup) is a distinct process from the use (runtime) of a system and these should be separated**.

Here are the key points discussed in the chapter:

- **Separating Construction from Use**: The startup process, where objects are created and dependencies are wired, should be modularized separately from the runtime logic.
- **Separation of Main**: One way to achieve this separation is to handle all construction in the `main` function or modules called by `main`, and the rest of the system assumes that all objects are properly constructed and wired.
- **Factories**: When the application needs to control object creation (e.g., `LineItem` in an order processing system), the **ABSTRACT FACTORY pattern** can be used to keep the construction details separate from the application code.
- **Dependency Injection (DI)**: DI, applying Inversion of Control (IoC) to dependency management, is a powerful mechanism for separating construction from use. Objects should not instantiate their dependencies but should have them injected through setter methods or constructor arguments, often managed by a container (like Spring Framework).
- **Scaling Up**: System architectures can grow incrementally if a proper separation of concerns is maintained. Early EJB architectures (EJB1 and EJB2) are presented as counterexamples due to their tight coupling with the container, hindering organic growth and testability.
- **Cross-Cutting Concerns**: Concerns like persistence, security, and transactions tend to cut across object boundaries. Aspect-Oriented Programming (AOP) is a general approach to restore modularity for these concerns.
- **Test Driving the System Architecture**: By using POJOs and minimally invasive aspect-like tools, it becomes possible to test drive the architecture and evolve it incrementally, avoiding Big Design Up Front (BDUF).
- **Optimize Decision Making**: Modularity and separation of concerns allow for decentralized decision making and the postponement of decisions until the last possible moment, based on the most recent knowledge.
- **Use Standards Wisely**: While standards can aid reuse and interoperability, teams should avoid blindly adopting hyped standards and focus on delivering value to customers.
- **Systems Need Domain-Specific Languages (DSLs)**: DSLs can minimize the communication gap between domain concepts and the code that implements them, raising the level of abstraction and allowing all levels of the application to be expressed as POJOs.

In conclusion, the chapter advocates for **an optimal system architecture consisting of modularized domains of concern implemented with POJOs, integrated with minimally invasive aspects or aspect-like tools, enabling test-driven development and agility**. It emphasizes using the simplest thing that can possibly work and maintaining clear intent at all levels of abstraction.
