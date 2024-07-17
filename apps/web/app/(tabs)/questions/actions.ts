"use server";

import { Options, PrismaClient, PrismaPromise, Questions } from "@repo/db";
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
        create: data.options.map((item) => ({ text: item.text })),
      },
    },
    include: {
      options: true,
    },
  });

  return createdQuestion.id;
}

export async function updateQuestion(id: number, form: addQuestionSchemaType) {
  console.log("id: ", id);
  console.log("form: ", form);
  let question: Questions;
  try {
    await client.$transaction(async (tx) => {
      question = await tx.questions.update({
        where: { id: id },
        data: {
          title: form.title,
          type: form.type,
        },
      });

      const optionsToUpdate = form.options.filter(
        (item: { id: number; text: string }) => item.id !== 0,
      );

      const optionsToCreate = form.options.filter(
        (item: { id: number; text: string }) => item.id === 0,
      );

      let optionsPromiseArray: PrismaPromise<Options>[] = [];

      optionsToUpdate.map(({ id, text }: { id: number; text: string }) => {
        const options = tx.options.update({
          where: { id: id },
          data: { text: text },
        });
        optionsPromiseArray.push(options);
      });

      optionsToCreate.map(({ id, text }: { id: number; text: string }) => {
        const options = tx.options.create({
          data: { text: text, questionId: question.id }, // Use the actual question.id here
        });
        optionsPromiseArray.push(options);
      });

      await Promise.all(optionsPromiseArray);
    });

    return true;
  } catch (error) {
    console.error("error: ", error);
    return false;
  }
}

export async function deleteQuestion(id: number) {
  try {
    await client.questions.update({
      where: {
        id,
      },
      data: {
        isActive: false,
        options: {
          updateMany: {
            where: {
              questionId: id,
            },
            data: {
              isActive: false,
            },
          },
        },
      },
      include: {
        options: true,
      },
    });

    return true;
  } catch (error) {
    console.error("error: ", error);
    throw new Error("Error in deleting the questions");
  }
}
