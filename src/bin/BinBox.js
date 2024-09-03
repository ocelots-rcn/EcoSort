import React from 'react';

import Box from '@mui/material/Box';

import Bin from './Bin';
import ButtonBar from '../header/ButtonBar';
import { useDataContext } from '../provider/DataProvider';

const BinBox = () => {
  const { bins } = useDataContext(); // Use context to get bins, cards, and setBins

  return <Box sx={{padding: 1, flex: 1,}}>
    <ButtonBar />
    <Box sx={{
      padding: 2,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'center',
      alignContent: 'baseline',
      minHeight: '90vh',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      {bins.map(bin => (
        <Bin key={bin.id} id={bin.id} />
      ))}
    </Box>
  </Box>
};

export default BinBox;