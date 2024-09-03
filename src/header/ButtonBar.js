import React from 'react';

import Box from '@mui/material/Box';

import NewBinButton from './NewBinButton';
import SelectLanguage from './SelectLanguage';
import About from './About';
import Grouping from './Grouping';

const ButtonBar = () => {

  return <Box sx={{
    display: 'flex',
    flexDirection: 'row',
  }}>
    <NewBinButton />
    <Box sx={{flex: 1}}/>
    <Grouping />
    <Box sx={{flex: 1}}/>
    <SelectLanguage />
    <About />
  </Box>
};

export default ButtonBar;