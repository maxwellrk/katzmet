import React from 'react';

const Die = ({ value, color, held, holdDie, position, rollCount }) => {
  return (
    <div>
      <button
        onClick={() => {
          if (rollCount !== 3) holdDie(position);
        }}
      >
        {held ? 'RETURN' : 'HOLD'}
      </button>
      <p style={{ color, display: 'inline' }}>DIE: {value}</p>
    </div>
  );
};

export default Die;
