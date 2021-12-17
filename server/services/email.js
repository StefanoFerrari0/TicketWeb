const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const smtpTransport = require('nodemailer-smtp-transport');
const { EMAIL, EMAIL_PASSWORD } = require("../config/index");
const QRCode = require("qrcode");
const crypt = require("../services/crypt");

module.exports = {
  sendEmail: async (email, message, subject) => {
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
        subject: subject,//"Compraste una entrada para las 10hs de Techno",
        // text: "...?", 
        message, 
      });

 
    console.log("Message sent: %s", info.messageId);
  },

  templateService: async(id, data)=>{
    switch (id) {
      case 1:
              
        break;
      
      case 2:
      
        break;

      case 3:
      
        break;
      
      default:
      
        break;
    }
  },

  createQr: async (data)=>{
    const id = toString(data.ticketId)
    
    console.log(id);

    data.ticketId = crypt.encrypt(id);
    
    console.log(data.ticketId);
    
    let stringQrCode = JSON.stringify(data);
    return await QRCode.toDataURL(stringQrCode);
  },
};
