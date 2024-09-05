import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import GradingIcon from '@mui/icons-material/Grading';

import NewBinButton from './NewBinButton';
import SelectLanguage from './SelectLanguage';
import About from './About';
import Grouping from './Grouping';

import { useDataContext } from '../provider/DataProvider';
import { useTranslationContext } from '../provider/TranslationProvider';

const ButtonBar = () => {

  const { checkGrouping } = useDataContext();
  const { translation } = useTranslationContext();

  return <Box sx={{
    display: 'flex',
    flexDirection: 'row',
  }}>
    <NewBinButton />

      <Button
          variant="contained"
          startIcon={<GradingIcon/>}
          color="success"
          sx={{marginLeft: '1rem'}}
          onClick={() => checkGrouping()}
        >
          {translation['checkGrouping']}
        </Button>

    <Box sx={{flex: 1}}/>
    <Grouping />
    <Box sx={{flex: 1}}/>
    <SelectLanguage />
    <About />
  </Box>
};

export default ButtonBar;