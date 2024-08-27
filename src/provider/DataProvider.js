import React, { createContext, useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { useTranslationContext } from './TranslationProvider'; // Correct path to LanguageContext
import dataset from './DataSet'; // Adjust the path as necessary

// Define container types
const ImageContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box>
    {feature_data.label['en'] && <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{translateBlock(feature_data.label)}</Typography>}
    <img src={feature_data.data} alt="card feature" style={{ maxWidth: '200px', maxHeight: '200px' }} />
  </Box>
};

const SequenceContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{translateBlock(feature_data.label)}</Typography>
    {[...feature_data.data].map((char, index) => {
      if (char.toLowerCase() === "a") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#f6db7b' }}>{char}</Box>
      } else if (char.toLowerCase() === "c") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#ff9ea4' }}>{char}</Box>
      } else if (char.toLowerCase() === "g") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#95e171' }}>{char}</Box>
      } else if (char.toLowerCase() === "t") {
        return <Box key={index} sx={{ padding: '2px', backgroundColor: '#75e2ff' }}>{char}</Box>
      }
      return null;
    })}
  </Box>
};

const TextContainer = ({ feature_data }) => {
  const { translateBlock } = useTranslationContext();

  return <Box>
    {feature_data.label === "" ?
      <Typography variant="body2">{translateBlock(feature_data.data)}</Typography>
      :
      <Typography variant="body2"><i>{translateBlock(feature_data.label)}</i><br />{translateBlock(feature_data.data)}</Typography>
    }
  </Box>
};

const transformData = () => {
  const cards = dataset.cards || [];
  const groupings = dataset.groupings || {};

  const transformedCards = cards.reduce((acc, card, index) => {
    acc[index] = {
      id: index,
      container: (
        <Box
          sx={{
            width: '220px',
            borderRadius: '5px',
            backgroundColor: 'white',
            border: '1px solid rgb(195, 193, 193)',
            margin: '10px',
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
      location: 'original',
      grouping: card.grouping
    };
    return acc;
  }, {});

  return {
    cards: transformedCards,
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

  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState('');

  const { translation, translateBlock } = useTranslationContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cards: transformedCards, groupings } = transformData();
        setCards(transformedCards);
        setGroupings(groupings);
        setCurrentGrouping(Object.keys(groupings)[0] || '')

        const binsFromDataset = dataset.bins || [];
        setBins(binsFromDataset.map(bin => ({ id: bin, contents: [] })));
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    if (initialLoad === true) {
      fetchData();
      setInitalLoad(false);
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

      // Move cards from the deleted bin back to the original location
      const binToDelete = prevBins[binIndex];
      if (binToDelete.contents.length > 0) {
        binToDelete.contents.forEach(cardId => {
          moveCard(cardId, 'original');
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

    const totalCategories = dataset.groupings[currentGrouping]?.total_categories || bins.length;
    const assessmentFunction = dataset.groupings[currentGrouping]?.assessment_function || 'categorical';

    console.log(`Total Categories: ${totalCategories}`);
    console.log(`Assessment Function: ${assessmentFunction}`);

    if (bins.length !== totalCategories) {
      setCorrect(false);
      setMessage(translation['assessmentGroupNumbers']);
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
      } else {
        setCorrect(false);
        setMessage(translation['assessmentIncorrect']);
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

  return (
    <DataContext.Provider value={{ bins, setBins, cards, setCards, groupings, currentGrouping, setCurrentGrouping, createNewBin, checkGrouping, moveCard, deleteBin }}>
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
