"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { CirclePlus } from "@repo/ui/components/ui/icons";
import { useState } from "react";

const QuestionSet = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 pt-2 md:flex">
      <div className="flex w-full items-center justify-end space-y-2">
        <AddQuestionSet />
        <div className="flex items-center space-x-2"></div>
        {/* <DataTable
          data={data?.questions}
          columns={QuestionsDataTableColumns}
          filterPlaceholder="Search questions..."
          facetedFilterOptions={facetedFilterOptions}
        /> */}
      </div>
    </div>
  );
};

export default QuestionSet;

export const AddQuestionSet = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Create Question Set
          <CirclePlus className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-screen-md max-w-[425px]">
        <div className="">content</div>
      </DialogContent>
    </Dialog>
  );
};
