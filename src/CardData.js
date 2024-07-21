import dataset from './DataSet';

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

    return {
      id: generateUniqueId(index), // Generate a unique ID based on index
      color: determineCardColor(index), // Alternate colors based on index
      features: features.filter(f => !f.isImage), // Exclude image feature from features
      imageUrl, // Set imageUrl from image feature
      location: 'original',
      title: imageFeatureLabel, // Use the label for the image feature from the card
    };
  });
};

// Transform dataset to CardData format
const CardData = transformData();

export default CardData;