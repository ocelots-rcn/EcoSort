import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Box from '@mui/material/Box';

import { DataProvider } from './DataProvider';
import { LanguageProvider } from './LanguageContext';
import Header from './Header';
import CardHolder from './CardHolder';
import BinBox from './BinBox';


const App = () => {
  return <LanguageProvider>
      <DataProvider>
        <DndProvider backend={HTML5Backend}>
          <Header />
          <Box sx={{display: 'flex', flexDirection: 'row' }}>
            <CardHolder />
            <BinBox /> 
          </Box>
        </DndProvider>
      </DataProvider>
    </LanguageProvider>
};

export default App;