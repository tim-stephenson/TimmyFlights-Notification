import axios from "axios";
import { Coordinate, FlightInfo, notificationRow } from "./interfaces";
const GoogleMapsPlatformUrl = "https://maps.googleapis.com/maps/api/staticmap";
import SecurityCredentials from "../SecurityCredentials.json";

export default async function GenerateEmailFormat(user : notificationRow, flight : FlightInfo, point : Coordinate ){
    const response = await axios.get(GoogleMapsPlatformUrl,{params : {
        center : `${user.latitude},${user.longitude}`,
        zoom : '11',
        size : '640x640',
        format : 'jpg',
        scale : '2',
        maptype : 'satellite',
        markers : `size:tiny|${user.latitude},${user.longitude}`,
        key : SecurityCredentials.GoogleMapsPlatformKey

    }} )
    return({
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
            },
            {
                filename : 'image.jpg',
                content : response.data
            }
        ],
      }
    );
}