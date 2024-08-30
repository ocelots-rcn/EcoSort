import React from 'react';
import { Box } from '@mui/material';

import Bin from './Bin';
import { useDataContext } from '../provider/DataProvider'; // Adjust the path as necessary

const BinBox = () => {
  const { bins } = useDataContext(); // Use context to get bins, cards, and setBins

  return (
    <Box sx={{
      padding: 3,
      display: 'flex',
      flex: 1,
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'left',
      alignContent: 'baseline',
      maxHeight: '80vh',
      overflowY: 'auto',
      minHeight: '100vh'
    }}>
      {bins.map(bin => (
        <Bin key={bin.id} id={bin.id} />
      ))}
    </Box>
  );
};

export default BinBox;