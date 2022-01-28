import React, { createContext, useContext, useState, useEffect } from 'react';

const Coins = createContext();

export const CoinContext = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'SEK') setSymbol('kr');
    else if (currency === 'GBP') setSymbol('£');
    else if (currency === 'EUR') setSymbol('€');
  }, [currency]);
  return (
    <Coins.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Coins.Provider>
  );
};

export const CoinsState = () => {
  return useContext(Coins);
};
