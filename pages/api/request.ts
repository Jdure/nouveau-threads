import type { NextApiRequest, NextApiResponse } from 'next'

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export default (req: NextApiRequest, res: NextApiResponse) => {
    const msg = {
        to: [{ email: process.env.SENDGRID_EMAIL_TO || "" } ,{ email: req.body.email } ],
        from: process.env.SENDGRID_EMAIL_FROM || "", // Use the email address or domain you verified above
        subject: 'Client Request',
        templateId: process.env.SENDGRID_TEMPLATE_ID || "",
        dynamic_template_data: {
          name: req.body.name, 
          email: req.body.email,
          message: req.body.msg,
          support_email: process.env.SENDGRID_EMAIL_FROM 
        }
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