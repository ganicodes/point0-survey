"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../button";
import { DataTableViewOptions } from "./data-table-view-options";

import { Download } from "lucide-react";
import { Input } from "../input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterPlaceholder?: string;
  facetedFilterOptions?: { [key: string]: any };
}

function DownloadButton() {
  return (
    <Button variant="secondary" size="icon" className="mx-2">
      <Download className="h-4 w-4" />
    </Button>
  );
}

export function DataTableToolbar<TData>({
  table,
  filterPlaceholder,
  facetedFilterOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={filterPlaceholder}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {Object.keys(facetedFilterOptions as string[]).map((item) => {
          return (
            table.getColumn(item) && (
              <DataTableFacetedFilter
                key={item}
                column={table.getColumn(item)}
                title={item}
                options={facetedFilterOptions![item]}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DownloadButton />
      <DataTableViewOptions table={table} />
    </div>
  );
}
