const Ticket = require("../models/ticketModel");
const { getById } = require("../services/ticket");
const { emailAddress } = require("../config/init");
const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async (email, ticketId) => {
    let testAccount = await nodemailer.createTestAccount();
    let ticket = await getById(ticketId);

    // send mail with defined transport object
    let info = await emailAddress.sendMail({
      from: '"10 horas tecno 👻" <benjavillafae@gmail.com>', // sender address
      to: ticket.email, // list of receivers
      subject: "Tu entrada para las 10hs.", // Subject line
      text: "sexo?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  },
};
