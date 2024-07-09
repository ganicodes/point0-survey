"use client";

import { Row } from "@tanstack/react-table";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Button } from "../button";
import { Dialog, DialogTrigger } from "../dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  rowActions?: {
    label: string;
    icon: ReactNode;
    // eslint-disable-next-line no-unused-vars
    // onClick: (id: number, data?: any) => Promise<number>;
    component: (
      // eslint-disable-next-line no-unused-vars
      formData: any,
      // eslint-disable-next-line no-unused-vars
      setOpen: Dispatch<SetStateAction<boolean>>,
    ) => ReactElement;
  }[];
}

export function DataTableRowActions<TData>({
  row,
  rowActions,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen} defaultOpen={false}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {rowActions?.map((action, index) => (
            <DialogTrigger asChild>
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  setIndex(index);
                  setOpen(true);
                }}
              >
                {action.label}
                {action.icon}
              </DropdownMenuItem>
            </DialogTrigger>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {rowActions &&
        open &&
        rowActions[index]?.component(row?.original, setOpen)}
    </Dialog>
  );
}
