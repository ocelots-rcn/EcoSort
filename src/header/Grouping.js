import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Settings from '@mui/icons-material/Settings';

import { useTranslationContext } from '../provider/TranslationProvider';
import { useDataContext } from '../provider/DataProvider';

const Grouping = () => {
  const [open, setOpen] = useState(false);
  const { translation, translateBlock } = useTranslationContext();
  const { currentGrouping, groupings, setCurrentGrouping } = useDataContext();

  return <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Box sx={{alignContent: 'center', color: 'rgba(0, 0, 0, 0.54)', marginBottom: '2px'}}>{translation.groupBy}</Box>
    <Tooltip title={translation.selectGrouping}>
      <Button onClick={() => setOpen(true)} endIcon={<Settings />}>
       {groupings[currentGrouping] && translateBlock(groupings[currentGrouping].label)}
      </Button>
    </Tooltip>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{translation.selectGrouping}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(groupings).map(group => 
          <ListItem disableGutters key={group}>
          <ListItemButton onClick={() => {setCurrentGrouping(group); setOpen(false);}}>
            <ListItemText primary={translateBlock(groupings[group].label)} />
          </ListItemButton>
        </ListItem>
        )}
      </List>
    </Dialog>
  </Box>
};

export default Grouping;