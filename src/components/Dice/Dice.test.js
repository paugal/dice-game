import React from "react";
import { render, screen } from "@testing-library/react";
import Dice from "./Dice";

describe("Dice Component", () => {
  test("renders the correct dice image based on the value prop", () => {
    const values = [1, 2, 3, 4, 5, 6];

    values.forEach((value) => {
      render(<Dice value={value} />);
      const img = screen.getByAltText(`Dice showing ${value}`);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain(`/${value}.svg`);
    });
  });

  test("does not render an image for invalid values", () => {
    const invalidValues = [0, 7, -1];

    invalidValues.forEach((value) => {
      render(<Dice value={value} />);
      const img = screen.queryByAltText(`Dice showing ${value}`);
      expect(img).not.toBeInTheDocument();
    });
  });
});
