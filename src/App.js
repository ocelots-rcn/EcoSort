import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';
import { LanguageProvider } from './LanguageContext';
import CardHolder from './CardHolder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // Import HTML5 backend

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}> {/* Wrap your app with DndProvider */}
      <LanguageProvider>
        <Header />
        <Container maxWidth="xl">
          <CardHolder />
        </Container>
      </LanguageProvider>
    </DndProvider>
  );
};

export default App;



