import React from 'react';
import SingleScore from './SingleScore';

const Scoreboard = ({
  changeCurrentDice,
  currentDice,
  roundScores,
  changeRoundScores,
  changeRollCount,
  rollCount,
  round,
  changeRound,
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
        return shallow;
      },
    ],
    [
      'Deuces',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 2) sum += 2;
        });
        let shallow = [...roundScores];
        shallow[1] = sum;
        return shallow;
      },
    ],
    [
      'Treys',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 3) sum += 3;
        });
        let shallow = [...roundScores];
        shallow[2] = sum;
        return shallow;
      },
    ],
    [
      'Fours',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 4) sum += 4;
        });
        let shallow = [...roundScores];
        shallow[3] = sum;
        return shallow;
      },
    ],
    [
      'Fives',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 5) sum += 5;
        });
        let shallow = [...roundScores];
        shallow[4] = sum;
        return shallow;
      },
    ],
    [
      'Sixes',
      () => {
        let sum = 0;
        currentDice.forEach((die) => {
          if (die.value === 6) sum += 6;
        });
        let shallow = [...roundScores];
        shallow[5] = sum;
        return shallow;
      },
    ],
    [
      '2 Pair Same Color',
      () => {
        let sum = 0;
        let occurances = {};
        currentDice.forEach((die) => {
          occurances[die.color] === undefined
            ? (occurances[die.color] = 1)
            : occurances[die.color]++;
          occurances.total === undefined
            ? (occurances.total = die.value)
            : (occurances.total += die.value);
        });
        Object.keys(occurances).forEach((key) => {
          if (occurances[key] >= 4 && key !== 'total') {
            sum = occurances.total;
          }
        });
        let shallow = [...roundScores];
        shallow[6] = sum;
        return shallow;
      },
    ],
    [
      '3 of a Kind',
      () => {
        let sum = 0;
        let occurances = {};
        currentDice.forEach((die) => {
          occurances[die.value] === undefined
            ? (occurances[die.value] = 1)
            : occurances[die.value]++;
          occurances.total === undefined
            ? (occurances.total = die.value)
            : (occurances.total += die.value);
        });
        Object.keys(occurances).forEach((key) => {
          if (occurances[key] >= 3 && key !== 'total') {
            sum = occurances.total;
          }
        });
        let shallow = [...roundScores];
        shallow[7] = sum;
        return shallow;
      },
    ],
    [
      'Straight',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        let unique = [...new Set(currentDice.map((die) => die.value))];
        if (unique.length === 5) sum += 30;
        shallow[8] = sum;
        return shallow;
      },
    ],
    [
      'Flush',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        let unique = [...new Set(currentDice.map((die) => die.color))];
        if (unique.length === 1) sum += 35;
        shallow[9] = sum;
        return shallow;
      },
    ],
    [
      'Full House',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        let threeTwoSplit = true;
        let occurances = {};
        let unique = [...new Set(currentDice.map((die) => die.value))];

        currentDice.forEach((die) => {
          occurances[die.value] === undefined
            ? (occurances[die.value] = 1)
            : occurances[die.value]++;
          if (occurances[die.value] > 3) threeTwoSplit = false;
        });

        if (unique.length === 2 && threeTwoSplit) {
          currentDice.forEach((die) => {
            sum += die.value;
          });
          sum += 15;
        }
        shallow[10] = sum;
        return shallow;
      },
    ],
    [
      'Full House Same Color',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        let threeTwoSplit = true;
        let occurances = {};
        let unique = [...new Set(currentDice.map((die) => die.value))];
        let uniqueColors = [...new Set(currentDice.map((die) => die.color))];

        currentDice.forEach((die) => {
          occurances[die.value] === undefined
            ? (occurances[die.value] = 1)
            : occurances[die.value]++;
          if (occurances[die.value] > 3) threeTwoSplit = false;
        });

        if (unique.length === 2 && threeTwoSplit && uniqueColors.length === 1) {
          currentDice.forEach((die) => {
            sum += die.value;
          });
          sum += 15;
        }
        shallow[11] = sum;
        return shallow;
      },
    ],
    [
      '4 of a Kind',
      () => {
        let sum = 0;
        let occurances = {};
        currentDice.forEach((die) => {
          occurances[die.value] === undefined
            ? (occurances[die.value] = 1)
            : occurances[die.value]++;
          occurances.total === undefined
            ? (occurances.total = die.value)
            : (occurances.total += die.value);
        });
        Object.keys(occurances).forEach((key) => {
          if (occurances[key] >= 4 && key !== 'total') {
            sum = occurances.total;
          }
        });
        if (sum > 0) sum += 25;
        let shallow = [...roundScores];
        shallow[12] = sum;
        return shallow;
      },
    ],
    [
      'Yarbourough',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        currentDice.forEach((die) => {
          sum += die.value;
        });
        shallow[13] = sum;
        return shallow;
      },
    ],
    [
      'Kismet',
      () => {
        let sum = 0;
        let shallow = [...roundScores];
        let unique = [...new Set(currentDice.map((die) => die.value))];

        if (unique.length === 1) {
          currentDice.forEach((die) => {
            sum += die.value;
          });
          sum += 50;
        }
        shallow[14] = sum;
        return shallow;
      },
    ],
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '50vh',
        flexWrap: 'wrap',
        width: '50vw',
      }}
    >
      {scoringList.map((ele, index) => {
        return (
          <SingleScore
            changeRoundScores={changeRoundScores}
            title={ele[0]}
            changeCurrentDice={changeCurrentDice}
            calculateScore={ele[1]}
            roundScore={roundScores[index]}
            totalScore={roundScores}
            changeRollCount={changeRollCount}
            rollCount={rollCount}
            round={round}
            changeRound={changeRound}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Scoreboard;
