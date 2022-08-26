import type { NextApiRequest, NextApiResponse } from 'next'

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export default (req: NextApiRequest, res: NextApiResponse) => {
    const msg = {
        to: process.env.SENDGRID_EMAIL_TO || "",
        from: process.env.SENDGRID_EMAIL_FROM || "", // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });

    console.log(req.body);
}