import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const CardHolder = ({ cards, setCards, isOriginalZoneEmpty }) => {
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

  const handleButtonClick = () => {
    console.log("Check if you are right");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box ref={drop} sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px dashed #ccc',
          padding: '20px',
          overflowY: 'auto',
        }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {originalZoneCards.map(card => (
              <Card key={card.id} card={card} sx={{ margin: '10px' }} />
            ))}
          </Box>
          {isOriginalZoneEmpty && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              sx={{ marginTop: '20px' }}
            >
              Check if you are right
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardHolder;