import React, { useState, useEffect, useRef } from 'react';
import Die from './Die';
import Scoreboard from './Scoreboard';
import socketInstance from '../socket';

const GameInstance = () => {
  useEffect(() => {
    socketInstance.on('holdDiePosition', (dicePosition) => {
      changeCurrentDice(dicePosition);
    });

    socketInstance.on('shuffleDice', (dice) => {
      changeCurrentDice(dice.newDice);
      changeRollCount(dice.rollCount);
    });

    return () => {
      socketInstance.off('shuffleDice');
      socketInstance.off('holdDiePosition');
    };
  }, []);

  const [currentDice, changeCurrentDice] = useState(
    Array(5).fill({
      value: '?',
      imgPath: '../assets/die_none.jpg',
      color: 'black',
      held: false,
    })
  );

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
        color = 'green';
        imgPath = '../assets/die_4.png';
        break;
      case 5:
        color = 'red';
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
      socketInstance.emit('shuffleDice', {
        newDice: currentDice.map((die) => {
          return die.held ? die : selectRandomDie();
        }),
        rollCount: rollCount - 1,
      });
    }
  };

  const holdDie = (target) => {
    const shallowCopy = [...currentDice];
    shallowCopy[target].held = !shallowCopy[target].held;
    socketInstance.emit('holdDiePosition', shallowCopy);
  };

  return (
    <div>
      <h1>Katzmet</h1>
      <h2>Rolls Remaining: {rollCount}</h2>
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
        {round === 16 && (
          <button
            onClick={() => {
              alert(`Your Final Score: ${roundScores.reduce((a, b) => a + b)}`);
            }}
          >
            Calculate Score
          </button>
        )}
        {round === 16 && (
          <button
            onClick={() => {
              socketInstance.emit('reset');
            }}
          >
            Reset Game
          </button>
        )}
      </div>
      <div id={'rules'} style={{ fontSize: '14px', marginTop: '40px' }}>
        <h2>Rules:</h2>
        <p>Aces: 1 point for each "1"</p>
        <p>Deuces: 2 points for each "2"</p>
        <p>Treys: 3 points for each "3"</p>
        <p>Fours: 4 points for each "4"</p>
        <p>Fives: 5 points for each "5"</p>
        <p>Sixes: 6 points for each "6"</p>
        <p>Two Pair: 2 pairs of the same color scores total of all 5 dice</p>
        <p>ToaK: 3 of any value scores total of all 5 dice</p>
        <p>Straight: 5 numbers in a row scores 30</p>
        <p>Flush: All dice of the same color scores 35</p>
        <p>
          Full House: 3 of one value and 2 of another value scores total of all
          5 dice plus 15
        </p>
        <p>
          FHSC: 3 of one value and 2 of another value all of the same color
          scores total of all 5 dice plus 20
        </p>
        <p>FoaK: 4 of any value scores total of all 5 dice plus 25</p>
        <p>Yarbourough: Total of all 5 dice</p>
        <p>Kismet: 5 of any value scores total of all 5 dice plus 50</p>
      </div>
    </div>
  );
};

export default GameInstance;
