import { TouchSensor } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ key, name, idx, itemSize}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: name });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        key={name}
        className={`touch-none p-4 bg-amber-100 border-solid border-b border-x min-w-80 border-gray-800 w-1/2 ${idx === 0 ? 'rounded-t-lg border-t' : ''} ${idx === itemSize-1 ? 'rounded-b-lg' : ''}`}
      >
        <span className="flex justify-center">{name+' '+idx}</span>
      </div>
    </div>
  );
}
