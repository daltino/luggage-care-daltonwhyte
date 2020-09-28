import React, { useState } from 'react';

export function App({ initialData }) {
  const [numCards, setNumCards] = useState(4);

  const startGame = (number) => {
    setNumCards(number);
  };

  return (
    <div>
      <h1>{initialData.appName}</h1>

      <br />
      <br />
    </div>
  );
}
