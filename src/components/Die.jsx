import React from 'react';

const Die = ({ value, color, held, holdDie, position }) => {
  return (
    <div>
      <button
        onClick={() => {
          holdDie(position);
        }}
      >
        {held ? 'RETURN' : 'HOLD'}
      </button>
      <p style={{ color, display: 'inline' }}>DIE: {value}</p>
    </div>
  );
};

export default Die;
