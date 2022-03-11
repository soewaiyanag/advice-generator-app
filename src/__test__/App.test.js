import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "../App";

it("initial render", () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
