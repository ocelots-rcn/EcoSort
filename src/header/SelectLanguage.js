import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Language from '@mui/icons-material/Language';
import { useTranslationContext } from '../provider/TranslationProvider';

const SelectLanguage = () => {
  const [open, setOpen] = useState(false);
  const { translation, setLanguage } = useTranslationContext();
  const languages = translation.language.languages;

  return <Box>
    <Tooltip title={translation.language.select}>
      <IconButton onClick={() => setOpen(true)}>
        <Language />
      </IconButton>
    </Tooltip>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{translation.language.select}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(languages).map(lang => 
          <ListItem disableGutters key={lang}>
          <ListItemButton onClick={() => {setLanguage(lang); setOpen(false);}}>
            <ListItemText primary={languages[lang]} />
          </ListItemButton>
        </ListItem>
        )}
      </List>
    </Dialog>
  </Box>
};

export default SelectLanguage;