import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../card/ItemTypes';

import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Card from '../card/Card';
import { useDataContext } from '../provider/DataProvider';
import { useTranslationContext } from '../provider/TranslationProvider';

const Bin = ({ id }) => {
  const { translation } = useTranslationContext();
  const { bins, cards, moveCard, deleteBin } = useDataContext();

  const bin = bins.find(bin => bin.id === id);

  const binCards = bin?.contents?.map(cardId => cards[cardId]) || [];

  const handleDrop = (card) => {
    const sourceLocation = cards[card.id]?.location;
    if (sourceLocation !== id) {
      moveCard(card.id, id);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      if (!bin.contents.includes(item.card.id)) {  // Check if card is already in the bin
        handleDrop(item.card);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDeleteBin = () => {
    deleteBin(id);
  };

  return (
    /* Main container */
    <Box
      ref={drop}
      sx={{
        minWidth: '262px',
        height: 'fit-content',
        minHeight: '300px',
        maxHeight: '600px',
        backgroundColor: isOver ? 'rgb(0 0 0 / 0.1)' : 'rgb(0 0 0 / 0.2)',
        border: '1px solid rgb(0 0 0 / 0.15)',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/*Header container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>{translation['group']} {id}</Typography>
        <IconButton
          onClick={handleDeleteBin}
          size="small"
          sx={{
            padding: '4px',
            marginLeft: 'auto',
            '&:hover': {
              color: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Card Container */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          overflowY: binCards.length > 1 ? 'auto' : 'hidden',
        }}
      >
        {binCards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Box>
    </Box>
  );
};

export default Bin;