import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider';

const Bin = ({ id }) => {
  const { bins, cards, moveCard, deleteBin } = useDataContext(); // Access the deleteBin function

  const bin = bins.find(bin => bin.id === id);

  const binCards = bin?.contents?.map(cardId => cards[cardId]) || [];

  const handleDrop = (card) => {
    const sourceLocation = cards[card.id]?.location;
    if (sourceLocation !== id) { // Move only if the source location is different
      moveCard(card.id, id);
    }
  };

  const handleDeleteBin = () => {
    deleteBin(id); // Call the deleteBin function with the bin id
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => handleDrop(item.card),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        flex: '0 0 calc(40%)',
        height: '260px',
        backgroundColor: isOver ? '#e0e0e0' : 'transparent',
        border: '1px solid #ccc',
        marginBottom: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Header with Grouping ID and X Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <Typography variant="h6">Grouping {id}</Typography>
        <IconButton
          sx={{
            width: '24px',
            height: '24px',
            padding: '0',
            backgroundColor: '#f44336',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
          onClick={handleDeleteBin}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          maxHeight: binCards.length > 1 ? 'calc(100% - 40px)' : 'auto',
          overflowY: binCards.length > 1 ? 'auto' : 'hidden',
        }}
      >
        {binCards.map(card => (
          <Card key={card.id} card={card} sx={{ marginBottom: '10px', flex: '0 0 calc(50% - 5px)' }} />
        ))}
      </Box>
    </Box>
  );
};

export default Bin;