import client from "libs/server/client";
import withHandler, { ResponseType } from "libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

import mail from "@sendgrid/mail";
import twilio from "twilio";

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
            name: "Anonymous",
          },
        },
      },
    },
  });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}`,
  //   });

  //   console.log(message);
  // } else if (email) {
  //   const mailOptions = {
  //     from: process.env.MAIL_ID,
  //     to: email,
  //     subject: "Your Carrot Market Verification Email",
  //     html: `Your token is <strong>${payload}</strong>`,
  //   };

  //   const result = await smtpTransport.sendMail(mailOptions, (err, res) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(res);
  //     }

  //     smtpTransport.close();
  //   });

  //   console.log(result);
  // }

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
