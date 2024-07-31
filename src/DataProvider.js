import React, { createContext, useState, useContext, useEffect } from 'react';
import dataset from './DataSet'; // Adjust the path as necessary
import { Box, Typography } from '@mui/material';

// Helper functions
const generateUniqueId = (index) => index + 1;
const determineCardColor = (index) => index % 2 === 0 ? '#eb7a7a' : '#7ab6eb';

// Define container types
const ImageContainer = ({ feature_data }) => (
  <Box>
    <img src={feature_data.data} alt="card feature" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    {feature_data.label && <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{feature_data.label}</Typography>}
  </Box>
);

const SequenceContainer = ({ feature_data }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{feature_data.label}</Typography>
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
);

const TextContainer = ({ feature_data }) => (
  <Box>
    {feature_data.label === "" ?
      <Typography variant="body2">{feature_data.data}</Typography>
      :
      <Typography variant="body2"><i>{feature_data.label}: </i>{feature_data.data}</Typography>
    }
  </Box>
);

// Transform data function
const transformData = () => {
  const cards = dataset.cards || [];
  const groupings = dataset.groupings || {};

  // Extract grouping labels
  const groupingLabels = Object.keys(groupings);

  const transformedCards = cards.map((card, index) => {
    // Construct container
    const container = (
      <Box
        sx={{
          width: '160px',
          height: '200px',
          backgroundColor: determineCardColor(index),
          border: '1px solid black',
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          textAlign: 'center',
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
    );

    return {
      id: generateUniqueId(index),
      container,
      location: 'original',
      grouping: card.grouping,
      color: card.color || 'none', // Add color attribute if available
    };
  });

  return {
    cards: transformedCards,
    groupings: groupings, // Add groupings to the result
    groupingLabels, // Add groupingLabels to the result
  };
};

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [bins, setBins] = useState([]);
  const [cards, setCards] = useState([]);
  const [groupings, setGroupings] = useState({}); // Add state for groupings
  const [groupingLabels, setGroupingLabels] = useState([]); // Add state for grouping labels

  // Fetch and transform data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { cards: transformedCards, groupings: groupingData, groupingLabels: labels } = transformData();
        setCards(transformedCards);
        setGroupings(groupingData); // Set groupings state
        setGroupingLabels(labels); // Set groupingLabels state
        
        const binsFromDataset = dataset.bins || [];
        setBins(binsFromDataset);
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ bins, setBins, cards, setCards, groupings, setGroupings, groupingLabels }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};


