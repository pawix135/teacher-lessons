import type { NextApiHandler } from "next";
import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  let session = await getSession({ req });

  if (!session) res.status(401).json({ ok: false });

  try {
    let { teacherId } = JSON.parse(req.body);

    if (!teacherId) return res.json({ ok: false });

    let skip = Math.floor(Math.random() * 1500);
    let code = await prisma.codes.findFirst({
      rejectOnNotFound: true,
      skip,
      where: {
        teacherId,
        AND: {
          active: true,
        },
      },
    });

    if (!code) return res.json({ ok: false, message: "Nie ma takiego kodu!" });

    return res.json({
      ok: true,
      code: code.code,
    });
  } catch (error) {}
};

export default handler;
