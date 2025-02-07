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

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDroppable } from "@dnd-kit/core";

import Card from './Card.jsx';
import { useDataContext } from '../provider/DataProvider.jsx';
import { useTranslationContext } from '../provider/TranslationProvider.jsx';
import CardContent from './CardContent.jsx';

const CardHolder = ({ activeId }) => {
  const { cards, checkGrouping } = useDataContext();
  const { translation } = useTranslationContext();

  const { isOver, setNodeRef } = useDroppable({
    id: 'unsorted',
  });

  const cardArray = Object.values(cards).filter(card => card.location === 'unsorted');
  const isCardHolderEmpty = cardArray.length === 0;
  return (
    <Box
      ref={setNodeRef}
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
        <Card key={card.id} card={card}>
          <CardContent card={card} activeId={activeId}/>
        </Card>
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

