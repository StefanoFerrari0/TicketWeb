var mongoose = require ("mongoose")
var Batch = require("../models/batchesModel")
var Event = require("../models/eventModel")
var Ticket =require("../models/ticketModel")
const dotenv = require("dotenv");
const { getTicketById } = require("../controllers/ticket");
module.exports={

    createTicket: async(buyDate,seller,price,email,phone,name,lastName,dni,batches,events)=>{
        
        const batchesFound = await Batch.find({name:$batches})
        const eventsFound = await Event.find({name:$events})
        
        
        let newTicket = new Ticket ({
            _id: new mongoose.Types.ObjectId(),
            buyDate,
            seller,
            price,
            email,
            phone,
            name,
            lastName,
            dni,
            state:true,
            batches:batchesFound.map((batches)=>batches._id),
            events:eventsFound.map((events)=>events._id),
            isDeleted:false
        });

        
        await newTickect.save();
        return newTicket;
    },

    getById:async(ticketId)=>{
        const ticket = await Ticket.findById(ticketId);
        return ticket;
    },

    getAll:async()=>{
        const tickets = await Ticket.find({isDeleted:false});
        return tickets;
    },
    delete: async(ticketId)=>{
        const ticket = await Ticket.findByIdAndUpdate(ticketId,{isDeleted:true});
        return ticket;
    },
    edit: async(data)=>{
        const ticket = await Ticket.findByIdAndUpdate(data._id,data);
        return ticket;
    },

    sendEmail:async(email,ticketId)=>{
            
        
        let testAccount = await nodemailer.createTestAccount();
        let ticket = await getTicketById()
        

            // el email de las 10hs y su config
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                /*user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAILPASS, // generated ethereal password*/
                user: 'gina.cormier44@ethereal.email',
                pass: 'WVzCdVGKNKqhbADYD7'
                },
            });

            // send mail with defined transport object
        let info = await transporter.sendMail({
                from: '"10 horas tecno 👻" <10horastecno@gmail.com>', // sender address
                to: ticket.email, // list of receivers
                subject: "Tu entrada para las 10hs.", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });

        console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    },
}