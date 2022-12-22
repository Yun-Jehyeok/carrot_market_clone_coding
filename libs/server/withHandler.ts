import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    if (isPrivate && !req.session.user) {
      return res.status(400).json({ ok: false, error: "Plz log in." });
    }

    try {
      await handler(req, res);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ e });
    }
  };
}

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
