import React, { useState, useEffect, useRef } from 'react';
import Die from './Die';
import Scoreboard from './Scoreboard';
import socketInstance from '../socket';

const GameInstance = () => {
  const [currentDice, changeCurrentDice] = useState(
    Array(5).fill({
      value: '?',
      imgPath: '../assets/die_none.jpg',
      color: 'black',
      held: false,
    })
  );

  useEffect(() => {
    socketInstance.on('holdDiePosition', (dicePosition) =>
      changeCurrentDice(dicePosition)
    );
  }, []);

  const [round, changeRound] = useState(1);

  const [rollCount, changeRollCount] = useState(3);

  const [roundScores, changeRoundScores] = useState(Array(15).fill('?'));

  const selectRandomDie = () => {
    const value = Math.ceil(Math.random() * 6);
    let color;
    let imgPath;

    switch (value) {
      case 1:
        color = 'black';
        imgPath = '../assets/die_1.png';
        break;
      case 2:
        color = 'red';
        imgPath = '../assets/die_2.png';
        break;
      case 3:
        color = 'green';
        imgPath = '../assets/die_3.png';
        break;
      case 4:
        color = 'red';
        imgPath = '../assets/die_4.png';
        break;
      case 5:
        color = 'green';
        imgPath = '../assets/die_5.png';
        break;
      case 6:
        color = 'black';
        imgPath = '../assets/die_6.png';
        break;
    }

    return { value, color, imgPath, held: false };
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
    socketInstance.emit('holdDiePosition', shallowCopy);
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
        round={round}
        changeRound={changeRound}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {currentDice.map((die, index) => {
          return (
            <Die
              imgPath={die.imgPath}
              rollCount={rollCount}
              held={die.held}
              value={die.value}
              color={die.color}
              key={index}
              position={index}
              holdDie={holdDie}
              socketInstance={socketInstance}
            />
          );
        })}
        <button onClick={() => diceShuffle()}>SHUFFLE DICE</button>
      </div>
    </div>
  );
};

export default GameInstance;
