import React from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import AddBox from '@mui/icons-material/AddBox';

import { useTranslationContext } from '../provider/TranslationProvider';
import { useDataContext } from '../provider/DataProvider';

const NewBinButton = () => {
  const { translation } = useTranslationContext();
  const { createNewBin } = useDataContext();

  return <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Tooltip title={translation.newBin}>
      <Button onClick={createNewBin} color="primary" endIcon={<AddBox />}>
        {translation.group}
      </Button>
    </Tooltip>
  </Box>
}

export default NewBinButton