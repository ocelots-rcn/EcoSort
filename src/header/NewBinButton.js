import React from 'react';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddBox from '@mui/icons-material/AddBox';

import { useTranslationContext } from '../provider/TranslationProvider';
import { useDataContext } from '../provider/DataProvider';

const NewBinButton = () => {
  const { translation } = useTranslationContext();
  const { createNewBin } = useDataContext();

  return <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Tooltip title={translation.newBin}>
      <Button variant="contained" onClick={createNewBin} color="primary" startIcon={<AddBox />}>
        {translation.group}
      </Button>
    </Tooltip>
  </Box>
}

export default NewBinButton