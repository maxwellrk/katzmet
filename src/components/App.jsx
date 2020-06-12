import React, { useState, useEffect } from 'react';
import GameInstance from './GameInstance';
import socketInstance from '../socket';

const App = () => {
  const [instance1Status, resetInstance1] = useState(true);

  useEffect(() => {
    socketInstance.on('reset', () => {
      resetInstance1(!instance1Status);
    });

    return () => {
      socketInstance.off('reset');
    };
  }, [instance1Status]);

  return (
    <div>
      <GameInstance
        key={instance1Status ? 'instance_true_1' : 'instance_false_1'}
        instance={instance1Status}
        reset={resetInstance1}
      />
    </div>
  );
};

export default App;
