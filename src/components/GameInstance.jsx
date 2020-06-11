import React, { useState } from 'react';
import Die from './Die';
import Scoreboard from './Scoreboard';

const GameInstance = (props) => {
  const [currentDice, changeCurrentDice] = useState([
    { value: '?', color: 'black', held: false },
    { value: '?', color: 'black', held: false },
    { value: '?', color: 'black', held: false },
    { value: '?', color: 'black', held: false },
    { value: '?', color: 'black', held: false },
  ]);

  const [rollCount, changeRollCount] = useState(3);

  const [roundScores, changeRoundScores] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const selectRandomDie = () => {
    const value = Math.ceil(Math.random() * 6);
    let color;
    if (value === 1 || value === 6) {
      color = 'black';
    } else if (value === 2 || value === 4) {
      color = 'red';
    } else {
      color = 'green';
    }
    return { value, color, held: false };
  };

  const diceShuffle = () => {
    if (rollCount > 0) {
      changeCurrentDice(
        currentDice.map((die) => {
          return die.held ? die : selectRandomDie();
        })
      );
      changeRollCount(rollCount - 1);
    }
  };

  const holdDie = (target) => {
    const shallowCopy = [...currentDice];
    shallowCopy[target].held = !shallowCopy[target].held;
    changeCurrentDice(shallowCopy);
  };

  return (
    <div>
      <h1>Rolls Remaining: {rollCount}</h1>
      <Scoreboard
        rollCount={rollCount}
        currentDice={currentDice}
        changeCurrentDice={changeCurrentDice}
        roundScores={roundScores}
        changeRoundScores={changeRoundScores}
        changeRollCount={changeRollCount}
      />
      <div>
        {currentDice.map((die, index) => {
          return (
            <Die
              rollCount={rollCount}
              held={die.held}
              value={die.value}
              color={die.color}
              key={index}
              position={index}
              holdDie={holdDie}
            />
          );
        })}
        <button onClick={() => diceShuffle()}>SHUFFLE DICE</button>
      </div>
    </div>
  );
};

export default GameInstance;
