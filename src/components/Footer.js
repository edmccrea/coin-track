import { Typography, Box } from '@mui/material';
import React from 'react';

const Footer = ({ light }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'inherit',
        color: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: `1px solid ${light ? '#001E3C26' : '#FFFFFF26'}`,
      }}
    >
      <Typography sx={{ margin: '2rem 0' }}>
        Copyright &copy; Ed McCrea 2022
      </Typography>
    </Box>
  );
};

export default Footer;
