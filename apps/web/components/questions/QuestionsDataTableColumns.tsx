import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { DataTableColumnHeader } from "@repo/ui/components/ui/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { appConstants } from "../../constants/appConstant";

import { Button } from "@repo/ui/components/ui/button";
import { DataTableRowActions } from "@repo/ui/components/ui/data-table/data-table-row-actions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Edit, Trash } from "@repo/ui/components/ui/icons";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { deleteQuestion } from "../../app/(tabs)/questions/actions";
import QuestionForm from "./QuestionForm";

export const questionSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.number(),
  updatedBy: z.number(),
});

export type Question = z.infer<typeof questionSchema>;

export const QuestionsDataTableColumns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("type")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated on" />
    ),
    cell: ({ row }) => {
      const date = moment(row.getValue("updatedAt")).format("DD-MMM-yy");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{date}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("createdBy")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} rowActions={rowActions} />
    ),
  },
];

export const facetedFilterOptions = {
  type: [
    {
      label: appConstants.MULTIPLE_SELECT.toUpperCase(),
      value: appConstants.MULTIPLE_SELECT,
    },
    {
      label: appConstants.MULTIPLE_CHOICE.toUpperCase(),
      value: appConstants.MULTIPLE_CHOICE,
    },
    {
      label: appConstants.STAR_RATING.toUpperCase(),
      value: appConstants.STAR_RATING,
    },
  ],
};

export const rowActions = [
  {
    label: "Edit",
    icon: <Edit className="h-4 w-4 ml-2" />,
    // onClick: (id: number, data: any) => updateQuestion(id, data),
    component: (formData: any, setOpen: Dispatch<SetStateAction<boolean>>) => (
      <QuestionForm isUpdate formData={formData} setOpen={setOpen} />
    ),
  },
  {
    label: "Delete",
    icon: <Trash className="h-4 w-4 ml-2" />,
    // onClick: (id: number) => deleteQuestion(id),
    component: (formData: any, setOpen: Dispatch<SetStateAction<boolean>>) => (
      <DeleteConfirmationPopup formData={formData} setOpen={setOpen} />
    ),
  },
];

function DeleteConfirmationPopup({
  formData,
  setOpen,
}: {
  formData: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  console.log("formData: ", formData);
  const { id } = formData;
  const { mutate } = useSWRConfig();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant={"destructive"}
          onClick={async () => {
            await deleteQuestion(id);
            mutate("/api/questions");
            setOpen(false);
          }}
        >
          Yes, Delete
        </Button>
        <Button variant={"outline"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
