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

  // Image URL is now directly available in card.imageUrl
  const imageUrl = card.imageUrl;

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
        padding: '10px', // Added padding for better spacing
        textAlign: 'center', // Center all text within the Box
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="card image"
          style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '10px' }}
        />
      )}
      <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {card.title || 'No Label'} {/* Title should come from CardData */}
      </Typography>
      {card.features.filter(f => !f.isImage).map((feature, index) => (
        <Typography key={index} variant="body2" sx={{ textAlign: 'center' }}>
          {`${feature.feature}: ${translation[feature.data] || feature.data}`}
        </Typography>
      ))}
    </Box>
  );
};

export default Card;
