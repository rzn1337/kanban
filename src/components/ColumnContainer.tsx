import { Column, ID } from "../types";
import { Trash2Icon } from "lucide-react";

interface Props {
  column: Column;
  deleteColumn: (id: ID) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;
  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="rounded-full flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm">
            12
          </div>
          {column.title}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <Trash2Icon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
