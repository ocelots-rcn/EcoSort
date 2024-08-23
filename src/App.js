import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Grid } from '@mui/material';
import { LanguageProvider } from './LanguageContext';
import CardHolder from './CardHolder';
import BinBox from './BinBox';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DataProvider } from './DataProvider'; // Adjust the path as necessary

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
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <BinBox createNewBin={createNewBin} />
              </Grid>
              <Grid item xs={4}>
                <CardHolder />
              </Grid>
            </Grid>
          </Container>
        </DndProvider>
      </DataProvider>
    </LanguageProvider>
  );
};

export default App;