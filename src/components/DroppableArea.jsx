import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

export function DroppableArea({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id
  })

  return (
    <motion.div
      className={`p-5 transition rounded-md ${
        isOver ? 'bg-red-500' : 'bg-gray-100'
      }`}
      ref={setNodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}
