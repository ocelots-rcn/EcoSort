import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Import item types

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        width: '160px', // Increased card width
        height: '200px', // Increased card height
        backgroundColor: card.color,
        border: '1px solid black',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: '10px',
      }}
    >
      {card.imageUrl && (
        <img
          src={card.imageUrl}
          alt="card image"
          style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '10px' }}
        />
      )}
      {card.features.map((feature, index) => (
        <Typography key={index} variant="body2">
          {feature}
        </Typography>
      ))}
    </Box>
  );
};

export default Card;
