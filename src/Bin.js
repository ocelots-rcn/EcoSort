import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Bin = ({ id, cards, setCards }) => {
  const binCards = cards.filter(card => card.location === `bin${id}`);

  const handleDrop = (card) => {
    setCards(prevCards => 
      prevCards.map(c =>
        c.id === card.id ? { ...c, location: `bin${id}` } : c
      )
    );
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
          maxHeight: binCards.length > 2 ? 'calc(100% - 40px)' : 'auto',
          overflowY: binCards.length > 2 ? 'auto' : 'hidden',
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