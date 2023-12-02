import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (teachers.length < 1)
      return res.json({
        ok: false,
        message: "Coś poszło nie tak!",
      });

    return res.json({
      ok: true,
      teachers,
    });
  }
}
