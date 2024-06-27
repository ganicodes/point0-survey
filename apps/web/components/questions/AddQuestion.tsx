"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Circle,
  CirclePlus,
  SquareCheck,
  Star,
  X,
} from "@repo/ui/components/ui/icons";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { appConstants } from "../../constants/appConstant";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";

type QuestionType = {
  options: string[];
};

const getIcon = (type: string) => {
  let icon;

  switch (type) {
    case appConstants.MULTIPLE_CHOICE:
      icon = <Circle className="w-4 h-4" />;
      break;
    case appConstants.MULTIPLE_SELECT:
      icon = <SquareCheck className="w-4 h-4" />;
      break;
    case appConstants.STAR_RATING:
      icon = <Star className="w-4 h-4" />;
      break;

    default:
      break;
  }

  return icon;
};

export function AddQuestion() {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "Question title can not be empty.",
      })
      .max(50),
    type: z.string().min(1, {
      message: "Please select question type",
    }),
    // options: z.array(z.string().min(1, { message: "Can not be empty!" })),
    // options: z.string().min(1, { message: "Can not be empty" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      //   options: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    options.forEach((option) => {
      if (option.length === 0) {
        alert("Options can not be empty");
      }
    });
    console.log("option: ", options);
    console.log("onSubmit", values);
  }

  const [options, setOptions] = useState(["Option 1"]);
  const [selectedType, setSelectedType] = useState("");

  const handleAddOption = () => {
    let tempOptions = Array.from(options);
    tempOptions.push(`Option ${tempOptions.length + 1}`);
    setOptions(tempOptions);
  };

  const removeOption = (index: number) => {
    let tempOptions = Array.from(options);
    tempOptions.splice(index, 1);
    setOptions(tempOptions);
  };

  const AddOption = ({ type }: { type: string }) => {
    return (
      <div className="flex items-center gap-4">
        {getIcon(type)}
        <Input
          className="cursor-pointer border-0 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-b"
          onClick={() => handleAddOption()}
          placeholder="Add Option"
          readOnly
        />
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Question <CirclePlus className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-screen-md max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            You're creating a new question. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4 justify-between items-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        id="title"
                        className="flex-1"
                        placeholder="Untitled Question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(v) => {
                          setSelectedType(v);
                          field.onChange(v);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Question Type</SelectLabel>
                            <SelectItem value={appConstants.MULTIPLE_CHOICE}>
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value={appConstants.MULTIPLE_SELECT}>
                              Multiple Select
                            </SelectItem>
                            <SelectItem value={appConstants.STAR_RATING}>
                              Rating (Star)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {selectedType && (
              <div className="mt-8">
                {Array.isArray(options) &&
                  options.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {getIcon(selectedType)}
                      <Input
                        value={item}
                        className="border-0 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-b"
                        onChange={(e) => {
                          let tempOptions = Array.from(options);
                          tempOptions[index] = e.target.value;
                          setOptions(tempOptions);
                        }}
                        placeholder="Option"
                      />
                      {index > 0 && (
                        <X
                          className="h-4 w-4 text-red-700 cursor-pointer"
                          onClick={() => removeOption(index)}
                        />
                      )}
                    </div>
                  ))}
                <AddOption type={selectedType} />
              </div>
            )}

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
