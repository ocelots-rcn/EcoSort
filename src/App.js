import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataProvider } from './DataProvider'; // Adjust the path as necessary

import Box from '@mui/material/Box';

import { LanguageProvider } from './LanguageContext';
import Header from './Header';
import CardHolder from './CardHolder';
import BinBox from './BinBox';



const App = () => {
  const [createNewBin, setCreateNewBin] = useState(false);

  const handleNewBin = () => {
    setCreateNewBin(true);
  };

  useEffect(() => {
    setCreateNewBin(false);
  }, [createNewBin]);

  return (
    <LanguageProvider>
      <DataProvider>
        <DndProvider backend={HTML5Backend}>
          <Header onNewBin={handleNewBin} />
          <Box sx={{display: 'flex', flexDirection: 'row' }}>
          <CardHolder />
            <BinBox createNewBin={createNewBin} /> 
          </Box>
        </DndProvider>
      </DataProvider>
    </LanguageProvider>
  );
};

export default App;