"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Circle, SquareCheck, Star, X } from "@repo/ui/components/ui/icons";
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
import { useForm } from "react-hook-form";
import { appConstants } from "../../constants/appConstant";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useSWRConfig } from "swr";
import { useToast } from "../../../../packages/ui/src/components/ui/use-toast";
import {
  addQuestion,
  updateQuestion,
} from "../../app/(tabs)/questions/actions";
import {
  addQuestionSchema,
  addQuestionSchemaType,
} from "../../types/addQuestionSchema";

const QuestionForm = ({
  isUpdate,
  formData = {
    title: "",
    type: "",
    options: [{ text: "Option 1" }],
  },
  setOpen,
}: {
  isUpdate?: boolean;
  formData?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): ReactNode => {
  const [selectedType, setSelectedType] = useState("");
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  useEffect(() => {
    console.log("formData: ", formData);
    // console.log("form.formState: ", form.getValues());
  }, [formData]);

  const form = useForm<addQuestionSchemaType>({
    resolver: zodResolver(addQuestionSchema),
    defaultValues: {
      ...formData,
    },
  });

  const handleAddOption = () => {
    let tempOptions = Array.from(form.getValues("options"));
    tempOptions.push({ text: `Option ${tempOptions.length + 1}` });
    form.setValue("options", tempOptions, { shouldValidate: true });
  };

  const removeOption = (index: number) => {
    let tempOptions = Array.from(form.getValues("options"));
    tempOptions.splice(index, 1);
    form.setValue("options", tempOptions, { shouldValidate: true });
  };

  async function onSubmit(values: addQuestionSchemaType) {
    try {
      let id;
      if (isUpdate) {
        id = await updateQuestion(formData?.id, values);
        mutate("/api/questions");
      } else {
        id = await addQuestion({ ...values });
        mutate("/api/questions");
      }
      toast({
        description: `Your question has been created with id ${id}.`,
      });
      setOpen && setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

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
    <DialogContent className="md:max-w-screen-md max-w-[425px]">
      <DialogTitle>{`${isUpdate ? "Update" : "Add"} Question`}</DialogTitle>
      <DialogHeader>
        <DialogDescription>
          {`You're ${isUpdate ? "updating" : "creating"} a new question. Click ${isUpdate ? "update" : "save"} when you're done.`}
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

          <div className="mt-8">
            {Array.isArray(form.getValues("options")) &&
              form.getValues("options").map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  {getIcon(selectedType)}
                  <Input
                    value={item?.text}
                    className="border-0 border-foreground rounded-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-b"
                    onChange={(e) => {
                      let tempOptions = Array.from(form.getValues("options"));
                      tempOptions[index] = { text: e.target.value };
                      form.setValue("options", tempOptions, {
                        shouldValidate: true,
                      });
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

          <DialogFooter>
            <Button type="submit">{`${isUpdate ? "Update" : "Save"}`}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default QuestionForm;

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
