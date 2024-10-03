import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiceRoller from "./DiceRoller";

jest.mock("../Dice/Dice", () => {
  return function MockDice({ value }) {
    return <div data-testid={`dice-${value}`}>{value}</div>;
  };
});

describe("DiceRoller Component", () => {
  const mockOnGameOver = jest.fn();

  test("does not show Roll Dice button when game is over", () => {
    render(
      <DiceRoller
        numberOfDices={2}
        numberOfRolls={2}
        onGameOver={mockOnGameOver}
        gameOver={true}
      />
    );

    expect(
      screen.queryByRole("button", { name: "Roll Dice" })
    ).not.toBeInTheDocument();
  });

  test("calls onGameOver when all rolls are completed", async () => {
    render(
      <DiceRoller
        numberOfDices={2}
        numberOfRolls={2}
        onGameOver={mockOnGameOver}
        gameOver={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Roll Dice" }));
    fireEvent.click(screen.getByRole("button", { name: "Roll Dice" }));

    await waitFor(() => {
      expect(mockOnGameOver).toHaveBeenCalledWith(
        true,
        expect.any(Number),
        expect.any(Number)
      );
    });
  });

  test("renders correct number of dice based on numberOfDices prop", async () => {
    render(
      <DiceRoller
        numberOfDices={4}
        numberOfRolls={2}
        onGameOver={mockOnGameOver}
        gameOver={false}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Roll Dice" }));
    await waitFor(() => {
      expect(screen.getAllByTestId(/^dice-/)).toHaveLength(4);
    });
  });
});
