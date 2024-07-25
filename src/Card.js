import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Import item types

// Define container types
const ImageContainer = ({ src }) => <img src={src} alt="card feature" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
const SequenceContainer = ({ data }) => <div>{data}</div>;
const TextContainer = ({ data }) => <div>{data}</div>;

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
