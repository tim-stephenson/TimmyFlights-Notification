import axios from "axios";
const OpenSkysURL = "https://opensky-network.org/api/states/all";
const TimmyFlightsBackendURL = "https://clzkel0hql.execute-api.us-east-1.amazonaws.com/default/TimmyFlights";
import * as SecurityCredentials from "../SecurityCredentials.json" ;
import { AllStates, FlightInfo, TrackableFlightInfo, notificationRow } from "./interfaces";
import isApproaching from "./util/isApproaching";



export async function NotiCheck(){
    console.log("Starting NotiCheck");
    try{
    const [backendResponse, OpenSkysResponse] = await Promise.all([
        axios.get(TimmyFlightsBackendURL) ,
        axios.get(OpenSkysURL, {auth : {username : SecurityCredentials.username, password : SecurityCredentials.password }})
    ]);
    if(OpenSkysResponse.status != 200){
        throw new Error(`Got a status of ${OpenSkysResponse.status} from OpenSkys`);
    }
    if(backendResponse.status != 200){
        throw new Error(`Got a status of ${OpenSkysResponse.status} from our backend`);
    }
    console.log("Successfully Called NotiCheck");
    console.log("OpenSkies Response:", OpenSkysResponse);
    console.log("backend Response:", backendResponse);
    IterateOverFlightsAndNotifies(ParseFlightData( OpenSkysResponse.data), backendResponse.data.Items as notificationRow[] );
    }catch(err){
        console.log("GOT ERROR:", err);
    }

    
}

const ParseFlightData = ( data : AllStates ) : FlightInfo[] => (
    data.states.map( (flight) => ({
        icao24 : flight[0],
        callsign : flight[1],
        origin_country : flight[2],
        time_position : flight[3],
        last_contact : flight[4],
        longitude : flight[5],
        latitude : flight[6],
        baro_altitude : flight[7],
        on_ground : flight[8],
        velocity :flight[9],
        true_track : flight[10],
        vertical_rate : flight[11],
        sensors : flight[12],
        geo_altitude : flight[13],
        squawk : flight[14],
        spi : flight[15],
        position_source : flight[16],
        category : flight[17]
    }))
);

const FlightHasNeededInfo = (flightInfo : FlightInfo) => (
    flightInfo.time_position != null &&
    flightInfo.longitude != null &&
    flightInfo.latitude != null &&
    !flightInfo.on_ground &&
    flightInfo.velocity != null &&
    flightInfo.true_track != null &&
    flightInfo.geo_altitude != null
)




function IterateOverFlightsAndNotifies(flightList : FlightInfo[], notifies : notificationRow[]){
    console.log(flightList);
    flightList.forEach( (flight) => {
        if(FlightHasNeededInfo(flight)){
            notifies.forEach( (row) => {
                if(isApproaching(row, flight as TrackableFlightInfo)){
                    console.log("Give ", row, " a message about incoming flight ", flight);
                }
            } )
        }
    })

}