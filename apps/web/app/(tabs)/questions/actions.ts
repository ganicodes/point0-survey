"use server";

import { PrismaClient } from "@repo/db";
import {
  addQuestionSchema,
  addQuestionSchemaType,
} from "../../../types/addQuestionSchema";

const client = new PrismaClient();

export async function addQuestion(form: addQuestionSchemaType) {
  const { success, data } = addQuestionSchema.safeParse(form);
  if (!success) {
    throw new Error("Bad request");
  }

  const createdQuestion = await client.questions.create({
    data: {
      title: data.title,
      type: data.type,
      options: {
        create: data.options,
      },
    },
    include: {
      options: true,
    },
  });

  return createdQuestion.id;
}

export async function updateQuestion(id: number, form: any) {
  console.log("id: ", id);
  console.log("form: ", form);
  try {
    const question = await client.questions.update({
      where: {
        id,
      },
      data: {
        title: form.title,
        type: form.type,
      },
    });

    return question.id;
  } catch (error) {
    console.error("error: ", error);
    throw new Error("Error in deleting the questions");
  }
}

export async function deleteQuestion(id: number) {
  console.log("id: ", id);
  try {
    await client.questions.delete({
      where: {
        id: id,
      },
    });

    return 1;
  } catch (error) {
    console.error("error: ", error);
    throw new Error("Error in deleting the questions");
  }
}
