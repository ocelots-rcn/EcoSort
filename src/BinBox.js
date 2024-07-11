import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Bin from './Bin';

const BinBox = ({ createNewBin, cards, setCards, bins, setBins }) => {
  const handleNewBin = () => {
    const newBinId = bins.length + 1;
    setBins(prevBins => [...prevBins, { id: newBinId }]);
  };

  useEffect(() => {
    if (createNewBin) {
      handleNewBin();
    }
  }, [createNewBin]);

  return (
    <Box sx={{ height: '80vh', width: '100%', border: '1px solid #ccc', padding: '20px', overflowX: 'auto', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {bins.map(bin => (
          <Bin key={bin.id} id={bin.id} cards={cards} setCards={setCards} />
        ))}
      </Box>
    </Box>
  );
};

export default BinBox;