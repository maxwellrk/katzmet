import React, { useState } from 'react';
import Die from './Die';

const GameInstance = (props) => {
  let [currentDice, changeCurrentDice] = useState([
    { value: 1, color: 'black' },
    { value: 1, color: 'black' },
    { value: 1, color: 'black' },
    { value: 1, color: 'black' },
    { value: 1, color: 'black' },
    { value: 1, color: 'black' },
  ]);

  let [heldDice, changeHeldDice] = useState([]);

  return (
    <div>
      {currentDice.map((die, index) => {
        return <Die value={die.value} color={die.color} key={index} />;
      })}
    </div>
  );
};

export default GameInstance;
