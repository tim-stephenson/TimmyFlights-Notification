import { FlightInfo, notificationRow } from "./interfaces";

import SecurityCredentials from "../SecurityCredentials.json";

import {createTransport} from "nodemailer";




export default async function SendEmail(user : notificationRow, flight : FlightInfo ){

    const transporter = createTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: SecurityCredentials.STMP,
        });

    
    const verification = await transporter.verify();
    console.log("VERIFICATION", verification);

    const info = await transporter.sendMail({
        from: '"TimmyFlights" <no-reply@TimmyFlights.tech>', // sender address
        to: [user.email], // list of receivers
        subject: "Test Subject Line", // Subject line
        text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body
        attachments : [
            {
            filename : 'flightInfo.json',
            content : JSON.stringify(flight)
            },
            {
            filename : 'userInfo.json',
            content : JSON.stringify(user)
            }
        ],
        priority : 'normal'
      }
    );
    console.log("INFO FROM SENT EMAIL", info);

}