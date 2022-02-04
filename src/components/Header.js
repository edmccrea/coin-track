import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from 'react-router-dom';
import { CoinsState } from '../CoinContext';

const style = {
  display: { xs: 'none', md: 'inline-block' },
  mr: 6,
};

const Header = ({ light, setLight, globalStats }) => {
  const { currency, setCurrency } = CoinsState();

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          backgroundColor: 'inherit',
          color: 'inherit',
          boxShadow: 'none',
          borderBottom: `1px solid ${light ? '#001E3C26' : '#FFFFFF26'}`,
          backgroundImage: 'none',
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, fontFamily: 'Poppins', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Coin Track
          </Typography>
          <Typography sx={{ ...style }} variant='body2'>
            Coins: {globalStats.active_cryptocurrencies}
          </Typography>
          <Typography sx={{ ...style }} variant='body2'>
            Dominance:{' '}
          </Typography>

          <FormControl variant='standard' sx={{ m: 1, minWidth: 80 }}>
            <Select
              value={currency}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'SEK'}>SEK</MenuItem>
              <MenuItem value={'GBP'}>GBP</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </FormControl>
          <Button
            color='inherit'
            variant='outlined'
            onClick={() => setLight((prev) => !prev)}
          >
            {light ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
