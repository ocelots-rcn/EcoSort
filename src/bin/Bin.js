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
        minWidth: '242px',
        height: 'fit-content',
        minHeight: '329px',
        maxHeight: '627px',
        backgroundColor: isOver ? 'rgb(0 0 0 / 0.1)' : 'rgb(0 0 0 / 0.2)',
        border: '1px solid rgb(0 0 0 / 0.15)',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/*Header container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
        <Typography variant="h2" sx={{ lineHeight: '1', fontWeight: '500', fontSize: '1.25rem', letterSpacing: '0.0075em',}}>{translation['group']} {id}</Typography>
        <IconButton
          onClick={handleDeleteBin}
          size="small"
          sx={{
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
          paddingBottom: '4px',
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