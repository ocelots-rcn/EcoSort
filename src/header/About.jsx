/*
Copyright 2024 Peter Ersts

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
import DialogContent from '@mui/material/DialogContent';

import Info from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslationContext } from '../provider/TranslationProvider.jsx';

const About = () => {
  const [open, setOpen] = useState(false);
  const { translation } = useTranslationContext();

  return <Box>
    <Tooltip title={translation.about.ecoSort}>
      <IconButton onClick={() => setOpen(true)}>
        <Info />
      </IconButton>
    </Tooltip>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{translation.about.ecoSort}
        <Tooltip title={translation.close}>
          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            sx={{
              float: 'right',
              '&:hover': {
                color: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
              },
            }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>{translation.about.p1}</DialogContent>
      <DialogContent>{translation.about.p2}</DialogContent>
    </Dialog>
  </Box>
};

export default About;