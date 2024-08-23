import React, { useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useDataContext } from './DataProvider';
import LanguageContext from './LanguageContext';

const Bin = ({ id }) => {
  const { translation } = useContext(LanguageContext);
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
    <Box
      ref={drop}
      sx={{
        minHeight: '250px',
        maxHeight: '500px',
        minWidth: '220px',
        backgroundColor: isOver ? '#e0e0e0' : 'transparent',
        border: '1px dashed #ccc',
        marginBottom: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          maxHeight: binCards.length > 1 ? 'calc(100% - 40px)' : 'auto',
          overflowY: binCards.length > 1 ? 'auto' : 'hidden',
        }}
      >
        {binCards.map(card => (
          <Card key={card.id} card={card} sx={{ marginBottom: '10px', flex: '0 0 calc(50% - 5px)' }} />
        ))}
      </Box>
    </Box>
  );
};

export default Bin;