import React from 'react';
import dataset from './DataSet';
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
  <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{feature_data.label}</Typography>
    {[...feature_data.data].map((char, index) => {
      if(char.toLowerCase() === "a") {
        return <Box key={index} sx={{padding: '2px', backgroundColor: '#f6db7b'}}>{char}</Box>
      }
      else if(char.toLowerCase() === "c") {
        return <Box key={index} sx={{padding: '2px', backgroundColor: '#ff9ea4'}}>{char}</Box>
      }
      else if(char.toLowerCase() === "g") {
        return <Box key={index} sx={{padding: '2px', backgroundColor: '#95e171'}}>{char}</Box>
      }
      else if(char.toLowerCase() === "t") {
        return <Box key={index} sx={{padding: '2px', backgroundColor: '#75e2ff'}}>{char}</Box>
      }

      return null;
    })
  }
  </Box>
);
const TextContainer = ({ feature_data }) => (
  <Box>
    {feature_data.label === ""?
      <Typography variant="body2">{feature_data.data}</Typography>
    :
    <Typography variant="body2"><i>{feature_data.label}: </i>{feature_data.data}</Typography>
        
    }
  </Box>
);

// Transform data function
const transformData = () => {
  const cards = dataset.cards || [];

  return cards.map((card, index) => {
    // Get grouping information
    const grouping = card.grouping || {};

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
      grouping,
    };
  });
};

// Transform dataset to CardData format
const CardData = transformData();
const Groupings = dataset.groupings;

export { CardData, Groupings };