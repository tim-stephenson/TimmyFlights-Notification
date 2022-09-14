import { Coordinate, TrackableFlightInfo } from "../interfaces";
import { MaximumDistanceToCheckFlightPath, MaximumLatitudeVariationToCheckFlightPath, ViewableDistance } from "./Constants";
import GetBearing from "./GetBearing";
import GetClosestPointOnPath from "./GetClosestPointOnPath";
import GetPythagoreanDistance from "./GetPythagoreanDistance";
import GetViewRadius from "./GetViewRadius";

export default function isApproaching(pos : Coordinate, flightData : TrackableFlightInfo ) : false | Coordinate {
    if( Math.abs( pos.latitude - flightData.latitude ) > MaximumLatitudeVariationToCheckFlightPath){ return false;}
    if( GetPythagoreanDistance(pos, flightData) > MaximumDistanceToCheckFlightPath ){ return false;}
    const bearingToPoint = GetBearing(flightData, pos);
    const bearingDiff = Math.abs( ( (flightData.true_track - bearingToPoint) + 180) % 360 - 180 );
    if( bearingDiff >= 90 ){ return false;}
    const point = GetClosestPointOnPath(flightData, flightData.true_track, pos);
    if(GetPythagoreanDistance(point, pos) > ViewableDistance){ return false;}
    return point;

    // return GetPythagoreanDistance(pos, flightData) <= GetViewRadius(flightData.geo_altitude);
}