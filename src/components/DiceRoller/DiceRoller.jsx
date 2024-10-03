import React, { useState, useEffect } from "react";
import Dice from "../Dice/Dice";
import "./DiceRoller.css";
import MotionWrapper from "../MotionWrapper/MotionWrapper";

function DiceRoller({ numberOfDices, numberOfRolls, onGameOver, gameOver }) {
  const [rollResult, setRollResult] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const [currentRoll, setCurrentRoll] = useState(1);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  useEffect(() => {
    let target = 0;
    for (let i = 0; i < numberOfDices; i++) {
      target += rollDice();
    }
    setTargetScore(target);
  }, [numberOfDices, numberOfRolls]);

  const rollDices = () => {
    const diceRolls = [];
    let totalScore = 0;

    for (let i = 0; i < numberOfDices; i++) {
      const diceValue = rollDice();
      diceRolls.push(diceValue);
      totalScore += diceValue;
    }

    setRollResult([...rollResult, diceRolls]);
    const newHighScore = totalScore > highScore ? totalScore : highScore;
    setHighScore(newHighScore);

    if (currentRoll === numberOfRolls) {
      const won = newHighScore > targetScore;
      onGameOver(won, newHighScore, targetScore);
    } else {
      setCurrentRoll(currentRoll + 1);
    }
  };

  return (
    <div>
      {!gameOver && (
        <div>
          <p>Roll #{currentRoll}</p>
          <button className="simpleButton" onClick={rollDices}>
            Roll Dice
          </button>
        </div>
      )}

      <div className="diceRollerContainer">
        <p style={{ fontSize: "1.4rem", fontWeight: "500" }}>Roll Results:</p>
        <div className="rollResultContainer">
          {rollResult.map((diceArray, rollIndex) => (
            <MotionWrapper key={rollIndex} delay={0.2} duration={0.5}>
              <p>Roll {rollIndex + 1}:</p>
              <div className="diceContainer">
                {diceArray.map((diceValue, diceIndex) => (
                  <Dice key={`${rollIndex}-${diceIndex}`} value={diceValue} />
                ))}
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>

      <div className="scoreData">
        <p>High Score: {highScore}</p>
        <p>Target Score: {targetScore}</p>
      </div>
    </div>
  );
}

export default DiceRoller;
