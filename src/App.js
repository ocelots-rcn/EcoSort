import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Grid } from '@mui/material';
import { LanguageProvider } from './LanguageContext';
import CardHolder from './CardHolder';
import BinBox from './BinBox';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardData from './CardData';

const App = () => {
  const [createNewBin, setCreateNewBin] = useState(false);
  const [cards, setCards] = useState(CardData);
  const [isOriginalZoneEmpty, setIsOriginalZoneEmpty] = useState(false);

  const handleNewBin = () => {
    setCreateNewBin(true);
  };

  useEffect(() => {
    setCreateNewBin(false);
  }, [createNewBin]);

  useEffect(() => {
    const originalZoneCards = cards.filter(card => card.location === 'original');
    setIsOriginalZoneEmpty(originalZoneCards.length === 0);
  }, [cards]);

  return (
    <DndProvider backend={HTML5Backend}>
      <LanguageProvider>
        <Header onNewBin={handleNewBin} />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <BinBox createNewBin={createNewBin} cards={cards} setCards={setCards} />
            </Grid>
            <Grid item xs={4}>
              <CardHolder cards={cards} setCards={setCards} isOriginalZoneEmpty={isOriginalZoneEmpty} />
            </Grid>
          </Grid>
        </Container>
      </LanguageProvider>
    </DndProvider>
  );
};

export default App;