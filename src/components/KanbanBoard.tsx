import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Column } from "../types";
import ColumnContainer from "./ColumnContainer";
import { ID } from "../types";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

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

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => (
            <ColumnContainer
              column={column}
              deleteColumn={deleteColumn}
              key={column.id}
            />
          ))}
        </div>
        <button
          onClick={createColumn}
          className="flex gap-3 h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
        >
          <PlusCircleIcon />
          Add Column
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;
