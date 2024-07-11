import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import LanguageContext from './LanguageContext';
import { ItemTypes } from './ItemTypes'; // Import item types

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const { translation } = useContext(LanguageContext);

  return (
    <Box
      ref={drag}
      sx={{
        width: '160px', // Adjusted card width
        height: '200px', // Adjusted card height
        backgroundColor: card.color,
        border: '1px solid black',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
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
          {translation[feature] || feature} {/* Use the translation if available */}
        </Typography>
      ))}
    </Box>
  );
};

export default Card;
