import React, { useState } from 'react';

const SingleScore = ({
  title,
  calculateScore,
  roundScore,
  changeRollCount,
}) => {
  const [enabled, disable] = useState(true);
  return (
    <div>
      <p style={{ display: 'inline' }}>{title}</p>
      <p style={{ display: 'inline' }}>{roundScore}</p>
      {enabled ? (
        <button
          onClick={() => {
            calculateScore();
            changeRollCount(3);
            disable(false);
          }}
        >
          button
        </button>
      ) : (
        <button>Complete</button>
      )}
    </div>
  );
};

export default SingleScore;
