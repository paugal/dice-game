import React, { useState } from "react";
import "./App.css";
import Logo from "./assets/titleLogo.png";
import DiceRoller from "./components/DiceRoller/DiceRoller";
import MotionWrapper from "./components/MotionWrapper/MotionWrapper.jsx";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [numberOfDices, setNumberOfDices] = useState(2);
  const [numberOfRolls, setNumberOfRolls] = useState(2);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameOver = (won, highScore, targetScore) => {
    setGameOver(true);
    setMessage(
      won
        ? `Congratulations! 🥳 You won with a high score of ${highScore} (Target: ${targetScore})`
        : `You lost! 😞 Your final high score was ${highScore} (Target: ${targetScore})`
    );
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setMessage("");
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className="App">
      <MotionWrapper duration={0.8}>
        <img className="App-logo" src={Logo} alt="Roll the dice - Title" />
      </MotionWrapper>

      {!gameStarted && (
        <MotionWrapper delay={0.2} duration={0.5}>
          <div>
            <div className="gameOptionsContainer">
              <div className="gameOption">
                <label htmlFor="dices">Number of dices:</label>
                <select
                  name="dices"
                  id="dices"
                  value={numberOfDices}
                  onChange={(e) => setNumberOfDices(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="gameOption">
                <label htmlFor="rounds">Number of rounds:</label>
                <select
                  name="rounds"
                  id="rounds"
                  value={numberOfRolls}
                  onChange={(e) => setNumberOfRolls(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <button className="mainButton" onClick={startGame}>
              START
            </button>
          </div>
        </MotionWrapper>
      )}

      {gameOver && (
        <MotionWrapper delay={0.7} duration={0.3}>
          <p className="gameOverMessage">{message}</p>
          <button className="mainButton" onClick={resetGame}>
            Play Again
          </button>
        </MotionWrapper>
      )}

      {gameStarted && (
        <MotionWrapper delay={0.1} duration={0.3}>
          <DiceRoller
            numberOfDices={numberOfDices}
            numberOfRolls={numberOfRolls}
            onGameOver={handleGameOver}
            gameOver={gameOver}
          />
        </MotionWrapper>
      )}
    </div>
  );
}

export default App;
