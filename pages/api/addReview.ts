// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { code, name, review, teacherId } = req.body;

    if (!code || !name || !review || !teacherId)
      return res.json({
        ok: false,
        review: "Wypełnij wszystkie wymagane pola!",
      });

    let { data } = await axios.post<ICode>(
      `${process.env.VERCEL_URL}/api/checkCode`,
      { teacherId, code }
    );

    if (!data.ok) {
      return res.json({
        ok: false,
        message: data.message,
      });
    }

    if (data.ok && data.code) {
      let deactivateCode = await prisma.$transaction([
        prisma.review.create({
          data: {
            review,
            name,
            teacher: { connect: { id: teacherId } },
          },
        }),
        prisma.codes.update({
          where: {
            id: data.code.id,
          },
          data: {
            active: false,
          },
        }),
      ]);

      if (
        !deactivateCode[0] ||
        deactivateCode[0] === undefined ||
        deactivateCode[0] === null
      )
        return res.json({
          ok: false,
          message: "Coś poszło nie tak",
        });

      return res.json({
        ok: true,
        message: "Kod prawidłowy, opinia dodana",
        review: deactivateCode[0],
      });
    }
  }
}
