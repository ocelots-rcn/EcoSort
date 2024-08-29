import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import { Box, Button } from '@mui/material';

import Card from './Card';
import { useDataContext } from '../provider/DataProvider';
import { useTranslationContext } from '../provider/TranslationProvider';

const CardHolder = () => {
  const { cards, moveCard, checkGrouping } = useDataContext();
  const { translation } = useTranslationContext();

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
        minWidth: '262px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgb(0 0 0 / 0.15)',
        padding: '10px',
        overflowY: 'auto',
        position: 'relative',
        backgroundColor: isOver ? 'rgb(0 0 0 / 0.2)' : 'rgb(0 0 0 / 0.2)',
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
          {translation['checkGrouping']}
        </Button>
      )}
    </Box>
  );
};

export default CardHolder;

