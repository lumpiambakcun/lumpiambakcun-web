"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type SortableRowsProps = {
  ids: readonly UniqueIdentifier[];
  labelOf: (id: UniqueIdentifier) => string;
  onMove: (from: number, to: number) => void;
  className?: string;
  children: React.ReactNode;
};

export function SortableRows({ ids, labelOf, onMove, className, children }: SortableRowsProps) {
  const contextId = useId();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const announcements: Announcements = {
    onDragStart: ({ active }) => `${labelOf(active.id)} diangkat.`,
    onDragOver: ({ active, over }) => (over ? `${labelOf(active.id)} berada di posisi ${labelOf(over.id)}.` : undefined),
    onDragEnd: ({ active, over }) => (over ? `${labelOf(active.id)} diletakkan di posisi ${labelOf(over.id)}.` : `${labelOf(active.id)} dikembalikan.`),
    onDragCancel: ({ active }) => `Pemindahan ${labelOf(active.id)} dibatalkan.`,
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    onMove(ids.indexOf(active.id), ids.indexOf(over.id));
  };

  return (
    <DndContext
      id={contextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      accessibility={{
        announcements,
        screenReaderInstructions: {
          draggable: "Tekan spasi untuk mengangkat, panah atas atau bawah untuk memindahkan, spasi lagi untuk meletakkan, Escape untuk membatalkan.",
        },
      }}
    >
      <SortableContext items={[...ids]} strategy={verticalListSortingStrategy}>
        <ul className={cn("overflow-hidden rounded-md border border-border bg-card", className)}>{children}</ul>
      </SortableContext>
    </DndContext>
  );
}

type SortableRowProps = {
  id: UniqueIdentifier;
  label: string;
  children: (handle: React.ReactNode) => React.ReactNode;
};

export function SortableRow({ id, label, children }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("relative border-b border-border bg-card last:border-b-0", isDragging && "z-10 shadow-panel ring-1 ring-brand")}
    >
      {children(
        <button
          ref={setActivatorNodeRef}
          type="button"
          aria-label={`Geser ${label}`}
          className="grid size-8 shrink-0 cursor-grab touch-none place-items-center rounded-md text-ink-muted outline-none hover:bg-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" aria-hidden="true" />
        </button>,
      )}
    </li>
  );
}
