/*
Copyright 2024 Caden Klopfenstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { createContext, useState, useContext, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

import { useTranslationContext } from './TranslationProvider'; // Correct path to LanguageContext
import { ImageContainer, SequenceContainer, TextContainer } from '../card/FeatureContainers';
import defaultDataSet from './DataSet';

const transformData = (dataset) => {
  const cards = [...dataset.cards] || [];
  const groupings = dataset.groupings || {};

  const deck = {};
  let id = 0;
  while(cards.length > 0) {
    let index = Math.floor(Math.random() * cards.length) - 1;
    let card = cards.splice(index, 1)[0];
    deck[id] = {
      id: id,
      container: (
        <Box
          sx={{
            width: '200px',
            borderRadius: '5px',
            backgroundColor: 'white',
            border: '1px solid rgb(195, 193, 193)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            textAlign: 'center',
            boxShadow: 2,
          }}
        >
          {Object.keys(card).map(name => {
            if (card[name].type === 'image') {
              return <ImageContainer key={name} feature_data={card[name]} />;
            } else if (card[name].type === 'sequence') {
              return <SequenceContainer key={name} feature_data={card[name]} />;
            } else if (card[name].type === 'text') {
              return <TextContainer key={name} feature_data={card[name]} />;
            }
            return null;
          })}
        </Box>
      ),
      location: 'unsorted',
      grouping: card.grouping
    };
    id += 1;
  }

  return {
    deck,
    groupings,
  };
};

// Create the context
const DataContext = createContext();

// Create a provider component
const DataProvider = ({ children }) => {
  const [initialLoad, setInitalLoad] = useState(true)
  const [bins, setBins] = useState([]);
  const [cards, setCards] = useState({});
  const [groupings, setGroupings] = useState({});
  const [currentGrouping, setCurrentGrouping] = useState('')
  const [failedAttempts, setFailedAttempts] = useState(0);

  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState('');

  const [error, setError] = useState(false);

  const { translation, translateBlock } = useTranslationContext();

  const loadData = (dataset) => {
    const { deck, groupings } = transformData(dataset);
    setCards(deck);
    setGroupings(groupings);
    setCurrentGrouping(Object.keys(groupings)[0] || '')

    //Initialize with one bin showing
    setBins([{ id: 1, contents: [] }]);
  }

  useEffect(() => {
    if (initialLoad === true) {
      setInitalLoad(false);
      const searchParams = new URLSearchParams(window.location.search);
      const url = searchParams.get('ds');
      if(url !== null) {
        axios.get(window.location.protocol + '//' + url).then(response => {
            loadData(response.data);
        }).catch(error => {
          setError(true);
        })
      }
      else {
        loadData(defaultDataSet);
      }
      
    }
  }, [initialLoad]);

  // Handle creating a new bin
  const createNewBin = () => {
    const newBinId = bins.length + 1;
    setBins(prevBins => [...prevBins, { id: newBinId, contents: [] }]); // Initialize contents
  };

  const deleteBin = (binId) => {
    setBins(prevBins => {
      const binIndex = prevBins.findIndex(bin => bin.id === binId);

      if (binIndex === -1) return prevBins;

      // Move cards from the deleted bin back to the unsorted location
      const binToDelete = prevBins[binIndex];
      if (binToDelete.contents.length > 0) {
        binToDelete.contents.forEach(cardId => {
          moveCard(cardId, 'unsorted');
        });
      }

      // Shift remaining bins to the left
      const updatedBins = prevBins.filter(bin => bin.id !== binId);

      for (let i = binIndex + 1; i < prevBins.length; i++) {
        const newBinId = prevBins[i].id - 1;

        // Update cards' location for the shifted bin
        const oldBin = prevBins[i];
        oldBin.contents.forEach(cardId => {
          moveCard(cardId, newBinId);
        });

        updatedBins[i - 1] = {
          ...prevBins[i],
          id: newBinId,
        };
      }

      return updatedBins;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkGrouping = () => {
    console.log(`Current Grouping: ${currentGrouping}`);

    const totalCategories = groupings[currentGrouping]?.total_categories || bins.length;
    const assessmentFunction = groupings[currentGrouping]?.assessment_function || 'categorical';

    console.log(`Total Categories: ${totalCategories}`);
    console.log(`Assessment Function: ${assessmentFunction}`);

    if (bins.length !== totalCategories) {
      setCorrect(false);
      setMessage(translation['assessmentGroupNumbers']);
      setFailedAttempts(prev => prev + 1);
      setOpen(true);
      return;
    }

    if (assessmentFunction === 'categorical') {
      let isCorrect = true;

      for (let bin of bins) {
        // Debugging: Ensure bin name is correct
        console.log(`Checking Bin: ${bin.id}`);

        const cardsInBin = bin.contents.map(cardId => cards[cardId]);
        console.log(`Cards in Bin ${bin.id}:`, cardsInBin);

        if (cardsInBin.length === 0) continue;

        // Debugging: Check the selected grouping value for cards in the bin
        const firstCardGroupingValue = cardsInBin[0]?.grouping[currentGrouping];
        console.log(`First Card Grouping Value in Bin ${bin.id}: ${firstCardGroupingValue}`);

        // Check if all cards in this bin have the same grouping value
        const allMatch = cardsInBin.every(card => card.grouping[currentGrouping] === firstCardGroupingValue);
        console.log(`All cards match in Bin ${bin.id}: ${allMatch}`);

        if (!allMatch) {
          isCorrect = false;
          break;
        }
      }

      if (isCorrect) {
        setCorrect(true);
        setMessage(translation['assessmentCorrect']);
        setFailedAttempts(0); // Reset failed attempts on success
      } else {
        setCorrect(false);
        setMessage(translation['assessmentIncorrect']);
        setFailedAttempts(prev => prev + 1);
      }
    } else {
      console.log("Implement your own assessment function");
    }

    setOpen(true);
  };

  const moveCard = (cardId, newLocation) => {
    setBins((prevBins) => {
      const updatedBins = prevBins.map((bin) => {
        if (bin.id === newLocation) {
          // Check if the card is already in the new location
          if (!bin.contents.includes(cardId)) {
            // Add the card to the new location if it's not already there
            const newContents = [...bin.contents, cardId];
            return { ...bin, contents: newContents };
          }
        } else if (bin.contents.includes(cardId)) {
          // Remove the card from its previous location
          const newContents = bin.contents.filter((id) => id !== cardId);
          return { ...bin, contents: newContents };
        }
        return bin;
      });
      return updatedBins;
    });

    setCards((prevCards) => {
      return {
        ...prevCards,
        [cardId]: { ...prevCards[cardId], location: newLocation },
      };
    });
  };

  // Calculate the number of correct and incorrect cards in a bin
  const calculateBinStats = (binId) => {
    const bin = bins.find(b => b.id === binId);
    if (!bin || !bin.contents.length) return { correct: 0, incorrect: 0 };

    const cardsInBin = bin.contents.map(cardId => cards[cardId]);
    if (cardsInBin.length === 0) return { correct: 0, incorrect: 0 };

    // Get the grouping value of the first card as reference
    const firstCardGroupingValue = cardsInBin[0].grouping[currentGrouping];
    
    // Count correct and incorrect cards
    const correct = cardsInBin.filter(card => card.grouping[currentGrouping] === firstCardGroupingValue).length;
    const incorrect = cardsInBin.length - correct;

    return { correct, incorrect };
  };

  return (
    <DataContext.Provider value={{ 
      bins, 
      setBins, 
      cards, 
      setCards, 
      groupings, 
      currentGrouping, 
      setCurrentGrouping, 
      createNewBin, 
      checkGrouping, 
      moveCard, 
      deleteBin, 
      calculateBinStats, 
      error,
      failedAttempts,
      setFailedAttempts 
    }}>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{translation['assessment']}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
          {correct === true ? 
            <Box sx={{marginTop: '20px'}}>
              <DialogContentText sx={{fontWeight: 'bold'}}>{translation['reflectionQuestion']}</DialogContentText>
              <DialogContentText>{translateBlock(groupings[currentGrouping]['reflection_question'])}</DialogContentText>
            </Box>
          :
            null
          }
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={error} onClose={() => setError(false)}>
        <DialogTitle>{translation.dataset['error']}</DialogTitle>
        <DialogContent>
          <DialogContentText>{translation.dataset['failed']}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useDataContext }
