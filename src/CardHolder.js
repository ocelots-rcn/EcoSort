import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Import item types

const CardHolder = () => {
  const [originalZoneCards, setOriginalZoneCards] = useState([
    { id: 1, color: 'red', features: ['Feature: XXX', 'Feature: YYY'], imageUrl: 'path_to_image1.jpg' },
    { id: 2, color: 'blue', features: ['Feature: XXX', 'Feature: YYY'], imageUrl: 'path_to_image2.jpg' },
  ]);

  const [targetZoneCards, setTargetZoneCards] = useState([]);

  const handleDrop = (card, targetZone) => {
    if (targetZone === 'target') {
      setTargetZoneCards(prevState => {
        if (!prevState.some(c => c.id === card.id)) {
          return [...prevState, card];
        }
        return prevState;
      });
      setOriginalZoneCards(prevState => prevState.filter(c => c.id !== card.id));
    } else if (targetZone === 'original') {
      setOriginalZoneCards(prevState => {
        if (!prevState.some(c => c.id === card.id)) {
          return [...prevState, card];
        }
        return prevState;
      });
      setTargetZoneCards(prevState => prevState.filter(c => c.id !== card.id));
    }
  };

  const [{ isOver: isOverOriginal }, dropOriginal] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => handleDrop(item.card, 'original'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverTarget }, dropTarget] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => handleDrop(item.card, 'target'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Box ref={dropTarget} sx={{
        width: '70%', // Adjust width as needed
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '20px',
        backgroundColor: isOverTarget ? '#e0e0e0' : 'transparent',
        border: '1px dashed #ccc',
        marginRight: '10px',
        minHeight: '80vh', // Ensure enough height for multiple cards
      }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Target Drop Zone
        </Typography>
        {targetZoneCards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Box>
      <Box ref={dropOriginal} sx={{
        width: '30%', // Adjust width as needed
        minHeight: '80vh', // Adjusted height to be consistent
        backgroundColor: isOverOriginal ? '#e0e0e0' : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        padding: '20px',
      }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Original Drop Zone
        </Typography>
        {originalZoneCards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Box>
    </Box>
  );
};

export default CardHolder;
