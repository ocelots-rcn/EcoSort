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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Settings from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslationContext } from '../provider/TranslationProvider.jsx';
import { useDataContext } from '../provider/DataProvider.jsx';

const Grouping = () => {
  const [open, setOpen] = useState(false);
  const { translation, translateBlock } = useTranslationContext();
  const { currentGrouping, groupings, setCurrentGrouping } = useDataContext();

  return <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Box sx={{padding: '8px 8px 8px 0px', fontSize: '1.5rem', color: 'rgba(0, 0, 0, 0.54)'}}>
      {translation.groupBy} {groupings[currentGrouping] && translateBlock(groupings[currentGrouping].label)}
    </Box>
    <Tooltip title={translation.selectGrouping}>
      <IconButton onClick={() => setOpen(true)}>
        <Settings />
      </IconButton>
    </Tooltip>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{translation.selectGrouping}
        <Tooltip title={translation.close}>
                  <IconButton
                    onClick={() => setOpen(false)}
                    size="small"
                    sx={{
                      marginLeft: '20px',
                      '&:hover': {
                        color: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                      },
                    }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {Object.keys(groupings).map(group => 
          <ListItem key={group}>
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