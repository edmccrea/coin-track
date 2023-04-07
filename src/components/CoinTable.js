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
  Pagination,
  Box,
} from '@mui/material';
import { currencyFormat, colorCheck } from '../assets/utils';
import { useMediaQuery } from '@mui/material';

const CoinTable = ({ light, globalStats }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputData, setInputData] = useState('');
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol } = CoinsState();

  const fetchCoins = async (page) => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency, page));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, page]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(inputData.toLowerCase()) ||
        coin.symbol.includes(inputData.toLowerCase())
    );
  };

  const matches = useMediaQuery('(min-width:900px)');

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
                    ? { backgroundColor: '#FFFFFF29' }
                    : { backgroundColor: 'primary' }
                }
              >
                <TableCell>#</TableCell>
                <TableCell align='left'>Coin</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>1h</TableCell>
                <TableCell align='right'>24h</TableCell>
                <TableCell align='right'>7d</TableCell>
                <TableCell align='right'>All Time High</TableCell>
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
                        display: 'inline-block',
                      }}
                    />
                    <Box
                      component='span'
                      onClick={() => navigate(`/coins/${row.id}`)}
                      sx={{
                        display: 'inline-block',
                        width: matches ? '115px' : '50px',
                        fontWeight: 'bold',
                      }}
                      className='coin-name'
                    >
                      {matches ? row.name : row.symbol.toUpperCase()}
                    </Box>
                    <Box
                      component='span'
                      sx={{ paddingLeft: '0.5rem', fontSize: '0.7rem' }}
                    >
                      {matches ? row.symbol.toUpperCase() : ''}
                    </Box>
                  </TableCell>
                  <TableCell align='right'>
                    {currency !== 'SEK' && symbol}
                    {currencyFormat(row.current_price)}
                    {currency === 'SEK' && symbol}
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      color: colorCheck(
                        row.price_change_percentage_1h_in_currency,
                        light
                      ),
                    }}
                  >
                    {Number(row.price_change_percentage_1h_in_currency).toFixed(
                      1
                    )}
                    %
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      color: colorCheck(
                        row.price_change_percentage_24h_in_currency,
                        light
                      ),
                    }}
                  >
                    {Number(row.price_change_percentage_24h).toFixed(1)}%
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{
                      color: colorCheck(
                        row.price_change_percentage_7d_in_currency,
                        light
                      ),
                    }}
                  >
                    {Number(row.price_change_percentage_7d_in_currency).toFixed(
                      1
                    )}
                    %
                  </TableCell>
                  <TableCell align='right'>
                    {currency !== 'SEK' && symbol}
                    {currencyFormat(row.ath)}
                    {currency === 'SEK' && symbol}
                  </TableCell>
                  <TableCell align='right'>
                    {currency !== 'SEK' && symbol}
                    {currencyFormat(row.market_cap)}
                    {currency === 'SEK' && symbol}
                  </TableCell>
                  <TableCell align='center' sx={{ padding: '5px 16px' }}>
                    <img
                      src={`https://www.coingecko.com/coins/${
                        row.image.split('/')[5]
                      }/sparkline.svg`}
                      alt=''
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        }}
        count={parseInt(globalStats.active_cryptocurrencies / 100 - 3)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 100);
        }}
      />
    </div>
  );
};

export default CoinTable;
