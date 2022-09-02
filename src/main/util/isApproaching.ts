import { Coordinate, TrackableFlightInfo } from "../interfaces";
import { MaximumDistanceToCheckFlightPath, MaximumLatitudeVariationToCheckFlightPath } from "./Constants";
import GetPythagoreanDistance from "./GetPythagoreanDistance";
import GetViewRadius from "./GetViewRadius";

export default function isApproaching(pos : Coordinate, flightData : TrackableFlightInfo ) : boolean {
    if( Math.abs( pos.latitude - flightData.latitude ) > MaximumLatitudeVariationToCheckFlightPath){ return false;}
    if( GetPythagoreanDistance(pos, flightData) > MaximumDistanceToCheckFlightPath ){ return false;}
    return GetPythagoreanDistance(pos, flightData) <= GetViewRadius(flightData.geo_altitude);
}