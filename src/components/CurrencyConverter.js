import React, { useState, useEffect } from 'react';
import { CoinsState } from '../CoinContext';

import { Box, TextField, InputAdornment } from '@mui/material';
import { CompareArrows } from '@mui/icons-material';

const CurrencyConverter = ({ coin, light }) => {
  const [coinInput, setCoinInput] = useState('');
  const [currencyInput, setCurrencyInput] = useState('');
  const { currency, symbol } = CoinsState();

  useEffect(() => {
    const coinChange = () => {
      setCurrencyInput(
        coinInput * coin.market_data.current_price[currency.toLowerCase()]
      );
    };
    coinChange();
  }, [coinInput, coin.market_data.current_price, currency]);

  //   useEffect(() => {
  //     const currencyChange = () => {
  //       setCoinInput(
  //         currencyInput * coin.market_data.current_price[currency.toLowerCase()]
  //       );
  //     };
  //     currencyChange();
  //   }, [currencyInput, coin.market_data.current_price, currency]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100px',
          backgroundColor: `${light ? '#00000009' : '#FFFFFF10'}`,
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id='outlined-start-adornment'
          value={coinInput}
          onChange={(e) => {
            setCoinInput(e.target.value);
          }}
          type='number'
          sx={{ m: 1, width: '33%', autocomplete: 'off' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {coin.symbol.toUpperCase()}
              </InputAdornment>
            ),
          }}
        />
        <CompareArrows fontSize='large' sx={{ m: 1 }} />
        <TextField
          id='outlined-start-adornment'
          disabled
          value={currencyInput}
          onChange={(e) => {
            setCurrencyInput(e.target.value);
          }}
          sx={{ m: 1, width: '33%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>{symbol}</InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default CurrencyConverter;
