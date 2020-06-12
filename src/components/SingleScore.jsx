import React, { useState, useEffect } from 'react';
import socketInstance from '../socket';

const SingleScore = ({
  title,
  calculateScore,
  roundScore,
  changeRollCount,
  rollCount,
  changeCurrentDice,
  round,
  changeRound,
  changeRoundScores,
  index,
}) => {
  const [enabled, disable] = useState(true);
  useEffect(() => {
    socketInstance.on('saveScore', (scores) => {
      if (scores.index === index) {
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
        changeRound(round + 1);
        changeRoundScores(scores.newScores);
      }
    });

    return () => {
      if (socketInstance.listeners('saveScore').length === 15) {
        socketInstance.off('saveScore');
      }
    };
  }, [round]);

  return (
    <div>
      <p>{title}</p>
      <p>{roundScore}</p>
      {enabled ? (
        <button
          data-number={index}
          onClick={() => {
            if (rollCount !== 3) {
              socketInstance.emit('saveScore', {
                newScores: calculateScore(),
                index,
              });
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
