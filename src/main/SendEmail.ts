import { Coordinate, FlightInfo, notificationRow } from "./interfaces";

import SecurityCredentials from "../SecurityCredentials.json";

import {createTransport} from "nodemailer";
import {Options} from "nodemailer/lib/mailer";




export default async function SendEmail(mailOptions : Options){
    const MergedMailOptions : Options = {
        from: '"TimmyFlights" <no-reply@TimmyFlights.tech>',
        priority : 'normal',
        ...mailOptions
    }

    const transporter = createTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: SecurityCredentials.STMP,
    });

    
    // const verification = await transporter.verify();
    // console.log("VERIFICATION: ", verification);

    const info = await transporter.sendMail(MergedMailOptions);
    // console.log("INFO FROM SENT EMAIL: ", info);

}