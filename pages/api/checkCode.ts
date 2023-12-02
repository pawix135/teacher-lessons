import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICode>
) {
  if (req.method === "POST") {
    let { code, teacherId } = req.body;

    if (!teacherId) {
      return res.json({
        ok: false,
        message: "Nie podano nauczyciela!",
      });
    }

    if (!code) {
      return res.json({
        ok: false,
        message: "Nie podano kodu!",
      });
    }

    let checkCode = await prisma.teacher.findFirst({
      select: {
        codes: {
          where: {
            code: code,
          },
        },
      },
      where: {
        id: teacherId,
      },
    });

    if (!checkCode?.codes || checkCode.codes.length < 1) {
      return res.json({
        ok: false,
        message: "Zły kod!",
      });
    }

    if (!checkCode.codes[0].active) {
      return res.json({
        message: "Kod został już użyty!",
        ok: false,
      });
    }

    return res.json({
      ok: true,
      message: "Kod poprawny!",
      code: checkCode.codes[0],
    });
  }
}
