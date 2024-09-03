import React, { useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Info from '@mui/icons-material/Info';

import { useTranslationContext } from '../provider/TranslationProvider';

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
      <DialogTitle>{translation.about.ecoSort}</DialogTitle>
      <DialogContent>{translation.about.p1}</DialogContent>
      <DialogContent>{translation.about.p2}</DialogContent>
    </Dialog>
  </Box>
};

export default About;