const evaluateCardGrouping = (cards, bins) => {
    const binGroups = bins.map(bin => 
      cards.filter(card => card.location === `bin${bin.id}`)
    );
  
    const errors = binGroups.map((group, index) => {
      console.log(`Bin ${index + 1} contains cards:`, group);
  
      const colors = group.map(card => card.color);
      const uniqueColors = [...new Set(colors)];
      console.log(`Bin ${index + 1} unique colors:`, uniqueColors);
  
      if (uniqueColors.length > 1) {
        return `Bin ${index + 1} contains multiple colors: ${uniqueColors.join(', ')}`;
      }
  
      const color = uniqueColors[0];
      if (!color) return `Bin ${index + 1} is empty.`;
  
      const expectedCards = cards.filter(card => card.color === color);
      console.log(`Expected ${color} cards:`, expectedCards);
      if (expectedCards.length !== group.length) {
        return `Bin ${index + 1} is missing some ${color} cards or contains duplicates.`;
      }
  
      return null;
    }).filter(Boolean);
  
    console.log("Evaluation errors:", errors);
    return errors.length ? errors : ["All bins are correctly grouped."];
  };
  
  export default evaluateCardGrouping;  