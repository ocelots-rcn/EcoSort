import React from 'react';
import { Box } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider';

const CardHolder = () => {
  const { cards, moveCard } = useDataContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item.card.id, 'original'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const cardArray = Object.values(cards).filter(card => card.location === 'original');

  return (
    <Box
      ref={drop}
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {cardArray.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </Box>
  );
};

export default CardHolder;
