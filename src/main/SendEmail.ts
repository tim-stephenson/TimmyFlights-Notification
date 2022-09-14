import { Coordinate, FlightInfo, notificationRow } from "./interfaces";

import SecurityCredentials from "../SecurityCredentials.json";

import {createTransport} from "nodemailer";




export default async function SendEmail(user : notificationRow, flight : FlightInfo, point : Coordinate ){

    const transporter = createTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: SecurityCredentials.STMP,
    });

    
    const verification = await transporter.verify();
    console.log("VERIFICATION: ", verification);

    const info = await transporter.sendMail({
        from: '"TimmyFlights" <no-reply@TimmyFlights.tech>', // sender address
        to: [user.email], // list of receivers
        subject: `Incoming Flight overhead: ${flight.callsign} `, // Subject line
        text: "Hello world?", // plain text body
        // html: "<b>Hello world?</b>", // html body
        attachments : [
            {
                filename : 'flightInfo.json',
                content : JSON.stringify(flight, null, " ")
            },
            {
                filename : 'userInfo.json',
                content : JSON.stringify(user, null, " ")
            },
            {
                filename : 'point.json',
                content : JSON.stringify(point, null , " ")
            }
        ],
        priority : 'normal'
      }
    );
    console.log("INFO FROM SENT EMAIL: ", info);

}