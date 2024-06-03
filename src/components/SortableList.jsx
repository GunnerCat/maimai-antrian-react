import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem({ id, name }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        key={id}
        className="touch-none p-4 bg-amber-100 border-solid  min-w-80  w-1/2"
      >
        <span className="flex justify-center">{name}</span>
      </div>
    </div>
  )
}
