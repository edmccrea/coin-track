import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CoinList } from '../config/api';
import { CoinsState } from '../CoinContext';
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
} from '@mui/material';
import { currencyFormat } from '../assets/currencyFormat';

const CoinTable = ({ light }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputData, setInputData] = useState('');

  const navigate = useNavigate();

  const { currency, symbol } = CoinsState();

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    console.log(coins);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(inputData.toLowerCase()) ||
        coin.symbol.includes(inputData.toLowerCase())
    );
  };
  return (
    <div>
      <TextField
        label='Search by Coin Name...'
        variant='standard'
        size='small'
        fullWidth
        sx={{ mb: 3, fontSize: '14px' }}
        onChange={(e) => setInputData(e.target.value)}
        value={inputData}
      />
      <TableContainer>
        {loading ? (
          <LinearProgress />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow
                sx={
                  !light
                    ? { backgroundColor: '#343A4066' }
                    : { backgroundColor: 'primary' }
                }
              >
                <TableCell>#</TableCell>
                <TableCell align='left'>Coin</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>1h</TableCell>
                <TableCell align='right'>24h</TableCell>
                <TableCell align='right'>7d</TableCell>
                <TableCell align='right'>24h Volume</TableCell>
                <TableCell align='right'>Mkt Cap</TableCell>
                <TableCell align='center'>Last 7 Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#FFC0CB80' },
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {row.market_cap_rank}
                  </TableCell>
                  <TableCell align='left'>
                    <img
                      src={row.image}
                      alt=''
                      style={{
                        height: '18px',
                        width: '18px',
                        verticalAlign: 'middle',
                        marginRight: '8px',
                      }}
                    />
                    <span
                      onClick={() => navigate(`/coins/${row.id}`)}
                      style={{
                        display: 'inline-block',
                        width: '115px',
                        fontWeight: 'bold',
                      }}
                    >
                      {row.name}
                    </span>
                    <span style={{ paddingLeft: '0.5rem', fontSize: '0.7rem' }}>
                      {row.symbol.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell align='right'>
                    {symbol}
                    {currencyFormat(row.current_price)}
                  </TableCell>
                  <TableCell align='right'>
                    {row.price_change_percentage_1h_in_currency.toFixed(1)}%
                  </TableCell>
                  <TableCell align='right'>
                    {row.price_change_percentage_24h.toFixed(1)}%
                  </TableCell>
                  <TableCell align='right'>
                    {row.price_change_percentage_7d_in_currency.toFixed(1)}%
                  </TableCell>
                  <TableCell align='right'>{row.volume}</TableCell>
                  <TableCell align='right'>
                    {symbol}
                    {currencyFormat(row.market_cap)}
                  </TableCell>
                  <TableCell align='center'>{row.graph}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default CoinTable;
