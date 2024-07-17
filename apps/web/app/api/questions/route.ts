import { PrismaClient } from "@repo/db";

const client = new PrismaClient();

export async function GET() {
  const questions = await client.questions.findMany({
    where: {
      isActive: true,
    },
    include: {
      options: {
        select: {
          id: true,
          text: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  return Response.json({ questions });
}
