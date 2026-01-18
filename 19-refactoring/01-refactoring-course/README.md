## Course Overview

1. [Foundations](#1-foundations)
2. [Principles](#2-principles)
3. [Code Smells](#3-code-smells)
4. [Techniques](#4-refactoring-techniques)
5. [Building Tests](#5-build-tests)

## 1. Foundations

#### What is Refactoring?

- Small incremental changes to an existing code without changing its _observable behavior_.

##### Anti-Patterns

- The big-bang rewrite
- Fixing bugs
- Improve performance
- Fixing code formatting

#### Why should we refactor?

1. Improves the overall design of the system
2. Make system easy to understand and maintained (Readability, Maintainability)
3. Help catch bugs

#### When should we refactor?

1. Preparatory (make change easy, then make the easy change)
2. Comprehension (make the code easy to understand)
3. Litter-Pickup (scattered and duplicated code)
4. Long-Term Refactoring (it is part of the normal development process)

#### When should we not refactor?

- When _rewrite_ is easier and safer (careful judgement)
- When you don't need to _modify_ the code (legacy and working)

#### Problem with refactoring:

1. Slow down new features (infinite loop of improvements)
2. Code ownership and published interfaces (API, 3rd-Party Library)
3. Compatibility with feature branches
4. Lack of testing (Testing enables refactoring)

#### How (Best Practices)

1. The two hats (new functionality <> refactoring)
2. Parallel change (Expand -> Migrate -> Contract)
3. Automated refactoring (IDE)

## 2. Principles

#### Separation of Concerns

- Reorganize to reduce coupling and enhance testability
- Promote clear interfaces and modular boundaries

##### Common Concerns to Separate:

- Validations
- Business Rules
- Data Access
- Presentations
- Orchestration
- Communication & API
- Configuration
- Error Handling

#### Maintainability and Readability

_Clarity reveals intent_

#### Incremental Changes

- Small, safe, continuous, reversible changes
  - Identify Smell -> Apply Pattern -> Run Tests -> Commit/Revert

#### Safety-Driven

_Refactoring must preserve behavior to be save_

- IDE checks (Compilation)
- Unit & integration tests
- CI pipelines

## 3. Code Smells

- Mysterious Name
- Duplicated Code
- Long Function
- Long Parameter List
- Global Data
- Mutable Data
- Feature Envy
- Primitive Obsession
- Loops
- Message Chains

## 4. Refactoring Techniques

- Extract Method, Extract Variable
- Introduce Parameter Object
- Preserve Whole Object
- Split Phase
- Replace Parameter with Query
- Replace Temp with Query
- Slide Statement
- Replace Nested Conditional with Guard Clauses
- Replace Conditionals with Polymorphism
- Introduce Assertion
- Separate Query from Modifier

## 5. Build Tests

- Why Do We Write Tests?
- Testing Frameworks Capabilities
- Test Behavior, Not Implementation
- Common Test Smells
