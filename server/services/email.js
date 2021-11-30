const Ticket = require("../models/ticketModel");
const { getById } = require("../services/ticket");
const { emailAddress } = require("../config/init");
const nodemailer = require("nodemailer");
const createHttpError = require("http-errors");
 
module.exports = {
  sendEmail: async (email) => {
    /*let testAccount = await nodemailer.createTestAccount();*/
    try
    {
      // send mail with defined transport object
       await emailAddress.sendMail({
          from: '"10 horas tecno 👻" <soporte@andproducciones.com.ar>', // sender address
          to: email, // list of receivers
          subject: "Entrada para la fiesta.", // Subject line
          text: "sexo?", // plain text body
          html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    catch(error){
      const httpError = createHttpError(500, error, {
				headers: {
					"X-Custom-Header": "Value",
				}
			});
      next(httpError);
    }
  },
};
