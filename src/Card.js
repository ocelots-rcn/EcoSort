import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Import item types

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      // Log card information when dragging starts or updates
      console.log('Dragging Card:', { id: card.id, location: card.location });
    }
  }, [isDragging, card]);

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {card.container}
    </div>
  );
};

export default Card;
