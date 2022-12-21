import { NextApiRequest, NextApiResponse } from "next";

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
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
