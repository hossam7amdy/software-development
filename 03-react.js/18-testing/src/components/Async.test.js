import { screen, render } from "@testing-library/react";
import Async from "./Async";

describe("Async components", () => {
  test("render posts if request succeeds", async () => {
    // Arrange
    render(<Async />);

    // Action
    // ... nothing

    // Assertion
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
