import React, { useState } from 'react';
import Die from './Die';
import Scoreboard from './Scoreboard';

const GameInstance = (props) => {
  const [currentDice, changeCurrentDice] = useState([
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
    { value: 1, color: 'black', held: false },
  ]);

  const [rollCount, decreaseRollCount] = useState(3);

  // const [roundScores, changeRoundScores] = useState({
  //   aces: 0,
  //   deuces: 0,
  //   treys: 0,
  //   fours: 0,
  //   fives: 0,
  //   sixes: 0,
  //   two_pair_same_color: 0,
  //   three_of_a_kind: 0,
  //   straight: 0,
  //   flush: 0,
  //   full_house: 0,
  //   full_house_same_color: 0,
  //   four_of_a_kind: 0,
  //   yarbourough: 0,
  //   kismet: 0,
  // });

  const [roundScores, changeRoundScores] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
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
      decreaseRollCount(rollCount - 1);
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
        currentDice={currentDice}
        roundScores={roundScores}
        changeRoundScores={changeRoundScores}
      />
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
