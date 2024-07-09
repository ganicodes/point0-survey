"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { CirclePlus } from "@repo/ui/components/ui/icons";
import { useState } from "react";

import QuestionForm from "./QuestionForm";

export function AddQuestion() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Question <CirclePlus className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-screen-md max-w-[425px]">
        <QuestionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
