import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Der Zähler steht bei: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>Erhöhe</button>

      <button onClick={() => setCount(count - 1)}>Verringere</button>
    </div>
  );
}

export default Counter;
