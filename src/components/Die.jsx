import React from 'react';

const Die = ({ value, color, held, holdDie, position, rollCount, imgPath }) => {
  console.log(imgPath);
  return (
    <div>
      <img src={imgPath} style={{ width: '80px', height: '80px' }} />
      <button
        onClick={() => {
          if (rollCount !== 3) holdDie(position);
        }}
      >
        {held ? 'CAST' : 'KEEP'}
      </button>
    </div>
  );
};

export default Die;
