import { Coordinate } from "../interfaces";
import { EarthRadius } from "./Constants";
import { toDegree, toRad } from "./ConvertAngle";

export default function GetDestination(source : Coordinate, bearing : number, distance : number){
    const θ = toRad(bearing);
    const φ1 = toRad(source.latitude);
    const λ1 = toRad(source.longitude);

    const δ = distance / EarthRadius;

    const φ2 = Math.asin( Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ) );
    const λ2 = λ1 + Math.atan2(Math.sin(θ)*Math.sin(δ)*Math.cos(φ1),
                            Math.cos(δ)-Math.sin(φ1)*Math.sin(φ2)
                            );
    return {
        latitude : toDegree(φ2),
        longitude : ( ( toDegree(λ2) + 540 ) % 360 ) - 180
    }
}