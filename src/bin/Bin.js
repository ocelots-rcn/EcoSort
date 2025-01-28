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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CloseIcon from '@mui/icons-material/Close';

import { useDroppable } from '@dnd-kit/core';

import Card from '../card/Card';
import { useDataContext } from '../provider/DataProvider';
import { useTranslationContext } from '../provider/TranslationProvider';
import CardContent from '../card/CardContent';

const Bin = ({ id, activeId }) => {
  const { translation } = useTranslationContext();
  const { bins, cards, deleteBin } = useDataContext();

  const bin = bins.find(bin => bin.id === id);

  const binCards = bin?.contents?.map(cardId => cards[cardId]) || [];

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const handleDeleteBin = () => {
    deleteBin(id);
  };

  return (
    /* Main container */
    <Box
      ref={setNodeRef}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="h2" sx={{ lineHeight: '1', fontWeight: '500', fontSize: '1.25rem', letterSpacing: '0.0075em', }}>{translation['group']} {id}</Typography>
        <Tooltip title={translation.deleteBin}>
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
        </Tooltip>
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
          <Card key={card.id} card={card}>
            <CardContent card={card} activeId={activeId} />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Bin;