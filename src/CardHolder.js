import React from 'react';
import { Box, Grid } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const CardHolder = ({ cards, setCards }) => {
  const handleDrop = (card) => {
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, location: 'original' } : c
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

  const originalZoneCards = cards.filter(card => card.location === 'original');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box ref={drop} sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          border: '1px dashed #ccc',
          padding: '20px',
          overflowY: 'auto',
        }}>
          {originalZoneCards.map(card => (
            <Card key={card.id} card={card} sx={{ margin: '10px' }} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardHolder;