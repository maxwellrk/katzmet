import React, { useState } from 'react';

const SingleScore = ({
  title,
  calculateScore,
  roundScore,
  changeRollCount,
  rollCount,
  changeCurrentDice,
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
              changeCurrentDice([
                {
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                },
                {
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                },
                {
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                },
                {
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                },
                {
                  value: '?',
                  imgPath: '../assets/die_none.jpg',
                  color: 'black',
                  held: false,
                },
              ]);
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
