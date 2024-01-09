import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Greeting } from "./Greeting";

// Grouping tests together with test Suites e.g:
describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Action
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World!");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders react is really fun if the button was NOT clicked", () => {
    // Arrange
    render(<Greeting />);

    // Action
    // ... nothing

    // Assert
    const greetingParagraph = screen.getByText("React is really fun");
    expect(greetingParagraph).toBeInTheDocument();
  });

  test("renders changed! if the button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Action
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  });

  test("does not render React is really fun if button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Action
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText("React is really fun");
    expect(outputElement).toBeNull();
  });
});
