import { useState, useMemo } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Column } from "../types";
import ColumnContainer from "./ColumnContainer";
import { ID } from "../types";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsID = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const generateID = () => {
    return Math.floor(Math.random() * 10001);
  };

  const createColumn = () => {
    const columnToAdd: Column = {
      id: generateID(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns((columns) => [...columns, columnToAdd]);
    console.log(columns);
  };

  const deleteColumn = (id: ID) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("dragging", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40]">
      <DndContext onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsID}>
              {columns.map((column) => (
                <ColumnContainer
                  column={column}
                  deleteColumn={deleteColumn}
                  key={column.id}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={createColumn}
            className="flex gap-3 h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
          >
            <PlusCircleIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
