const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL, EMAIL_PASSWORD } = require("../config/index");
const QRCode = require("qrcode");

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

      transporter.use('compile', inlineBase64());

      let html = `<img height="400" width="400" src="${message}"/>`;

      let info = await transporter.sendMail({
        from: '"10 horas de techno 👻" <soporte@andproducciones.com.ar>', 
        to: email, 
        subject: "Compraste una entrada para las 10hs de Techno",
        // text: "...?", 
        html,
      });


    console.log("Message sent: %s", info.messageId);
  },

  createQr: async (data)=>{
    let stringQrCode = JSON.stringify(data);
    return await QRCode.toDataURL(stringQrCode);
  },
};
