import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Bin from './Bin';
import { useDataContext } from './DataProvider'; // Adjust the path as necessary

const BinBox = ({ createNewBin }) => {
  const { bins, setBins, cards, setCards } = useDataContext(); // Use context to get bins, cards, and setBins

  // Handle creating a new bin
  const handleNewBin = () => {
    const newBinId = bins.length + 1;
    setBins(prevBins => [...prevBins, { id: newBinId, contents: [] }]); // Initialize contents
  };
  

  useEffect(() => {
    if (createNewBin) {
      handleNewBin();
    }
  }, [createNewBin]);

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