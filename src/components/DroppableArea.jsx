import { useDroppable } from '@dnd-kit/core'

export function DroppableArea({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id
  })

  return (
    <div
      className={`p-5 transition rounded-md ${
        isOver ? 'bg-red-500' : 'bg-gray-100'
      }`}
      ref={setNodeRef}
    >
      {children}
    </div>
  )
}
