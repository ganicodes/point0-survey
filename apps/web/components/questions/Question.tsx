"use client";
import { DataTable } from "@repo/ui/components/ui/data-table/data-table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useGetQuestions } from "../../hooks/services";
import { AddQuestion } from "./AddQuestion";
import {
  QuestionsDataTableColumns,
  facetedFilterOptions,
} from "./QuestionsDataTableColumns";

const Question = () => {
  const { data, error, isLoading } = useGetQuestions();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <SkeletonDemo />;

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 pt-2 md:flex">
      <div className="flex w-full items-center justify-end space-y-2">
        <AddQuestion />
        <div className="flex items-center space-x-2"></div>
      </div>
      <DataTable
        data={data?.questions}
        columns={QuestionsDataTableColumns}
        filterPlaceholder="Search questions..."
        facetedFilterOptions={facetedFilterOptions}
      />
    </div>
  );
};

export default Question;

function SkeletonDemo() {
  return (
    <div className="w-full mt-12 ">
      <div className="flex flex-col  items-center gap-2">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
}
