import React from 'react';
import Header from './Header';
import { Container } from '@mui/material';
import { LanguageProvider } from './LanguageContext';

const App = () => {
  return (
    <LanguageProvider>
      <Header />
      <Container>
        <div>
          {/*Card Checker */}
        </div>
        <div>
          {/* Card Holder */}
        </div>
      </Container>
    </LanguageProvider>
  );
};

export default App;
