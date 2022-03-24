import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders title...", () => {
  render(<App />);
  const linkElement = screen.getByText(/Mars Rover/i);
  expect(linkElement).toBeInTheDocument();
});
