import React from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import AddBox from '@mui/icons-material/AddBox';

import { useTranslationContext } from '../provider/TranslationProvider';
import { useDataContext } from '../provider/DataProvider';

const NewBinButton = () => {
  const { translation } = useTranslationContext();
  const { createNewBin } = useDataContext();

  return <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Tooltip title={translation.newBin}>
      <IconButton onClick={createNewBin} >
        <AddBox />
      </IconButton>
    </Tooltip>
    <Box sx={{padding: '8px 8px 8px 0px', fontSize: '1.5rem', color: 'rgba(0, 0, 0, 0.54)'}}>
      {translation.group}
    </Box>
  </Box>
}

export default NewBinButton