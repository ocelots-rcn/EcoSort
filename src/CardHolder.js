import React from 'react';
import { Box, Button } from '@mui/material';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider';

const CardHolder = () => {
  const { cards, moveCard, checkGrouping} = useDataContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => moveCard(item.card.id, 'original'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const cardArray = Object.values(cards).filter(card => card.location === 'original');
  const isCardHolderEmpty = cardArray.length === 0;

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

      {isCardHolderEmpty && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#8bc34a',
            color: 'white',
          }}
          onClick={() => checkGrouping()}
        >
          Run Grouping Assessment
        </Button>
      )}
    </Box>
  );
};

export default CardHolder;

