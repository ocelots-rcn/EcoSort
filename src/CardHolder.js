import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider'; // Import DataContext

const CardHolder = ({ setCards, isOriginalZoneEmpty }) => {
  const { cards, bins, validationErrors } = useDataContext(); // Get data from context
  const [message, setMessage] = useState('');

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
    if (validationErrors.length > 0) {
      setMessage(validationErrors[0]);  // Display the first validation error
    } else {
      setMessage('All bins are correctly grouped.');
    }
  };

  useEffect(() => {
    if (!isOriginalZoneEmpty) {
      setMessage('');
    }
  }, [isOriginalZoneEmpty]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          ref={drop}
          sx={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px dashed #ccc',
            padding: '20px',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {originalZoneCards.map(card => (
              <Card key={card.id} card={card} sx={{ margin: '10px' }} />
            ))}
          </Box>
          {isOriginalZoneEmpty && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                sx={{ marginTop: '20px' }}
              >
                Check if you are right
              </Button>
              {message && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 25,
                    right: 0,
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    textAlign: 'center',
                    borderTop: '1px solid #ccc',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'black' }}>
                    {message}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardHolder;
