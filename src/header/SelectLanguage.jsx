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
import { useState } from 'react';

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

import { useTranslationContext } from '../provider/TranslationProvider.jsx';

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