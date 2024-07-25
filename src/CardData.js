import React from 'react';
import dataset from './DataSet';
import { Box, Typography } from '@mui/material';

// Helper functions
const getFeatureNames = () => Object.keys(dataset.features || {});
const generateUniqueId = (index) => index + 1;
const determineCardColor = (index) => index % 2 === 0 ? 'red' : 'blue';

// Define container types
const ImageContainer = ({ src, label }) => (
  <Box>
    <img src={src} alt="card feature" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    {label && <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{label}</Typography>}
  </Box>
);
const SequenceContainer = ({ data }) => <Typography variant="body2">{data}</Typography>;
const TextContainer = ({ data }) => <Typography variant="body2">{data}</Typography>;

// Transform data function
const transformData = () => {
  const featureNames = getFeatureNames();
  const cards = dataset.cards || [];

  return cards.map((card, index) => {
    // Initialize an empty array for children
    const children = [];

    // Extract features
    featureNames.forEach(name => {
      const feature = dataset.features[name];
      const featureData = card[name]?.data || '';
      
      if (feature?.type === 'image') {
        // Extract image feature label
        const imageFeatureLabel = card[name]?.label || 'cheese';
        children.push(<ImageContainer key={name} src={featureData} label={imageFeatureLabel} />);
      } else if (feature?.type === 'sequence') {
        children.push(<SequenceContainer key={name} data={featureData} />);
      } else if (feature?.type === 'text') {
        children.push(<TextContainer key={name} data={featureData} />);
      }
    });

    // Get grouping information
    const grouping = card.grouping || '';

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
        {children}
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

export default CardData;