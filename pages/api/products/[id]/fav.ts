import client from "libs/server/client";
import withHandler, { ResponseType } from "libs/server/withHandler";
import { withApiSession } from "libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExist = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
  });

  if (alreadyExist) {
    await client.fav.delete({
      where: {
        id: alreadyExist.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
