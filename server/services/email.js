const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL, EMAIL_PASSWORD } = require("../config/index");

module.exports = {
  sendEmail: async (email, message) => {
      const transporter = nodemailer.createTransport(smtpTransport({
        host:'mail.andproducciones.com.ar',
        secureConnection: true,
        tls: {
          rejectUnauthorized: false
        },
        port: 465,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
      }));

      let info = await transporter.sendMail({
      from: '"10 horas de techno 👻" <soporte@andproducciones.com.ar>', 
      to: email, 
      subject: "Tu entrada para las 10hs.",
      // text: "...?", 
      html: `<img src=${message} style="height:200px; width:200px;">  </img>`,
    });

    console.log("Message sent: %s", info.messageId);
  },
};
