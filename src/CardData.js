import dataset from './DataSet';
import { Box, Typography } from '@mui/material';

// Helper functions
const getFeatureNames = () => Object.keys(dataset.features || {});
const generateUniqueId = (index) => index + 1;
const determineCardColor = (index) => index % 2 === 0 ? 'red' : 'blue';

// Transform data function
const transformData = () => {
  const featureNames = getFeatureNames();
  const cards = dataset.cards || [];

  return cards.map((card, index) => {
    // Transform features
    const features = featureNames.map(name => {
      const feature = dataset.features[name];
      if (feature && feature.type === 'image') {
        return { feature: name, data: card[name]?.data || '', isImage: true };
      } else {
        return { feature: name, data: card[name]?.data || '', isImage: false };
      }
    });

    // Extract image data separately
    const imageFeature = features.find(f => f.isImage);
    const imageUrl = imageFeature ? imageFeature.data : '';

    // Find the label for the image feature within the card
    const imageFeatureName = features.find(f => f.isImage)?.feature;
    const imageFeatureLabel = imageFeatureName ? (card[imageFeatureName]?.label || 'cheese') : 'cheese';

    // Get the grouping information
    const grouping = card.grouping || '';

    // Construct the container
    const container = (
      <Box
        sx={{
          width: '160px', // Adjusted card width
          height: '200px', // Adjusted card height
          backgroundColor: determineCardColor(index),
          border: '1px solid black',
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px', // Added padding for better spacing
          textAlign: 'center', // Center all text within the Box
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="card image"
            style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '10px' }}
          />
        )}
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {imageFeatureLabel}
        </Typography>
        {features.filter(f => !f.isImage).map((feature, idx) => (
          <Typography key={idx} variant="body2" sx={{ textAlign: 'center' }}>
            {`${feature.feature}: ${feature.data}`}
          </Typography>
        ))}
      </Box>
    );

    return {
      id: generateUniqueId(index), // Generate a unique ID based on index
      container, // Pass the constructed container
      location: 'original', // Set the original location
      grouping, // Pass the grouping information
    };
  });
};

// Transform dataset to CardData format
const CardData = transformData();

export default CardData;