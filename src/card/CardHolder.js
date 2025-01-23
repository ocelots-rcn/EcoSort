/*
Copyright 2024 Caden Klopfenstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import React from 'react';
import { useDrop } from 'react-dnd';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Card from './Card';
import ItemTypes from './ItemTypes';
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
        maxHeight: '100vh',
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

      {isCardHolderEmpty && Object.keys(cards).length > 0 && (
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

