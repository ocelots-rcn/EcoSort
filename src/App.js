import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Grid } from '@mui/material';
import { LanguageProvider } from './LanguageContext';
import CardHolder from './CardHolder';
import BigBox from './BinBox';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardData from './CardData';

const App = () => {
  const [createNewBin, setCreateNewBin] = useState(false);
  const [cards, setCards] = useState(CardData);

  const handleNewBin = () => {
    setCreateNewBin(true);
  };

  useEffect(() => {
    setCreateNewBin(false);
  }, [createNewBin]);

  return (
    <DndProvider backend={HTML5Backend}>
      <LanguageProvider>
        <Header onNewBin={handleNewBin} />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <BigBox createNewBin={createNewBin} cards={cards} setCards={setCards} />
            </Grid>
            <Grid item xs={4}>
              <CardHolder cards={cards} setCards={setCards} />
            </Grid>
          </Grid>
        </Container>
      </LanguageProvider>
    </DndProvider>
  );
};

export default App;