import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider'; // Adjust the path as necessary

const Bin = ({ id }) => {
  const { cards, setCards } = useDataContext(); // Use context to get cards and setCards

  // Filter cards to get those in the current bin
  const binCards = cards.filter(card => card.location === `bin${id}`);

  // Handle dropping a card into this bin
  const handleDrop = (card) => {
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, location: `bin${id}` } : c
      )
    );
  };

  // Set up the drop target for drag-and-drop functionality
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
        border: '1px dashed #ccc',
        marginBottom: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>Bin {id}</Typography>
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