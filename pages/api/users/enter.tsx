import client from "libs/server/client";
import withHandler from "libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;

  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    create: {
      ...payload,
      name: "Anonymous",
    },
    update: {},
    where: {
      ...payload,
    },
  });

  console.log(user);

  const token = await client.token.create({
    data: {
      payload: "aa",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  console.log(token);
  return res.json({ ok: true });
}

export default withHandler("POST", handler);
