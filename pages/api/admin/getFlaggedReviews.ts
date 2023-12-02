import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let session = await getSession({ req });

    if (!session) return res.status(401).json({ ok: false });

    try {
      let { teacherId } = JSON.parse(req.body);

      let flaggedReviews = await prisma.review.findMany({
        take: 10,
        where: {
          teacherId,
          flagged: true,
        },
      });

      if (!flaggedReviews)
        return res.json({
          ok: false,
          hasMore: false,
          message: "Nie ma zgłoszonych postów!",
        });

      return res.json({
        ok: true,
        flaggedReviews,
      });
    } catch (error) {}
  }
};

export default handler;
