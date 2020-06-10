import React, { useState } from 'react';
import Die from './Die';

const GameInstance = (props) => {
  const [currentDice, changeCurrentDice] = useState([
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
  ]);

  const potentialDice = [
    { value: 1, color: 'black', held: false },
    { value: 2, color: 'red', held: false },
    { value: 3, color: 'green', held: false },
    { value: 4, color: 'green', held: false },
    { value: 5, color: 'red', held: false },
    { value: 6, color: 'black', held: false },
  ];

  const selectRandomDie = () => {
    return potentialDice[Math.floor(Math.random() * potentialDice.length)];
  };

  const diceShuffle = () => {
    changeCurrentDice(
      currentDice.map((die) => {
        return die.held ? die : selectRandomDie();
      })
    );
  };

  return (
    <div>
      {currentDice.map((die, index) => {
        return <Die value={die.value} color={die.color} key={index} />;
      })}
      <button onClick={() => diceShuffle()}>SHUFFLE DICE</button>
    </div>
  );
};

export default GameInstance;
