import { useDraggable } from '@dnd-kit/core';

function Card2({ id, content }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    padding: '8px',
    margin: '4px',
    backgroundColor: 'lightgray',
    border: '1px solid black',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content}
    </div>
  );
}

export default Card2