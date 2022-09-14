import { Coordinate } from "../interfaces";
import { EarthRadius } from "./Constants";
import { toRad } from "./ConvertAngle";
import GetBearing from "./GetBearing";
import GetDestination from "./GetDestination";
import GetPythagoreanDistance from "./GetPythagoreanDistance";

export default function GetClosestPointOnPath(source : Coordinate, bearing : number, pointOfInterest : Coordinate){
    // 1 : source
    // 3 : pointOfInterest
    // 2 : Hypothetical point along source's path which is closest to the pointOfInterest
    const δ13 = GetPythagoreanDistance(source, pointOfInterest) / EarthRadius;
    const θ12 = toRad(bearing);
    const θ13 = toRad(GetBearing(source,pointOfInterest));

    const δ23 = Math.asin(Math.sin(δ13)*Math.sin(θ13-θ12));

    const δ12 = Math.acos(Math.cos(δ13)/Math.cos(δ23));

    return GetDestination(source,bearing, δ12 * EarthRadius);
}

