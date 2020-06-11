import React, { useState } from 'react';

const SingleScore = ({
  title,
  calculateScore,
  roundScore,
  changeRollCount,
  rollCount,
  changeCurrentDice,
  round,
  changeRound,
  totalScore,
  changeRoundScores,
}) => {
  const [enabled, disable] = useState(true);
  return (
    <div>
      <p>{title}</p>
      <p>{roundScore}</p>
      {enabled ? (
        <button
          onClick={() => {
            if (rollCount !== 3) {
              calculateScore();
              changeRollCount(3);
              disable(false);
              changeCurrentDice(
                Array(5).fill({
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                })
              );
              if (round === 15) {
                // this doesn't work correctly because of async problems
                // also the add score buttons need to reset, might have to move the state into
                // scoreboard
                alert(`Game Over!\nFinal Score: ${totalScore}`);
                changeRoundScores(Array(15).fill('?'));
                changeRound(1);
              } else {
                changeRound(round + 1);
              }
            }
          }}
        >
          Add Score
        </button>
      ) : (
        <button>Complete</button>
      )}
    </div>
  );
};

export default SingleScore;
