import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

const handler: NextApiHandler = async (req, res) => {
  let session = await getSession({ req });

  if (!session) res.status(401).json({ ok: false });

  try {
    if (req.method === "POST") {
      let { skip, take, teacherId } = JSON.parse(req.body);

      console.log(skip, take, teacherId);

      let reviews = await prisma.review.findMany({
        where: {
          teacherId,
        },
        orderBy: {
          created_at: "desc",
        },
        take,
        skip,
      });

      if (reviews.length < 1)
        return res.json({
          ok: false,
          message: "Nie ma opini",
          hasMore: false,
        });

      return res.json({
        ok: true,
        reviews,
        hasMore: true,
      });
    }
  } catch (error) {
    return res.json({
      ok: false,
    });
  }
};

export default handler;
