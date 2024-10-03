import App from "./App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("./components/DiceRoller/DiceRoller", () => {
  return function MockDiceRoller({ onGameOver }) {
    return (
      <div data-testid="mock-dice-roller">
        <button onClick={() => onGameOver(true, 10, 8)}>Win Game</button>
        <button onClick={() => onGameOver(false, 6, 8)}>Lose Game</button>
      </div>
    );
  };
});

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByAltText("Roll the dice - Title")).toBeInTheDocument();
  });

  test("displays start screen with game options", () => {
    render(<App />);
    expect(screen.getByText("Number of dices:")).toBeInTheDocument();
    expect(screen.getByText("Number of rounds:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "START" })).toBeInTheDocument();
  });

  test("allows changing game options", () => {
    render(<App />);

    const diceSelect = screen.getByRole("combobox", { name: /dices/i });
    const roundsSelect = screen.getByRole("combobox", { name: /rounds/i });

    fireEvent.change(diceSelect, { target: { value: "3" } });
    fireEvent.change(roundsSelect, { target: { value: "4" } });

    expect(diceSelect.value).toBe("3");
    expect(roundsSelect.value).toBe("4");
  });

  test("starts game when START button is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "START" }));

    expect(screen.queryByText("START")).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-dice-roller")).toBeInTheDocument();
  });

  test("displays win message when game is won", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "START" }));
    fireEvent.click(screen.getByRole("button", { name: "Win Game" }));

    await waitFor(() => {
      expect(screen.getByText(/Congratulations!/)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/You won with a high score of 10 \(Target: 8\)/)
      ).toBeInTheDocument();
    });
  });

  test("displays lose message when game is lost", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "START" }));
    fireEvent.click(screen.getByRole("button", { name: "Lose Game" }));

    await waitFor(() => {
      expect(screen.getByText(/You lost!/)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Your final high score was 6 \(Target: 8\)/)
      ).toBeInTheDocument();
    });
  });

  test("allows playing again after game over", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "START" }));
    fireEvent.click(screen.getByRole("button", { name: "Win Game" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Play Again" })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Play Again" }));

    expect(screen.getByRole("button", { name: "START" })).toBeInTheDocument();
    expect(screen.queryByText(/Congratulations!/)).not.toBeInTheDocument();
  });
});
