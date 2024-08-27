import React from 'react';
import { Box } from '@mui/material';

import Bin from './Bin';
import { useDataContext } from './DataProvider'; // Adjust the path as necessary

const BinBox = () => {
  const { bins } = useDataContext(); // Use context to get bins, cards, and setBins

  return (
      <Box sx={{
        padding: 3,
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        maxHeight: '80vh',
        overflowY: 'auto'}}>
        {bins.map(bin => (
          <Bin key={bin.id} id={bin.id} />
        ))}
      </Box>
  );
};

export default BinBox;