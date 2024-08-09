import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Bin from './Bin';
import { useDataContext } from './DataProvider'; // Adjust the path as necessary

const BinBox = ({ createNewBin }) => {
  const { bins, setBins, cards, setCards } = useDataContext(); // Use context to get bins, cards, and setBins

  // Handle creating a new bin
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
    <Box sx={{ height: '80vh', width: '97.5%', border: '1px solid #ccc', padding: '20px', overflowX: 'auto', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {bins.map(bin => (
          <Bin key={bin.id} id={bin.id} />
        ))}
      </Box>
    </Box>
  );
};

export default BinBox;