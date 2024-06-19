import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'

export function SortableItem({ id, name, drag }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {drag ? (
        <div key={id} className="h-14 w-80"></div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={id}
          className="touch-none p-4 bg-amber-100 border-solid  min-w-80"
        >
          <span className="flex justify-center">{name}</span>
        </motion.div>
      )}
    </div>
  )
}
