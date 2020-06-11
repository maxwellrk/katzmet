import React, { useState } from 'react';
import Die from './Die';

const GameInstance = (props) => {
  let [currentDice, changeCurrentDice] = useState([
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
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
    changeCurrentDice(
      currentDice.map((die) => {
        return die.held ? die : selectRandomDie();
      })
    );
  };

  const holdDie = (target) => {
    const shallowCopy = [...currentDice];
    shallowCopy[target].held = !shallowCopy[target].held;
    changeCurrentDice(shallowCopy);
  };

  return (
    <div>
      {currentDice.map((die, index) => {
        return (
          <Die
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
  );
};

export default GameInstance;
