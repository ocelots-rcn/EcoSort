import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Box from '@mui/material/Box';

import CardHolder from './card/CardHolder';
import BinBox from './bin/BinBox';


const App = () => {
  return <DndProvider backend={HTML5Backend}>
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <CardHolder />
      <BinBox />
    </Box>
  </DndProvider>
};

export default App;