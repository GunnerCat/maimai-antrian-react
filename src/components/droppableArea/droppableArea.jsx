import { useDroppable } from '@dnd-kit/core';

export function DroppableArea({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? 'lightgreen' : 'lightgray',
    padding: '20px',
    marginTop: '20px',
    borderRadius: '5px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
