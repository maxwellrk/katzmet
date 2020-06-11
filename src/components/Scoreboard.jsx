import React from 'react';
import SingleScore from './SingleScore';

const Scoreboard = ({
  currentDice,
  roundScores,
  changeRoundScores,
  changeRollCount,
}) => {
  let scoringList = [
    [
      'Aces',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 1) sum += 1;
        });
        let shallow = [...roundScores];
        shallow[0] = sum;
        changeRoundScores(shallow);
      },
    ],
    ['Deuces'],
    ['Treys'],
    ['Fours'],
    ['Fives'],
    ['Sixes'],
    ['2 Pair Same Color'],
    ['3 of a Kind'],
    ['Straight'],
    ['Flush'],
    ['Full House'],
    ['Full House Same Color'],
    ['4 of a Kind'],
    ['Yarbourough'],
    ['Kismet'],
  ];

  return (
    <div>
      {scoringList.map((ele, index) => {
        return (
          <SingleScore
            title={ele[0]}
            calculateScore={ele[1]}
            roundScore={roundScores[index]}
            changeRollCount={changeRollCount}
          />
        );
      })}
    </div>
  );
};

export default Scoreboard;
