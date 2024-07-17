import { z } from "zod";
export const addQuestionSchema = z.object({
  id: z.number().default(0),
  title: z
    .string()
    .min(1, {
      message: "Question title can not be empty.",
    })
    .max(50),
  type: z.string().min(1, {
    message: "Please select question type",
  }),
  options: z.array(z.object({ id: z.number(), text: z.string() })),
});

export type addQuestionSchemaType = z.infer<typeof addQuestionSchema>;
